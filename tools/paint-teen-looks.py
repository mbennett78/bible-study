"""Two original painted banners for the teen looks: "Golden hour" (a wildflower meadow at sunset,
for a young woman or older teen girl) and "Summit" (mountain ridges at dusk with a lone hiker and
map contour lines, for a young man or older teen guy). Everything is drawn here."""
import sys, math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1600, 900
which, out = sys.argv[1], sys.argv[2]
rng = np.random.default_rng(5)
yy = np.arange(H)[:, None] / H
xx = np.arange(W)[None, :] / W


def col(h):
    h = h.lstrip("#"); return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float)


def lerp(a, b, t):
    return a + (b - a) * t


def noise2(w, h, scale, octaves=5, seed=0):
    r = np.random.default_rng(seed)
    acc = np.zeros((h, w)); amp = 1.0; tot = 0
    for o in range(octaves):
        gw, gh = max(2, int(w / scale * 2 ** o)) + 2, max(2, int(h / scale * 2 ** o)) + 2
        g = r.random((gh, gw))
        img = Image.fromarray((g * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
        acc += np.asarray(img, float) / 255 * amp; tot += amp; amp *= 0.5
    return acc / tot


def noise1(n, scale, octaves=6, seed=0):
    r = np.random.default_rng(seed)
    x = np.arange(n); acc = np.zeros(n); amp = 1; tot = 0
    for o in range(octaves):
        k = max(2, int(n / scale * 2 ** o)) + 2
        acc += np.interp(x, np.linspace(0, n - 1, k), r.random(k)) * amp; tot += amp; amp *= 0.55
    return acc / tot


def gradient(stops):
    """stops: [(y 0..1, hex)] vertical gradient."""
    ys = np.array([s[0] for s in stops]); cs = np.array([col(s[1]) for s in stops])
    y = np.arange(H) / H
    g = np.stack([np.interp(y, ys, cs[:, k]) for k in range(3)], -1)
    return np.broadcast_to(g[:, None, :], (H, W, 3)).copy()


def finish(a, warm="#fff3dc", warmth=.12, vig=.25):
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).filter(ImageFilter.ModeFilter(3)).filter(ImageFilter.GaussianBlur(.6))
    a = np.asarray(im, float)
    a = a * (0.95 + 0.07 * noise2(W, H, 6, 2, 61)[..., None]) * (0.97 + 0.05 * noise2(W, H, 18, 3, 62)[..., None])
    a = lerp(a, a * col(warm) / 255, warmth)
    v = np.clip(1 - (((xx - .5) / .8) ** 2 + ((yy - .5) / .85) ** 2), 0, 1) ** .35
    a = a * ((1 - vig) + vig * v[..., None])
    Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(out, quality=86, optimize=True, progressive=True)
    print("saved", out)


def layer(a, ridge_y, c_top, c_bot, tex_seed, bottom=H):
    tex = noise2(W, H, 120, 4, tex_seed)
    ys = np.arange(H)[:, None]
    mask = ys >= ridge_y[None, :]
    f = np.clip((ys - ridge_y[None, :]) / 260, 0, 1)
    c = lerp(col(c_top), col(c_bot), f[..., None]) * (0.93 + 0.12 * tex[..., None])
    a[mask] = c[mask]
    return a


if which == "golden":
    HZ = 560
    a = gradient([(0, "#a996cf"), (.28, "#d7a9c4"), (.5, "#f6c3a4"), (.62, "#fde2b4"), (1, "#fde2b4")])
    sun = np.exp(-(((xx - .62) / .2) ** 2 + ((yy - .6) / .2) ** 2))
    a = lerp(a, col("#fff1cf"), (sun * .8)[..., None])
    disk = np.clip(1 - ((((xx - .62) * W) ** 2 + ((yy - .58) * H) ** 2) ** .5 - 70) / 6, 0, 1)
    a = lerp(a, col("#fff6e0"), (disk * .9)[..., None])
    # Soft clouds, lit pink and gold.
    cn = noise2(W, H, 480, 6, 3)
    band = .9 * np.exp(-((yy - .2) / .08) ** 2) + .7 * np.exp(-((yy - .36) / .05) ** 2)
    cl = np.clip((cn - .47) * 3, 0, 1) * band
    a = lerp(a, lerp(col("#c79bbf"), col("#ffd9b8"), np.clip(sun * 1.5, 0, 1)[..., None]), (cl * .7)[..., None])
    # Far hills in dusty mauve, a nearer hill in rose.
    a = layer(a, HZ - 40 - 70 * noise1(W, 700, 5, 11), "#c7a0b4", "#d7aeb8", 21)
    a = layer(a, HZ + 10 - 60 * noise1(W, 500, 5, 12), "#b48aa0", "#c79aa6", 22)
    # The meadow: warm sage into plum.
    a = layer(a, HZ + 60 - 30 * noise1(W, 300, 5, 13), "#a49a8a", "#5a4656", 23)
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(im, "RGBA")
    # Grasses.
    for i in range(900):
        x = rng.uniform(0, W); base = rng.uniform(HZ + 70, H + 20); h = rng.uniform(30, 120) * (base - HZ) / 300
        bend = rng.uniform(-18, 18)
        c = (96 + rng.integers(0, 30), 104 + rng.integers(0, 24), 84 + rng.integers(0, 20), 150)
        d.line([(x, base), (x + bend * .5, base - h * .5), (x + bend, base - h)], fill=c, width=2)
    # Wildflowers: cosmos in pink and blush, small daisies, with the near ones bigger.
    def cosmos(x, y, r, c, center=(230, 170, 70, 255)):
        d.line([(x, y + r), (x + rng.uniform(-10, 10), y + r * 6)], fill=(70, 70, 60, 220), width=max(1, int(r / 6)))
        for k in range(8):
            t = k / 8 * 2 * math.pi + rng.uniform(-.1, .1)
            px, py = x + math.cos(t) * r * .62, y + math.sin(t) * r * .62 * .8
            d.ellipse([px - r * .42, py - r * .3, px + r * .42, py + r * .3], fill=c)
        d.ellipse([x - r * .2, y - r * .17, x + r * .2, y + r * .17], fill=center)
    pinks = [(242, 168, 190, 235), (250, 205, 215, 235), (228, 140, 176, 235), (255, 236, 240, 235), (214, 170, 222, 235)]
    pts = sorted([(rng.uniform(0, W), rng.uniform(HZ + 80, H + 10)) for _ in range(170)], key=lambda p: p[1])
    for x, y in pts:
        s = (y - HZ) / (H - HZ)
        cosmos(x, y, 4 + s * s * 34, pinks[rng.integers(0, len(pinks))])
    # Light in the air: soft gold bokeh and drifting seeds.
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0)); g = ImageDraw.Draw(glow)
    for _ in range(60):
        x, y, r = rng.normal(W * .62, 260), rng.normal(H * .6, 110), rng.uniform(2, 9)
        g.ellipse([x - r, y - r, x + r, y + r], fill=(255, 246, 215, int(rng.uniform(90, 200))))
    glow = glow.filter(ImageFilter.GaussianBlur(2.2))
    im = Image.alpha_composite(im.convert("RGBA"), glow).convert("RGB")
    finish(np.asarray(im, float), warm="#fff0e6", warmth=.1, vig=.18)

else:  # summit
    HZ = 520
    a = gradient([(0, "#141a25"), (.14, "#232c3b"), (.27, "#5b4c52"), (.36, "#d0743f"), (.44, "#f0a35c"), (1, "#f0a35c")])
    sun = np.exp(-(((xx - .38) / .25) ** 2 + ((yy - .44) / .1) ** 2))
    a = lerp(a, col("#f6b26b"), (sun * .55)[..., None])
    for _ in range(220):
        x, y = rng.integers(0, W), rng.integers(0, int(H * .2))
        a[y, x] = lerp(a[y, x], col("#f3f0e8"), rng.uniform(.3, .9) * (1 - y / (H * .2)))
    ridges = []
    shades = [("#6a6470", "#585866"), ("#474c5c", "#3d4252"), ("#30374a", "#2a3042"), ("#1c2230", "#181d29")]
    for i, (c1, c2) in enumerate(shades):
        n = noise1(W, 520 - i * 90, 7, 40 + i)
        n = np.abs(n - .5) * 2
        r = 400 + i * 90 - (200 - i * 30) * n
        ridges.append(r)
        a = layer(a, r, c1, c2, 50 + i)
        # Mist in each valley.
        m = np.exp(-((np.arange(H)[:, None] - (r.max() - 10)) / 26.0) ** 2) * noise2(W, H, 300, 3, 70 + i)
        a = lerp(a, col("#c9a78f"), (m * .22 * (1 - i / 4))[..., None])
    # Map contour lines on the middle ridge, like a trail map.
    hgt = noise2(W, H, 420, 4, 91)
    ys = np.arange(H)[:, None]
    region = (ys > ridges[2][None, :] + 4) & (ys < ridges[3][None, :] - 2)
    line = (np.mod(hgt * 34, 1) < .07) & region
    a = np.where(line[..., None], lerp(a, col("#e8a070"), .38), a)
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(im, "RGBA")
    # A lone hiker with a pack on the near ridge.
    r3 = ridges[3]
    hx = int(np.argmin(r3[700:1200]) + 700); hy = float(r3[hx]) + 2
    c = (16, 19, 28, 255)
    d.ellipse([hx - 7, hy - 62, hx + 7, hy - 48], fill=c)
    d.polygon([(hx - 8, hy - 46), (hx + 8, hy - 46), (hx + 7, hy - 20), (hx - 7, hy - 20)], fill=c)
    d.rounded_rectangle([hx - 20, hy - 46, hx - 6, hy - 22], 4, fill=c)
    d.line([(hx - 4, hy - 20), (hx - 10, hy)], fill=c, width=6); d.line([(hx + 4, hy - 20), (hx + 12, hy)], fill=c, width=6)
    d.line([(hx + 7, hy - 40), (hx + 22, hy - 24)], fill=c, width=4); d.line([(hx + 22, hy - 24), (hx + 26, hy + 2)], fill=c, width=2)
    # Pines in the foreground corners.
    def pine(x, base, h):
        for k in range(8):
            ty = base - h * (k / 8) * .92; tw = h * .3 * (1 - k / 8)
            d.polygon([(x - tw, ty), (x + tw, ty), (x, ty - h * .26)], fill=(13, 16, 24, 255))
    for _ in range(14):
        x = rng.uniform(-20, 300); pine(x, H + 10, rng.uniform(220, 420))
    for _ in range(10):
        x = rng.uniform(1360, W + 20); pine(x, H + 10, rng.uniform(200, 380))
    finish(np.asarray(im, float), warm="#ffe9d6", warmth=.06, vig=.3)

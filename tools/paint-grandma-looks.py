"""Two original oil-painting-style banners for Grandma's looks, in a warm, glowing, luminous mood.
"Chapel": a steepled chapel with glowing windows beside a calm river at sunrise, a garden path
with a rail fence, and soft blue hills. "Lighthouse": a lighthouse with its lantern aglow and a
keeper's cottage on a green point, a white fence and stone path, and surf breaking on the rocks.
Everything is drawn here, then painted over with thousands of brush strokes; nothing is copied
from any painting.
Run: python3 tools/paint-grandma-looks.py chapel|lighthouse out.jpg"""
import sys, math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1600, 900
which, out = sys.argv[1], sys.argv[2]
rng = np.random.default_rng(11)
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
        img = Image.fromarray((r.random((gh, gw)) * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
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
    ys = np.array([s[0] for s in stops]); cs = np.array([col(s[1]) for s in stops])
    y = np.arange(H) / H
    g = np.stack([np.interp(y, ys, cs[:, k]) for k in range(3)], -1)
    return np.broadcast_to(g[:, None, :], (H, W, 3)).copy()


def glow(a, x, y, r, c, k=1.0):
    d = np.sqrt((xx * W - x) ** 2 + (yy * H - y) ** 2)
    return lerp(a, col(c), (np.exp(-(d / r) ** 2) * k)[..., None])


def clouds(a, seed, bands, sun, lit, mid, dark, amount=.9, thr=.5):
    """Billowing clouds lit from below by a low sun: glowing undersides, soft violet tops."""
    n = np.asarray(Image.fromarray((noise2(W // 3, H, 110, 6, seed) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC), float) / 255
    band = sum(k * np.exp(-((yy - c) / w) ** 2) for c, w, k in bands)
    dens = np.clip((n - thr) * 5, 0, 1) * band
    up = np.roll(dens, 10, 0); down = np.roll(dens, -10, 0)
    under = np.clip((up - down) * 2.5 + .35, 0, 1)                 # the side facing the low sun
    near = np.exp(-(((xx * W - sun[0]) / 650) ** 2 + ((yy * H - sun[1]) / 420) ** 2))
    c = lerp(col(dark), col(mid), np.clip(under + near * .4, 0, 1)[..., None])
    c = lerp(c, col(lit), np.clip(under * near * 1.6 + near * .25, 0, 1)[..., None])
    return lerp(a, c, (dens * amount)[..., None])


def dabs(im, n, area, colors, size, seed, alpha=(150, 235)):
    """Paint-dab flowers and leaves: many small soft ovals."""
    r = np.random.default_rng(seed)
    d = ImageDraw.Draw(im, "RGBA")
    x0, y0, x1, y1 = area
    for _ in range(n):
        x, y = r.uniform(x0, x1), r.uniform(y0, y1)
        s = size * (0.6 + 0.8 * r.random()) * (0.5 + (y - y0) / max(1, y1 - y0))
        c = colors[r.integers(0, len(colors))]
        d.ellipse([x - s, y - s * .75, x + s, y + s * .75], fill=tuple(int(v) for v in c) + (int(r.uniform(*alpha)),))


def beds(im, n, path, colors, leaves, size, seed, spread=40):
    """Flower beds: clumps of leaves with blossoms on top, scattered along a line of points."""
    r = np.random.default_rng(seed)
    d = ImageDraw.Draw(im, "RGBA")
    for _ in range(n):
        x0, y0, sc = path[r.integers(0, len(path))]
        cx, cy = x0 + r.normal(0, spread * sc), y0 + r.normal(0, spread * .35 * sc)
        for k in range(14):
            x, y = cx + r.normal(0, 9 * sc), cy + r.normal(0, 5 * sc); s = size * sc * r.uniform(.6, 1.3)
            c = leaves[r.integers(0, len(leaves))] if k < 6 else colors[r.integers(0, len(colors))]
            d.ellipse([x - s, y - s * .75, x + s, y + s * .75], fill=tuple(int(v) for v in c) + (int(r.uniform(170, 240)),))


def tree(d, x, base, h, w, greens, lit, seed, trunk=(78, 60, 48)):
    """A soft, rounded tree: a trunk and many clustered leaf dabs, warm light on the sunny side."""
    r = np.random.default_rng(seed)
    d.line([(x, base), (x + r.uniform(-6, 6), base - h * .55)], fill=trunk + (255,), width=max(3, int(w * .08)))
    for _ in range(int(90 + w * 2.2)):
        oy = -h * r.uniform(.22, 1.0); spread = w * max(.25, 1 - abs(oy / h + .6) * 1.5)
        ox = r.normal(0, max(4, spread * .38)); s = r.uniform(.06, .14) * w + 3
        side = float(np.clip((ox / max(1, spread)) * lit + .5 + (-oy / h - .6) * .3, 0, 1))
        g = greens[r.integers(0, len(greens))]
        c = [int(np.clip(g[k] + (60 * side) * (1.0, .8, .35)[k] + r.integers(-10, 10), 0, 255)) for k in range(3)]
        d.ellipse([x + ox - s, base + oy - s * .8, x + ox + s, base + oy + s * .8], fill=tuple(c) + (235,))


def painterly(im, seed=7):
    """Repaint the picture with brush strokes: big strokes first, then smaller ones only where the
    picture still needs detail. Strokes follow the edges, so it reads as brushwork, not pixels."""
    r = np.random.default_rng(seed)
    canvas = im.filter(ImageFilter.GaussianBlur(10))
    for size, step, tol in ((11, 7, 0), (7, 5, 14), (4, 3, 18), (2, 2, 24)):
        ref = np.asarray(im.filter(ImageFilter.GaussianBlur(max(.6, size / 3))), float)
        lum = ref @ np.array([.3, .59, .11])
        gx = np.zeros_like(lum); gy = np.zeros_like(lum)
        gx[:, 1:-1] = lum[:, 2:] - lum[:, :-2]; gy[1:-1] = lum[2:] - lum[:-2]
        cur = np.asarray(canvas, float)
        diff = np.abs(cur - ref).sum(-1) / 3
        d = ImageDraw.Draw(canvas, "RGBA")
        ys, xs = np.mgrid[0:H:step, 0:W:step]
        ys = (ys + r.integers(0, step, ys.shape)).clip(0, H - 1).ravel(); xs = (xs + r.integers(0, step, xs.shape)).clip(0, W - 1).ravel()
        keep = diff[ys, xs] > tol
        ys, xs = ys[keep], xs[keep]
        for i in r.permutation(len(xs)):
            x, y = xs[i], ys[i]
            c = ref[y, x] + r.normal(0, 3, 3)
            g = math.hypot(gx[y, x], gy[y, x])
            ang = math.atan2(gy[y, x], gx[y, x]) + math.pi / 2 if g > 2 else r.normal(0, .35)
            L = size * r.uniform(1.4, 3.0)
            dx, dy = math.cos(ang) * L / 2, math.sin(ang) * L / 2
            fill = tuple(int(v) for v in np.clip(c, 0, 255)) + (int(r.uniform(190, 245)),)
            d.line([(x - dx, y - dy), (x + dx, y + dy)], fill=fill, width=size)
            if size > 2:
                rr = size / 2
                for ex, ey in ((x + dx, y + dy), (x - dx, y - dy)):
                    d.ellipse([ex - rr, ey - rr, ex + rr, ey + rr], fill=fill)
    return canvas


def oil(im):
    """Brushwork, then an oil finish: stroke texture, canvas weave, a warm varnish, a soft vignette."""
    im = painterly(im)
    a = np.asarray(im, float)
    strokes = noise2(W, H, 6, 3, 61)[..., None]
    weave = (np.sin(np.arange(W)[None, :] * 1.9) * np.sin(np.arange(H)[:, None] * 1.9))[..., None]
    a = a * (0.96 + 0.07 * strokes) * (1 + 0.015 * weave)
    a = lerp(a, a * col("#fff1dc") / 255, .1)
    a = np.clip((a - 128) * 1.06 + 128, 0, 255)                  # a little richer
    v = np.clip(1 - (((xx - .5) / .8) ** 2 + ((yy - .5) / .85) ** 2), 0, 1) ** .4
    a = a * (0.8 + 0.2 * v[..., None])
    Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(out, quality=86, optimize=True, progressive=True)
    print("saved", out)


def rocks(d, n, area, seed, lit=(255, 214, 170)):
    r = np.random.default_rng(seed)
    x0, y0, x1, y1 = area
    for _ in range(n):
        x, y = r.uniform(x0, x1), r.uniform(y0, y1); s = r.uniform(10, 30) * (0.6 + (y - y0) / max(1, y1 - y0))
        c = int(r.uniform(96, 150))
        d.ellipse([x - s, y - s * .6, x + s, y + s * .55], fill=(c, c - 6, c - 14, 255))
        d.ellipse([x - s * .7, y - s * .58, x + s * .4, y - s * .1], fill=lit + (110,))


if which == "chapel":
    HZ = 470
    SUN = (560, 452)
    a = gradient([(0, "#2b3a5c"), (.14, "#4d6282"), (.28, "#8f8a7c"), (.4, "#d29a62"), (.49, "#ecbe78"), (.53, "#f6dca2"), (1, "#f6dca2")])
    a = glow(a, *SUN, 420, "#f8d898", .65)
    a = glow(a, *SUN, 120, "#fffbe6", .9)
    a = clouds(a, 5, [(.1, .08, 1), (.24, .07, .9), (.36, .04, .6)], SUN, "#f2bc74", "#b0705a", "#36445f", .95, .46)
    ang = np.arctan2(yy * H - SUN[1], xx * W - SUN[0])
    rays = (np.sin(ang * 26 + 1) * .5 + .5) ** 8 * np.clip(1 - np.hypot(xx * W - SUN[0], yy * H - SUN[1]) / 800, 0, 1) * (yy * H < HZ)
    a = lerp(a, col("#fff3d6"), (rays * .18)[..., None])
    # Far hills, misty blue-violet, lighter near the sun.
    ys = np.arange(H)[:, None]
    for base, amp, sc, sd, c1 in [(HZ - 2, 120, 520, 1, "#7b8a9a"), (HZ + 6, 80, 400, 2, "#5f7c7a"), (HZ + 14, 44, 280, 3, "#5a7258")]:
        ridge = base - amp * noise1(W, sc, 5, sd)
        m = ys >= ridge[None, :]
        c = lerp(np.broadcast_to(col(c1), (H, W, 3)), col("#e8c896"), (np.exp(-((xx * W - SUN[0]) / 380) ** 2) * .5)[..., None])
        a = np.where(m[..., None], c, a)
    # Meadows: hazy blue-green far, rich green near.
    f = np.clip((ys - (HZ + 10)) / (H - HZ), 0, 1)
    ground = lerp(col("#9aa883"), col("#3f5e36"), (f ** .6)[..., None]) * (0.82 + 0.3 * noise2(W, H, 90, 5, 9)[..., None])
    ground = lerp(ground, col("#a8a25a"), (np.clip((noise2(W, H, 160, 3, 12) - .55) * 3, 0, 1) * .4)[..., None])
    ground = lerp(ground, col("#9a6a3e"), (np.clip((noise2(W, H, 120, 3, 14) - .62) * 3, 0, 1) * .3)[..., None])
    ground = lerp(ground, col("#e6d49a"), (np.exp(-(((xx * W - SUN[0]) / 500) ** 2 + ((yy * H - HZ) / 140) ** 2)) * .5)[..., None])
    a = np.where((ys >= HZ + 14)[..., None], ground, a)
    # The river: from under the sun, winding down to the front left, mirroring the sky.
    river = np.zeros((H, W), bool); cxs = []
    for y in range(HZ + 10, H):
        t = (y - HZ - 10) / (H - HZ - 10)
        cx = SUN[0] + 40 + 160 * math.sin(t * 3.2) - 540 * t ** 1.3; hw = 46 + 450 * t ** 1.35
        cxs.append((y, cx, hw))
        river[y, max(0, int(cx - hw)):min(W, int(cx + hw))] = True
    my = (np.clip(2 * HZ - ys, 0, H - 1).astype(int) * np.ones((1, W), int))
    refl = a[my, np.arange(W)[None, :]] * .92
    rip = noise2(W, H, 6, 2, 31)
    refl = refl * (0.92 + 0.12 * rip[..., None])
    depth = np.clip((ys - HZ) / (H - HZ), 0, 1)
    # Blue water all the way along the river, deeper toward the front.
    refl = lerp(refl, lerp(col("#5f86a8"), col("#2f5478"), depth[..., None]), (.72 + .2 * depth)[..., None])
    refl = lerp(refl, col("#fff4d8"), (np.exp(-((xx * W - SUN[0] - 40) / 70) ** 2) * np.clip((rip - .45) * 4, 0, 1) * .6)[..., None])
    a = np.where(river[..., None], refl, a)
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)); d = ImageDraw.Draw(im, "RGBA")
    # Soft green reflections along both banks, and glints of light on the water.
    for y, cx, hw in cxs[::2]:
        t = (y - HZ) / (H - HZ)
        for sgn in (-1, 1):
            x = cx + sgn * hw; w = 8 + 50 * t
            d.line([(x - sgn * w, y), (x, y)], fill=(70, 96, 74, 90), width=2)
    for _ in range(500):
        y, cx, hw = cxs[int(rng.random() ** 1.3 * (len(cxs) - 1))]
        t = (y - HZ) / (H - HZ); x = cx + rng.uniform(-.85, .85) * hw; L = 6 + 40 * t
        d.line([(x, y), (x + L, y)], fill=(255, 238, 214, int(rng.uniform(40, 120))), width=1 + int(2 * t))
    greens = [(52, 86, 50), (96, 110, 60), (110, 128, 96), (44, 72, 54), (74, 104, 70)]
    for x in list(range(0, 520, 16)) + list(range(690, 1060, 16)):
        y = HZ + 18 + rng.uniform(0, 10); tree(d, x, y, rng.uniform(20, 64), rng.uniform(14, 30), [(84, 104, 92), (104, 116, 84), (78, 96, 104), (120, 110, 80), (128, 92, 64)], .4, int(x) + 100)
    autumn = [(150, 78, 44), (186, 128, 50), (124, 60, 40), (160, 104, 52)]
    for x, h, w, sd, g in [(1460, 380, 150, 3, greens), (1560, 330, 120, 4, greens), (880, 260, 110, 5, greens), (790, 200, 80, 6, autumn), (1010, 170, 70, 7, autumn)]:
        tree(d, x, 600 + (h - 200) * .2, h, w, g, -.8 if x > 1100 else .8, sd)
    # The chapel: soft lavender-white walls, a steep blue-grey roof, a tall steeple, glowing windows.
    cx, base = 1150, 600
    wall, shade, roof, roofd = (234, 224, 204, 255), (180, 166, 150, 255), (58, 72, 96, 255), (40, 52, 72, 255)
    d.polygon([(cx + 70, base), (cx + 70, base - 110), (cx + 250, base - 96), (cx + 250, base - 8)], fill=shade)
    d.polygon([(cx + 4, base - 196), (cx + 82, base - 112), (cx + 262, base - 98), (cx + 186, base - 176)], fill=roof)
    d.polygon([(cx - 70, base), (cx - 70, base - 110), (cx, base - 196), (cx + 70, base - 110), (cx + 70, base)], fill=wall)
    d.line([(cx - 82, base - 104), (cx, base - 204), (cx + 82, base - 104)], fill=roofd, width=12)
    d.polygon([(cx - 26, base - 190), (cx + 26, base - 190), (cx + 26, base - 300), (cx - 26, base - 300)], fill=wall)
    d.polygon([(cx + 26, base - 190), (cx + 40, base - 182), (cx + 40, base - 294), (cx + 26, base - 300)], fill=shade)
    d.rectangle([cx - 30, base - 306, cx + 44, base - 298], fill=roofd)
    d.polygon([(cx - 20, base - 306), (cx + 34, base - 306), (cx + 34, base - 360), (cx - 20, base - 360)], fill=wall)
    d.rounded_rectangle([cx - 10, base - 350, cx + 10, base - 316], 9, fill=(255, 214, 130, 255))
    d.polygon([(cx - 26, base - 360), (cx + 7, base - 470), (cx + 40, base - 360)], fill=roof)
    d.polygon([(cx + 7, base - 470), (cx + 40, base - 360), (cx + 20, base - 360)], fill=roofd)
    d.rectangle([cx + 5, base - 500, cx + 9, base - 466], fill=(240, 220, 170, 255)); d.rectangle([cx - 4, base - 490, cx + 18, base - 486], fill=(240, 220, 170, 255))
    win, deep = (255, 196, 96, 255), (255, 150, 60, 255)
    d.rounded_rectangle([cx - 30, base - 150, cx + 30, base - 76], 30, fill=deep)
    d.rounded_rectangle([cx - 24, base - 144, cx + 24, base - 82], 24, fill=win)
    for k in (-8, 8): d.line([(cx + k, base - 144), (cx + k, base - 82)], fill=(150, 90, 60, 255), width=2)
    d.line([(cx - 24, base - 110), (cx + 24, base - 110)], fill=(150, 90, 60, 255), width=2)
    d.rounded_rectangle([cx - 20, base - 62, cx + 20, base], 18, fill=(255, 178, 80, 255))
    for wx in (cx + 92, cx + 142, cx + 192):
        d.rounded_rectangle([wx, base - 88, wx + 24, base - 24], 12, fill=deep)
        d.rounded_rectangle([wx + 3, base - 85, wx + 21, base - 27], 9, fill=win)
    for wx in (cx - 58, cx + 40):
        d.rounded_rectangle([wx, base - 92, wx + 18, base - 40], 9, fill=win)
    a2 = np.asarray(im, float)
    for gx, gy, gr, gk in [(cx, base - 113, 60, .3), (cx, base - 30, 60, .3), (cx + 104, base - 56, 40, .3), (cx + 154, base - 56, 40, .3), (cx + 204, base - 56, 40, .3), (cx, base - 333, 34, .35), (cx - 49, base - 66, 34, .3), (cx + 49, base - 66, 34, .3)]:
        a2 = glow(a2, gx, gy, gr, "#ffcf7a", gk)
    a2 = glow(a2, cx, base + 40, 100, "#ffd98e", .25)
    im = Image.fromarray(np.clip(a2, 0, 255).astype(np.uint8)); d = ImageDraw.Draw(im, "RGBA")
    # A winding garden path from the front right up to the door.
    def px_(t): return 1260 - 170 * math.sin(t * 3.0) - t * 110
    pl, pr = [], []
    for t in np.linspace(0, 1, 40):
        y = H - t * (H - base); w = 120 * (1 - t) ** 1.2 + 18
        pl.append((px_(t) - w, y)); pr.append((px_(t) + w, y))
    d.polygon(pl + pr[::-1], fill=(216, 190, 150, 255))
    for _ in range(500):
        t = rng.random() ** .8; y = H - t * (H - base); x = px_(t) + rng.uniform(-1, 1) * (110 * (1 - t) + 12)
        s = 9 * (1 - t) + 2; c = int(rng.uniform(180, 238))
        d.ellipse([x - s, y - s * .45, x + s, y + s * .45], fill=(c, c - 18, c - 46, 200))
    for _ in range(2200):
        x = rng.uniform(0, W); y = rng.uniform(HZ + 40, H)
        if river[int(min(H - 1, y)), int(min(W - 1, x))]: continue
        h = 4 + (y - HZ) / (H - HZ) * 30
        g = int(rng.uniform(0, 40))
        d.line([(x, y), (x + rng.uniform(-6, 6), y - h)], fill=(70 + g, 110 + g, 52 + g // 2, 150), width=2)
    flowers = [(168, 62, 48), (214, 160, 60), (200, 110, 52), (196, 124, 118), (240, 228, 204), (70, 86, 140), (140, 120, 160), (186, 84, 66)]
    leaves = [(64, 100, 56), (96, 112, 64), (112, 130, 98), (52, 82, 60)]
    beds(im, 60, [(x, base + 4, .7) for x in range(cx - 80, cx + 260, 20)], flowers, leaves, 5, 20, 12)
    edgeL = [(px_(t) - (120 * (1 - t) ** 1.2 + 18) - 30 * (1 - t), H - t * (H - base), 1.1 - .7 * t) for t in np.linspace(0, .9, 30)]
    edgeR = [(px_(t) + (120 * (1 - t) ** 1.2 + 18) + 40 * (1 - t), H - t * (H - base), 1.1 - .7 * t) for t in np.linspace(0, .9, 30)]
    beds(im, 160, edgeL, flowers, leaves, 6, 22, 30)
    beds(im, 160, edgeR, flowers, leaves, 6, 23, 30)
    beds(im, 50, [(x, 840, 1.0) for x in range(1440, W, 30)], flowers, leaves, 6, 24, 40)
    d = ImageDraw.Draw(im, "RGBA")
    # A split-rail fence along the left side of the path, toward the chapel.
    posts = []
    for i, t in enumerate(np.linspace(0, 1, 9)):
        y = H + 10 - t * (H - base - 30)
        posts.append((px_(t) - (150 * (1 - t) + 40), y))
    sc = [1 - i / 10 for i in range(len(posts))]
    for (x0, y0), (x1, y1), s0, s1 in zip(posts, posts[1:], sc, sc[1:]):
        for hh in (.35, .7):
            d.line([(x0, y0 - 80 * s0 * hh), (x1, y1 - 80 * s1 * hh)], fill=(104, 74, 52, 255), width=max(4, int(10 * s0)))
            d.line([(x0, y0 - 80 * s0 * hh - 2 * s0), (x1, y1 - 80 * s1 * hh - 2 * s1)], fill=(214, 170, 120, 150), width=2)
    for (x, y), s in zip(posts, sc):
        d.rectangle([x - 5 * s, y - 92 * s, x + 5 * s, y], fill=(98, 70, 50, 255))
    d = ImageDraw.Draw(im, "RGBA")
    rocks(d, 40, (0, 800, 300, H), 25)
    rocks(d, 30, (600, 760, 780, H), 26)
    for gx, gy in [(430, 300), (470, 284), (510, 310)]:
        d.arc([gx - 12, gy - 6, gx, gy + 6], 200, 340, fill=(50, 52, 66, 255), width=3); d.arc([gx, gy - 6, gx + 12, gy + 6], 200, 340, fill=(50, 52, 66, 255), width=3)
    oil(im)

else:  # lighthouse
    HZ = 560
    SUN = (1260, 450)
    a = gradient([(0, "#24365a"), (.16, "#4f6a8c"), (.32, "#8e9e9a"), (.46, "#d8b072"), (.6, "#efd09a"), (1, "#3f6a78")])
    a = glow(a, *SUN, 380, "#f4d8a0", .6)
    a = glow(a, *SUN, 130, "#fffbea", .6)
    a = clouds(a, 15, [(.1, .1, 1), (.3, .09, .9), (.5, .05, .5)], SUN, "#f4d090", "#bc8a62", "#34465f", .95, .46)
    ang = np.arctan2(yy * H - SUN[1], xx * W - SUN[0])
    rays = (np.sin(ang * 22) * .5 + .5) ** 7 * np.clip(1 - np.hypot(xx * W - SUN[0], yy * H - SUN[1]) / 900, 0, 1) * (yy * H < HZ)
    a = lerp(a, col("#fff6d8"), (rays * .2)[..., None])
    # The sea on the left: deep blue-green with the light's shimmer and rolling swells.
    ys = np.arange(H)[:, None]
    f = np.clip((ys - HZ) / (H - HZ), 0, 1)
    seac = lerp(col("#8aa8a8"), col("#1f4658"), (f ** .7)[..., None])
    swell = (np.sin(np.clip(ys - HZ, 0, None) ** 1.25 * .35 + noise2(W, H, 120, 3, 8) * 8) * .5 + .5)
    rip = noise2(W, H, 7, 2, 33)
    seac = seac * (0.9 + 0.1 * swell[..., None] + 0.08 * rip[..., None])
    shimmer = np.exp(-((xx * W - 620) / (60 + 260 * f)) ** 2)
    seac = lerp(seac, col("#fff1cc"), (shimmer * np.clip((rip - .5) * 6, 0, 1) * (1 - f * .8) * .7)[..., None])
    a = np.where((ys >= HZ)[..., None], seac, a)
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)); d = ImageDraw.Draw(im, "RGBA")
    for _ in range(260):
        t = rng.random() ** 1.6; y = HZ + 8 + t * (H - HZ); x = rng.uniform(-60, 760)
        L = rng.uniform(20, 70) * (1 + t * 2.5)
        d.ellipse([x, y - 1 - t * 4, x + L, y + 1 + t * 4], fill=(248, 250, 246, int(rng.uniform(50, 140))))
    d.polygon([(0, HZ + 2)] + [(x, HZ - 22 * math.sin(x / 200) ** 2 - 6) for x in range(0, 360, 10)] + [(360, HZ + 2)], fill=(150, 150, 178, 180))
    d.polygon([(420, 576), (452, 576), (446, 583), (426, 583)], fill=(70, 70, 86, 255)); d.polygon([(436, 574), (436, 532), (454, 572)], fill=(252, 244, 230, 255))
    # The point: rocks at the sea's edge, then green land rising to the right.
    d.polygon([(600, H), (640, 760), (720, 690), (800, 650), (880, 622), (1000, 604), (W, 594), (W, H)], fill=(112, 98, 94, 255))
    rocks(d, 120, (600, 640, 960, H), 35)
    d.polygon([(800, H), (850, 770), (920, 700), (1000, 652), (1100, 626), (1250, 614), (W, 604), (W, H)], fill=(104, 124, 78, 255))
    greens = [(52, 86, 50), (96, 110, 60), (110, 128, 96), (44, 72, 54), (74, 104, 70)]
    for x, h, w, sd in [(1500, 330, 140, 3), (1590, 300, 120, 4), (1420, 220, 90, 5)]:
        tree(d, x, 640, h, w, greens, -.9, sd)
    # The lighthouse: tall and white with a red cap; the lantern room is ablaze.
    lx, lb, lt = 1000, 630, 250
    def tower(y0, y1, c):
        t0 = (y0 - lt) / (lb - lt); t1 = (y1 - lt) / (lb - lt)
        w0 = 32 + 22 * t0; w1 = 32 + 22 * t1
        d.polygon([(lx - w0, y0), (lx + w0, y0), (lx + w1, y1), (lx - w1, y1)], fill=c)
    tower(lt, lb, (250, 242, 230, 255))
    d.polygon([(lx + 8, lt), (lx + 32, lt), (lx + 54, lb), (lx + 20, lb)], fill=(176, 166, 184, 200))
    d.polygon([(lx - 32, lt), (lx - 20, lt), (lx - 32, lb), (lx - 54, lb)], fill=(255, 236, 200, 120))
    for wy in (330, 430, 530):
        d.rounded_rectangle([lx - 7, wy, lx + 7, wy + 22], 6, fill=(255, 210, 110, 255))
    d.rectangle([lx - 46, lt - 8, lx + 46, lt + 2], fill=(46, 44, 50, 255))
    for k in range(-44, 46, 8):
        d.line([(lx + k, lt - 22), (lx + k, lt - 8)], fill=(46, 44, 50, 255), width=2)
    d.line([(lx - 46, lt - 22), (lx + 46, lt - 22)], fill=(46, 44, 50, 255), width=2)
    d.rectangle([lx - 26, lt - 66, lx + 26, lt - 8], fill=(255, 240, 180, 255))
    for k in (-13, 0, 13):
        d.line([(lx + k, lt - 66), (lx + k, lt - 10)], fill=(90, 70, 60, 200), width=2)
    d.polygon([(lx - 34, lt - 64), (lx, lt - 100), (lx + 34, lt - 64)], fill=(146, 56, 40, 255))
    d.ellipse([lx - 6, lt - 110, lx + 6, lt - 98], fill=(60, 50, 50, 255))
    # A flag on a white pole by the cottage.
    d.line([(1430, 640), (1430, 420)], fill=(240, 236, 228, 255), width=4)
    d.polygon([(1432, 424), (1490, 432), (1488, 466), (1432, 458)], fill=(176, 56, 52, 255))
    for k in range(3): d.line([(1432, 436 + k * 9), (1489, 444 + k * 9)], fill=(246, 240, 232, 255), width=3)
    d.rectangle([1432, 424, 1452, 444], fill=(52, 64, 112, 255))
    # The keeper's cottage: white clapboard, steep roofs, a chimney, every window lit.
    hx, hb = 1090, 640
    d.polygon([(hx, hb), (hx, hb - 90), (hx + 300, hb - 90), (hx + 300, hb)], fill=(240, 232, 220, 255))
    d.polygon([(hx + 150, hb), (hx + 150, hb - 90), (hx + 300, hb - 90), (hx + 300, hb)], fill=(214, 206, 204, 255))
    d.polygon([(hx - 14, hb - 88), (hx + 150, hb - 88), (hx + 75, hb - 175)], fill=(86, 84, 104, 255))
    d.polygon([(hx + 6, hb - 88), (hx + 144, hb - 88), (hx + 75, hb - 162)], fill=(244, 234, 220, 255))
    d.polygon([(hx + 140, hb - 88), (hx + 316, hb - 88), (hx + 280, hb - 140), (hx + 170, hb - 140)], fill=(96, 92, 110, 255))
    d.rectangle([hx + 240, hb - 172, hx + 262, hb - 130], fill=(150, 96, 80, 255))
    d.rectangle([hx + 118, hb - 64, hx + 150, hb], fill=(255, 196, 100, 255))
    wins = [(hx + 22, hb - 70), (hx + 66, hb - 70), (hx + 60, hb - 140), (hx + 180, hb - 70), (hx + 232, hb - 70)]
    for wx, wy in wins:
        d.rectangle([wx, wy, wx + 30, wy + 36], fill=(255, 204, 104, 255))
        d.line([(wx + 15, wy), (wx + 15, wy + 36)], fill=(150, 104, 70, 255), width=2)
        d.line([(wx, wy + 18), (wx + 30, wy + 18)], fill=(150, 104, 70, 255), width=2)
    for k in range(4):
        x = hx + 252 + rng.uniform(-6, 6); y = hb - 190 - k * 22
        d.ellipse([x - 10 - k * 4, y - 8, x + 10 + k * 4, y + 8], fill=(236, 230, 236, 80))
    a2 = np.asarray(im, float)
    bang = np.arctan2(yy * H - (lt - 38), xx * W - lx)
    bd = np.hypot(xx * W - lx, yy * H - (lt - 38))
    beam = np.exp(-((bang - math.pi * 0.985) / .05) ** 2) * np.clip(1 - bd / 1050, 0, 1)
    a2 = lerp(a2, col("#fff4cc"), (beam * .55)[..., None])
    a2 = glow(a2, lx, lt - 38, 170, "#fff0b8", .5)
    a2 = glow(a2, lx, lt - 38, 55, "#fffcec", .95)
    for wx, wy in wins:
        a2 = glow(a2, wx + 15, wy + 18, 50, "#ffd27c", .4)
    a2 = glow(a2, hx + 134, hb + 20, 90, "#ffd98e", .35)
    im = Image.fromarray(np.clip(a2, 0, 255).astype(np.uint8)); d = ImageDraw.Draw(im, "RGBA")
    # A winding stone path from the front up to the cottage door.
    def px_(t): return 1000 + 150 * math.sin(t * 2.6) + t * 234
    pl, pr = [], []
    for t in np.linspace(0, 1, 40):
        y = H - t * (H - hb); w = 120 * (1 - t) ** 1.2 + 14
        pl.append((px_(t) - w, y)); pr.append((px_(t) + w, y))
    d.polygon(pl + pr[::-1], fill=(220, 202, 170, 255))
    for _ in range(500):
        t = rng.random() ** .8; y = H - t * (H - hb); x = px_(t) + rng.uniform(-1, 1) * (110 * (1 - t) + 10)
        s = 9 * (1 - t) + 2; c = int(rng.uniform(176, 236))
        d.ellipse([x - s, y - s * .45, x + s, y + s * .45], fill=(c, c - 14, c - 36, 210))
    for _ in range(4200):
        x = rng.uniform(820, W); y = rng.uniform(640, H); h = 6 + (y - 600) / 300 * 28
        g = [(96, 124, 70), (124, 136, 84), (70, 100, 62), (140, 130, 80), (110, 132, 104), (84, 112, 56)][rng.integers(0, 6)]
        d.line([(x, y), (x + rng.uniform(-6, 6), y - h)], fill=g + (190,), width=3)
    leaves = [(64, 100, 56), (96, 112, 64), (112, 130, 98), (52, 82, 60)]
    flowers = [(168, 62, 48), (214, 160, 60), (200, 110, 52), (196, 124, 118), (240, 228, 204), (70, 86, 140), (140, 120, 160), (186, 84, 66)]
    beds(im, 60, [(x, hb + 2, .7) for x in range(hx, hx + 310, 20)], flowers, leaves, 5, 50, 12)
    edgeR = [(px_(t) + (120 * (1 - t) ** 1.2 + 14) + 40 * (1 - t), H - t * (H - hb), 1.1 - .7 * t) for t in np.linspace(0, .9, 30)]
    edgeL = [(px_(t) - (120 * (1 - t) ** 1.2 + 14) - 50 * (1 - t), H - t * (H - hb), 1.1 - .7 * t) for t in np.linspace(0, .9, 30)]
    beds(im, 150, edgeR, flowers, leaves, 6, 52, 30)
    beds(im, 120, edgeL, flowers, leaves, 6, 53, 26)
    d = ImageDraw.Draw(im, "RGBA")
    # A white picket fence along the left of the path, and a lamp post by the gate.
    pts = []
    for i, t in enumerate(np.linspace(1, 0, 22)):
        y = H + 20 - t * (H + 20 - 650)
        pts.append((px_(t) - (130 * (1 - t) + 30), y, .45 + .9 * (1 - t)))
    for (x0, y0, s0), (x1, y1, s1) in zip(pts, pts[1:]):
        for hh in (.3, .72):
            d.line([(x0, y0 - 50 * s0 * hh), (x1, y1 - 50 * s1 * hh)], fill=(236, 232, 226, 255), width=max(2, int(5 * s0)))
    for x, y, s in pts:
        d.polygon([(x - 5 * s, y), (x - 5 * s, y - 50 * s), (x, y - 58 * s), (x + 5 * s, y - 50 * s), (x + 5 * s, y)], fill=(252, 250, 244, 255))
        d.line([(x + 4 * s, y), (x + 4 * s, y - 50 * s)], fill=(206, 200, 206, 255), width=max(1, int(2 * s)))
    px, py = 1250, 880
    d.rectangle([px - 4, py - 170, px + 4, py], fill=(40, 40, 44, 255))
    d.rectangle([px - 14, py - 200, px + 14, py - 170], fill=(255, 226, 140, 255))
    d.polygon([(px - 18, py - 200), (px, py - 216), (px + 18, py - 200)], fill=(40, 40, 44, 255))
    a3 = glow(np.asarray(im, float), px, py - 185, 70, "#ffe6a6", .6)
    im = Image.fromarray(np.clip(a3, 0, 255).astype(np.uint8)); d = ImageDraw.Draw(im, "RGBA")
    # Surf crashing on the rocks: tall white plumes, lit warm on top, with spray.
    for cx, cy, R in [(720, 680, 150), (840, 630, 100), (650, 790, 110)]:
        for _ in range(420):
            a_ = rng.uniform(math.pi * 1.05, math.pi * 1.95); r_ = abs(rng.normal(0, R))
            x, y = cx + math.cos(a_) * r_ * .8, cy + math.sin(a_) * r_ * 1.25; s = rng.uniform(5, 20) * max(.15, 1 - r_ / (R * 2.4))
            warm = max(0, (cy - y) / (R * 1.6))
            c = (min(255, int(250 + 5 * warm)), int(250 - 8 * warm), int(246 - 30 * warm))
            d.ellipse([x - s, y - s, x + s, y + s], fill=c + (int(rng.uniform(90, 220)),))
    for _ in range(140):
        x, y = rng.uniform(560, 760), rng.uniform(700, H); s = rng.uniform(4, 14)
        d.ellipse([x - s * 1.6, y - s * .5, x + s * 1.6, y + s * .5], fill=(250, 250, 246, int(rng.uniform(80, 200))))
    for gx, gy in [(560, 300), (600, 280), (520, 340), (1300, 200)]:
        d.arc([gx - 12, gy - 6, gx, gy + 6], 200, 340, fill=(80, 80, 96, 255), width=3); d.arc([gx, gy - 6, gx + 12, gy + 6], 200, 340, fill=(80, 80, 96, 255), width=3)
    oil(im)

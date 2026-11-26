"""An original painted landscape for Classic 4: evening on a mountain lake, in the manner of the
19th-century American landscape painters (deep blue sky, warm glow on the horizon, snowy peaks,
dark pines, still water). Everything is drawn here; no outside image is used."""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1600, 1000
rng = np.random.default_rng(int(sys.argv[2]) if len(sys.argv) > 2 else 7)
out = sys.argv[1]


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
        pts = r.random(k)
        acc += np.interp(x, np.linspace(0, n - 1, k), pts) * amp; tot += amp; amp *= 0.55
    return acc / tot


def lerp(a, b, t):
    return a + (b - a) * t


def col(h):
    h = h.lstrip("#"); return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float)


HORIZON = 600  # the far shore / water line
img = np.zeros((H, W, 3))
yy = np.arange(H)[:, None] / H
xx = np.arange(W)[None, :] / W

# Sky: deep night blue at the top to a warm gold glow low on the left, where the sun has set.
top, mid, low, glow = col("#0d1a33"), col("#1f3d6b"), col("#7c86a0"), col("#f3c47e")
t = np.clip(yy / (HORIZON / H), 0, 1)
sky = np.where(t[..., None] < .55, lerp(top, mid, (t / .55)[..., None]), lerp(mid, low, ((t - .55) / .45)[..., None]))
sky = np.broadcast_to(sky, (H, W, 3)).copy()
sun = np.exp(-(((xx - .32) / .32) ** 2 + ((yy - .58) / .2) ** 2))
sky = lerp(sky, glow, (sun * .9)[..., None])
# Clouds: soft bands lit warm from below on the glow side, cool blue elsewhere.
cn = noise2(W, H, 520, 6, 3)
band = .8 * np.exp(-((yy - .2) / .08) ** 2) + np.exp(-((yy - .36) / .05) ** 2)
cloud = np.clip((cn - .44) * 3.4, 0, 1) * band
lit = lerp(col("#3b5683"), col("#f0b27e"), np.clip(sun * 1.6 + (yy - .25) * 1.2, 0, 1)[..., None])
sky = lerp(sky, lit, (cloud * .85)[..., None])
img[:] = sky

# Stars, faint, only high in the darkest sky.
for _ in range(140):
    x, y = rng.integers(0, W), rng.integers(0, int(H * .28))
    if sun[y, x] < .15 and cloud[y, x] < .1:
        b = rng.uniform(.25, .8) * (1 - y / (H * .28))
        img[y, x] = lerp(img[y, x], col("#f4f1e6"), b)
# The evening star.
for dy in range(-3, 4):
    for dx in range(-3, 4):
        d = (dx * dx + dy * dy) ** .5
        img[150 + dy, 1180 + dx] = lerp(img[150 + dy, 1180 + dx], col("#fffbe8"), max(0, 1 - d / 3.2))


def ridge(base, amp, scale, seed, sharp=1.0):
    n = noise1(W, scale, 7, seed)
    n = np.abs(n - .5) * 2 if sharp > 1 else n
    return base - amp * n


def fill_below(layer_y, color_top, color_bot, haze, tex_seed, light_from_left=0.0, snow=None):
    global img
    tex = noise2(W, H, 90, 5, tex_seed)
    sm = np.convolve(layer_y, np.ones(25) / 25, mode='same')
    for x in range(W):
        y0 = int(max(0, layer_y[x]))
        if y0 >= HORIZON: continue
        ys = np.arange(y0, HORIZON)
        f = ((ys - y0) / max(1, HORIZON - y0))[:, None]
        c = lerp(color_top, color_bot, f)
        c = c * (0.9 + 0.2 * tex[ys, x][:, None])
        if light_from_left:
            slope = sm[min(W - 1, x + 12)] - sm[max(0, x - 12)]
            c = c + np.clip(slope, -20, 20) / 20 * light_from_left * col("#f2c48f") * (1 - f) * .25
        if snow is not None:
            s = np.clip((snow[x] - (ys - y0)) / 18, 0, 1)[:, None] * np.clip((tex[ys, x][:, None] - .35) * 3, 0, 1)
            snowc = lerp(col("#c9d3e6"), col("#f6d8b8"), np.clip(1.3 - x / W * 1.8, 0, 1))
            c = lerp(c, snowc, s)
        img[ys, x] = lerp(c, img[ys, x], haze)


# Far snowy peaks, pale in the haze, with an alpenglow on the sunset side.
far = ridge(HORIZON - 70, 420, 700, 11, sharp=2)
far = np.minimum(far, HORIZON - 40)
fill_below(far, col("#7a88a8"), col("#4f6188"), .35, 21, light_from_left=1.2, snow=noise1(W, 300, 5, 31) * 120 + 40)
mid_r = ridge(HORIZON - 15, 190, 520, 12)
fill_below(mid_r, col("#2f4669"), col("#22355a"), .25, 22, light_from_left=.6)
near = ridge(HORIZON + 5, 95, 300, 13)
fill_below(near, col("#18273f"), col("#132036"), .1, 23)

# Mist on the far shore.
mist = np.exp(-((np.arange(H) - (HORIZON - 12)) / 22.0) ** 2)[:, None] * (0.55 + 0.45 * noise2(W, H, 260, 4, 41))
img = lerp(img, col("#9fb0cc"), (mist * .35)[..., None])

# Water: the sky and mountains reflected, darker and a little blue, with long ripples.
above = img[:HORIZON].copy()
refl = above[::-1]
rows = H - HORIZON
r = np.zeros((rows, W, 3))
ripple = noise2(W, rows, 40, 3, 51)
for i in range(rows):
    src = min(HORIZON - 1, int(i * 1.0))
    shift = int((ripple[i, ::97].mean() - .5) * (6 + i * .05))
    line = np.roll(refl[src], shift, axis=0)
    r[i] = line
depth = (np.arange(rows) / rows)[:, None, None]
r = lerp(r, col("#0f1d36"), .35 + .45 * depth)
streak = (np.sin(np.arange(rows)[:, None] * .9 + ripple * 30) > .93) * (1 - depth[..., 0]) * .18
r = lerp(r, col("#f1d3a0"), (streak * np.exp(-((xx - .3) / .12) ** 2))[..., None])
img[HORIZON:] = r

im = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
d = ImageDraw.Draw(im, "RGBA")

# Dark pine forest on the near shore (left) and a rocky point with tall pines (right).
def pine(x, base, h, c):
    x, base, h = float(x), float(base), float(h); c = tuple(int(v) for v in c)
    w = h * .32
    tiers = 7
    for k in range(tiers):
        ty = base - h * (k / tiers) * .92
        tw = w * (1 - k / tiers) * (1.0 + rng.uniform(-.12, .12))
        d.polygon([(x - tw, ty), (x + tw, ty), (x + rng.uniform(-2, 2), ty - h * .28)], fill=c)
    d.line([(x, base), (x, base - h)], fill=c, width=max(2, int(h * .03)))

shn = noise1(W, 60, 4, 71)
shore = lambda x: HORIZON + 30 + (max(0, x) / 470) ** 2.2 * 330 + shn[int(min(W - 1, max(0, x)))] * 30
pts = [(x, shore(x)) for x in range(0, 471, 6)]
d.polygon([(0, HORIZON + 20)] + pts + [(0, H)], fill=(12, 20, 34, 255))
d.polygon([(0, H)] + [(x, HORIZON + 30 + (x / 470) ** 2.2 * 330 + 40) for x in range(0, 471, 6)] + [(470, H)], fill=(12, 20, 34, 255))
for i in range(55):
    x = rng.uniform(-10, 430)
    pine(x, shore(x) + 8, rng.uniform(110, 300) * (1.2 - x / 600), (10 + rng.integers(0, 6), 17 + rng.integers(0, 7), 30 + rng.integers(0, 8), 255))
rx = 1260
d.polygon([(rx + 140, H), (rx + 20, HORIZON + 330), (rx - 30, HORIZON + 120), (rx + 40, HORIZON + 50), (rx + 160, HORIZON + 30), (W, HORIZON + 15), (W, H)], fill=(14, 22, 36, 255))
for i in range(26):
    x = rng.uniform(rx + 10, W + 20)
    pine(x, HORIZON + 50 + max(0, rx + 60 - x) * 1.2, rng.uniform(140, 330), (9, 17, 30, 255))
# A lone canoe with its paddler, small, near the glow's reflection.
d.ellipse([700, 762, 780, 772], fill=(8, 12, 20, 255))
d.polygon([(736, 764), (744, 764), (742, 742), (738, 742)], fill=(8, 12, 20, 255))
d.ellipse([736, 733, 744, 742], fill=(8, 12, 20, 255))
d.line([(728, 748), (758, 778)], fill=(8, 12, 20, 255), width=2)
# The canoe's reflection and wake.
d.line([(660, 780), (820, 780)], fill=(200, 175, 140, 60), width=1)
d.line([(680, 788), (800, 788)], fill=(200, 175, 140, 40), width=1)

# A painted finish: soft blur, brush grain, warm varnish and a gentle vignette.
im = im.filter(ImageFilter.ModeFilter(5)).filter(ImageFilter.GaussianBlur(.9))
a = np.asarray(im, float)
grain = noise2(W, H, 6, 2, 61)[..., None]
strokes = noise2(W, H, 18, 3, 62)[..., None]
a = a * (0.94 + 0.08 * grain) * (0.96 + 0.06 * strokes)
a = lerp(a, a * col("#fff3dc") / 255, .18)
vig = np.clip(1 - (((xx - .5) / .75) ** 2 + ((yy - .5) / .8) ** 2), 0, 1) ** .35
a = a * (0.72 + 0.28 * vig[..., None])
Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(out, quality=86, optimize=True, progressive=True)
print("saved", out)

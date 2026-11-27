"""Two original oil-painting-style banners for Grandma's looks: "Chapel" (a little white chapel at
evening with glowing windows, gardens and a lamp-lit path) and "Lighthouse" (a lighthouse on a
rocky point at dusk, with its warm beam, a keeper's cottage and wildflowers). Everything is drawn
here; nothing is copied from any painting.
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


def hill(a, base, amp, scale, seed, c1, c2, depth=300):
    ridge = base - amp * noise1(W, scale, 5, seed)
    ys = np.arange(H)[:, None]
    f = np.clip((ys - ridge[None, :]) / depth, 0, 1)
    c = lerp(col(c1), col(c2), f[..., None]) * (0.92 + 0.14 * noise2(W, H, 60, 4, seed + 7)[..., None])
    m = ys >= ridge[None, :]
    a[m] = c[m]
    return a, ridge


def dabs(im, n, area, colors, size, seed, alpha=(150, 235)):
    """Paint-dab flowers and leaves: many small soft ovals."""
    r = np.random.default_rng(seed)
    d = ImageDraw.Draw(im, "RGBA")
    x0, y0, x1, y1 = area
    for _ in range(n):
        x, y = r.uniform(x0, x1), r.uniform(y0, y1)
        s = size * (0.6 + 0.8 * r.random()) * (0.5 + (y - y0) / max(1, y1 - y0))
        c = colors[r.integers(0, len(colors))]
        d.ellipse([x - s, y - s * .75, x + s, y + s * .75], fill=c + (int(r.uniform(*alpha)),))


def oil(im, mode=7, blur=1.1):
    """An oil-paint finish: blended strokes, canvas weave, a warm varnish and a soft vignette."""
    im = im.filter(ImageFilter.ModeFilter(mode)).filter(ImageFilter.GaussianBlur(blur))
    a = np.asarray(im, float)
    strokes = noise2(W, H, 9, 3, 61)[..., None]
    weave = (np.sin(np.arange(W)[None, :] * 1.9) * np.sin(np.arange(H)[:, None] * 1.9))[..., None]
    a = a * (0.95 + 0.08 * strokes) * (1 + 0.012 * weave)
    a = lerp(a, a * col("#fff1dc") / 255, .14)
    v = np.clip(1 - (((xx - .5) / .8) ** 2 + ((yy - .5) / .85) ** 2), 0, 1) ** .4
    a = a * (0.76 + 0.24 * v[..., None])
    Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(out, quality=86, optimize=True, progressive=True)
    print("saved", out)


if which == "chapel":
    a = gradient([(0, "#6f6f9e"), (.22, "#b58fae"), (.4, "#f0b9a0"), (.52, "#fde0b0"), (1, "#fde0b0")])
    a = glow(a, 1150, 470, 360, "#fff0c8", .8)
    cl = noise2(W, H, 420, 6, 3)
    band = np.exp(-((yy - .18) / .09) ** 2) + .8 * np.exp(-((yy - .33) / .05) ** 2)
    a = lerp(a, lerp(col("#c79ab8"), col("#ffd8b0"), np.clip(xx * 1.2, 0, 1)[..., None]), (np.clip((cl - .46) * 3, 0, 1) * band * .7)[..., None])
    a, _ = hill(a, 540, 90, 700, 1, "#a7a0b8", "#b9aab8")            # far hills, hazy
    a, _ = hill(a, 600, 70, 500, 2, "#7f8f78", "#6b7d62")            # middle meadow
    a, near = hill(a, 640, 40, 400, 3, "#5e7a4e", "#3e5536", 260)   # the chapel's hill
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)); d = ImageDraw.Draw(im, "RGBA")
    # Soft round trees behind the chapel.
    for x, y, r_, c in [(470, 610, 90, (64, 92, 60)), (560, 590, 70, (78, 104, 66)), (1010, 600, 80, (70, 98, 62)), (1090, 620, 60, (60, 86, 56))]:
        for k in range(30):
            ox, oy, rr = rng.normal(0, r_ * .45), rng.normal(0, r_ * .35), r_ * rng.uniform(.3, .6)
            d.ellipse([x + ox - rr, y + oy - rr, x + ox + rr, y + oy + rr], fill=(c[0] + rng.integers(-8, 14), c[1] + rng.integers(-8, 14), c[2] + rng.integers(-8, 10), 230))
    # The chapel: white walls warmed by the sunset, a steeple, glowing windows and an open door.
    cx, base = 780, 640
    wall, roof, shade = (246, 236, 222, 255), (122, 70, 62, 255), (214, 198, 186, 255)
    d.polygon([(cx - 150, base), (cx - 150, base - 130), (cx + 120, base - 130), (cx + 120, base)], fill=wall)
    d.polygon([(cx - 170, base - 128), (cx - 15, base - 230), (cx + 140, base - 128)], fill=roof)
    d.polygon([(cx + 120, base), (cx + 120, base - 130), (cx + 175, base - 110), (cx + 175, base + 8)], fill=shade)
    d.polygon([(cx + 140, base - 128), (cx + 120, base - 130), (cx + 175, base - 112), (cx + 190, base - 112)], fill=(100, 58, 52, 255))
    # Steeple and cross.
    d.polygon([(cx - 45, base - 200), (cx + 15, base - 200), (cx + 15, base - 290), (cx - 45, base - 290)], fill=wall)
    d.polygon([(cx - 55, base - 288), (cx - 15, base - 370), (cx + 25, base - 288)], fill=roof)
    d.rectangle([cx - 18, base - 410, cx - 12, base - 366], fill=(240, 220, 170, 255)); d.rectangle([cx - 30, base - 398, cx, base - 392], fill=(240, 220, 170, 255))
    d.ellipse([cx - 27, base - 268, cx - 3, base - 244], fill=(255, 214, 120, 255))   # bell window
    # Glowing windows and door.
    win = (255, 205, 110, 255)
    for wx in (cx - 120, cx - 70, cx + 40, cx + 85):
        d.rounded_rectangle([wx, base - 105, wx + 26, base - 55], 12, fill=win)
    d.rounded_rectangle([cx - 30, base - 85, cx + 6, base], 16, fill=(255, 196, 96, 255))
    # A lamp-lit path down the hill, and a lamp post.
    d.polygon([(cx - 22, base), (cx + 2, base), (cx + 160, H), (cx - 180, H)], fill=(214, 186, 140, 255))
    lx = cx - 150
    d.rectangle([lx - 3, base + 10, lx + 3, base + 120], fill=(40, 38, 40, 255)); d.rectangle([lx - 10, base, lx + 10, base + 16], fill=(255, 220, 140, 255))
    im2 = np.asarray(im, float)
    for (gx, gy, gr, gk) in [(cx - 107, base - 80, 40, .55), (cx - 57, base - 80, 40, .55), (cx + 53, base - 80, 40, .55), (cx + 98, base - 80, 40, .55), (cx - 12, base - 40, 60, .6), (lx, base + 8, 70, .7), (cx - 15, base - 256, 30, .5)]:
        im2 = glow(im2, gx, gy, gr, "#ffd98a", gk)
    im = Image.fromarray(np.clip(im2, 0, 255).astype(np.uint8))
    # Gardens: dabs of roses, lavender, white and gold all down the hill.
    flowers = [(240, 150, 170), (250, 196, 206), (196, 150, 214), (255, 240, 236), (247, 210, 120), (230, 120, 140)]
    dabs(im, 900, (0, 700, cx - 200, H), flowers, 8, 21)
    dabs(im, 900, (cx + 190, 690, W, H), flowers, 8, 22)
    dabs(im, 500, (0, 690, W, H), [(70, 110, 66), (92, 130, 80), (58, 92, 56)], 9, 23, (120, 200))
    dabs(im, 400, (cx - 260, 700, cx + 300, H), flowers, 6, 24)
    # A soft evening sparkle in the air.
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0)); gd = ImageDraw.Draw(g)
    for _ in range(60):
        x, y, r_ = rng.normal(cx, 380), rng.normal(520, 160), rng.uniform(2, 6)
        gd.ellipse([x - r_, y - r_, x + r_, y + r_], fill=(255, 240, 200, int(rng.uniform(80, 180))))
    im = Image.alpha_composite(im.convert("RGBA"), g.filter(ImageFilter.GaussianBlur(2))).convert("RGB")
    oil(im)

else:  # lighthouse
    HZ = 520
    a = gradient([(0, "#5c6a96"), (.25, "#a993b4"), (.45, "#f2b49a"), (.56, "#fcd9a6"), (.58, "#e9c6a4"), (1, "#3f6a80")])
    a = glow(a, 420, 470, 330, "#fff1cc", .85)
    cl = noise2(W, H, 420, 6, 5)
    band = np.exp(-((yy - .2) / .09) ** 2) + .7 * np.exp(-((yy - .36) / .05) ** 2)
    a = lerp(a, lerp(col("#ffd6b4"), col("#b393b6"), np.clip(xx * 1.2, 0, 1)[..., None]), (np.clip((cl - .46) * 3, 0, 1) * band * .7)[..., None])
    # The sea: deeper blue toward the front, with the sunset's path of light on it.
    ys = np.arange(H)[:, None]
    sea = ys >= HZ
    f = np.clip((ys - HZ) / (H - HZ), 0, 1)
    seac = lerp(col("#9fb4c4"), col("#2f5a70"), f[..., None])
    rip = noise2(W, H, 7, 2, 31)
    path = np.exp(-((xx - .26) / (.05 + .2 * f)) ** 2)
    seac = lerp(seac, col("#ffe6b8"), (path * np.clip((rip - .5) * 6, 0, 1) * (1 - f * .7) * .75)[..., None])
    seac = seac * (0.94 + 0.1 * rip[..., None])
    a = np.where(sea[..., None], seac, a)
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)); d = ImageDraw.Draw(im, "RGBA")
    # A far headland.
    d.polygon([(0, HZ + 2)] + [(x, HZ - 30 * math.sin(x / 260) ** 2 - 10) for x in range(0, 520, 10)] + [(520, HZ + 2)], fill=(150, 140, 170, 200))
    # The rocky point the lighthouse stands on (right), with grass on top.
    pts = [(860, H), (900, 640), (980, 600), (1080, 560), (1240, 540), (1400, 545), (W, 530), (W, H)]
    d.polygon(pts, fill=(132, 112, 102, 255))
    for _ in range(140):
        x, y = rng.uniform(900, W), rng.uniform(600, H); s = rng.uniform(10, 26)
        c = int(rng.uniform(110, 170))
        d.polygon([(x - s, y), (x - s * .3, y - s * .7), (x + s * .6, y - s * .4), (x + s, y + s * .2)], fill=(c, c - 8, c - 4, 235))
    d.polygon([(980, 600), (1080, 556), (1240, 534), (1400, 538), (W, 522), (W, 600), (1300, 610), (1100, 630)], fill=(108, 134, 84, 255))
    # The lighthouse: white with red bands, a gallery, and the lantern room aglow.
    lx, lb, lt = 1250, 560, 200
    def tower(y0, y1, c):
        t0 = (y0 - lt) / (lb - lt); t1 = (y1 - lt) / (lb - lt)
        w0 = 34 + 26 * t0; w1 = 34 + 26 * t1
        d.polygon([(lx - w0, y0), (lx + w0, y0), (lx + w1, y1), (lx - w1, y1)], fill=c)
    tower(lt, lb, (246, 238, 228, 255))
    for y0 in (270, 370, 470):
        tower(y0, y0 + 40, (178, 64, 56, 255))
    d.polygon([(lx + 20, lt), (lx + 34, lt), (lx + 60, lb), (lx + 40, lb)], fill=(214, 200, 192, 140))
    d.rectangle([lx - 46, lt - 8, lx + 46, lt + 2], fill=(40, 40, 46, 255))
    d.rectangle([lx - 28, lt - 52, lx + 28, lt - 8], fill=(255, 224, 140, 255))
    for k in (-14, 0, 14):
        d.line([(lx + k, lt - 52), (lx + k, lt - 8)], fill=(60, 56, 60, 255), width=2)
    d.polygon([(lx - 36, lt - 52), (lx, lt - 84), (lx + 36, lt - 52)], fill=(150, 56, 50, 255))
    # The keeper's cottage with lit windows.
    hx, hb = 1420, 548
    d.polygon([(hx - 70, hb), (hx - 70, hb - 60), (hx + 70, hb - 60), (hx + 70, hb)], fill=(240, 230, 218, 255))
    d.polygon([(hx - 84, hb - 58), (hx, hb - 110), (hx + 84, hb - 58)], fill=(110, 64, 60, 255))
    for wx in (hx - 46, hx + 22):
        d.rectangle([wx, hb - 44, wx + 22, hb - 20], fill=(255, 206, 110, 255))
    # A sailboat far out, and gulls.
    d.polygon([(560, 560), (600, 560), (592, 568), (566, 568)], fill=(70, 70, 86, 255)); d.polygon([(580, 558), (580, 510), (602, 556)], fill=(250, 240, 226, 255))
    for gx, gy in [(700, 260), (740, 240), (660, 300)]:
        d.arc([gx - 12, gy - 6, gx, gy + 6], 200, 340, fill=(80, 80, 96, 255), width=3); d.arc([gx, gy - 6, gx + 12, gy + 6], 200, 340, fill=(80, 80, 96, 255), width=3)
    a2 = np.asarray(im, float)
    # The beam: a soft warm fan of light out to sea, and the lantern's glow.
    ang = np.arctan2(yy * H - (lt - 30), xx * W - lx)
    dist = np.sqrt((xx * W - lx) ** 2 + (yy * H - (lt - 30)) ** 2)
    beam = np.exp(-((ang - math.pi * 0.97) / .05) ** 2) * np.clip(1 - dist / 1100, 0, 1)
    a2 = lerp(a2, col("#fff2c4"), (beam * .45)[..., None])
    a2 = glow(a2, lx, lt - 30, 70, "#ffe6a0", .8)
    for wx in (hx - 35, hx + 33):
        a2 = glow(a2, wx, hb - 32, 30, "#ffd88a", .5)
    im = Image.fromarray(np.clip(a2, 0, 255).astype(np.uint8))
    # Wildflowers and dune grass on the near shore (left-front), and on the point.
    d = ImageDraw.Draw(im, "RGBA")
    d.polygon([(0, H)] + [(x, 760 - 60 * math.sin(x / 300) - x * .05) for x in range(0, 900, 10)] + [(900, H)], fill=(120, 140, 92, 255))
    for _ in range(500):
        x = rng.uniform(0, 880); y = rng.uniform(740 - x * .05, H); h = rng.uniform(20, 70)
        d.line([(x, y), (x + rng.uniform(-14, 14), y - h)], fill=(90 + rng.integers(0, 40), 118 + rng.integers(0, 30), 72, 200), width=2)
    flowers = [(240, 150, 170), (250, 205, 214), (196, 150, 214), (255, 244, 238), (250, 214, 110)]
    dabs(im, 700, (0, 760, 880, H), flowers, 8, 41)
    dabs(im, 260, (1000, 560, W, 640), flowers, 5, 42)
    # Waves breaking white on the rocks.
    d = ImageDraw.Draw(im, "RGBA")
    for _ in range(90):
        x, y = rng.uniform(860, 1000), rng.uniform(640, H); s = rng.uniform(8, 22)
        d.ellipse([x - s, y - s * .4, x + s, y + s * .4], fill=(250, 250, 246, int(rng.uniform(120, 220))))
    oil(im)

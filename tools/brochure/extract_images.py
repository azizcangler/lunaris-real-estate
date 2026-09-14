import sys, os, io, pymupdf as fitz
from PIL import Image
A="/Users/lua/Desktop/Projeler/Lunaris_Real_Estate/ALDAR Athlon by Aldar.pdf"
D="/Users/lua/Desktop/Projeler/Lunaris_Real_Estate/DAMAC Damac Islands - Seychelles 2.pdf"
ROOT="/Users/lua/Desktop/Projeler/Lunaris_Real_Estate/extracted/src/assets/projects"

def pil_from_pix(pix):
    if pix.alpha: pix = fitz.Pixmap(pix, 0)
    if pix.n != 3: pix = fitz.Pixmap(fitz.csRGB, pix)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)

def save(im, path, width, q=78):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(path, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"{os.path.basename(path):34s} {im.width}x{im.height} {os.path.getsize(path)//1024} KB")

def run(pdf, outdir, spec):
    doc = fitz.open(pdf); os.makedirs(outdir, exist_ok=True)
    for name, page, src, width in spec:
        p = doc[page-1]
        if src == "page":
            im = pil_from_pix(p.get_pixmap(matrix=fitz.Matrix(width/p.rect.width, width/p.rect.width), alpha=False))
        elif isinstance(src, tuple):   # clip rect on page in page units
            clip = fitz.Rect(*src)
            im = pil_from_pix(p.get_pixmap(matrix=fitz.Matrix(width/clip.width, width/clip.width), clip=clip, alpha=False))
        else:
            im = pil_from_pix(fitz.Pixmap(doc, src))
        save(im, f"{outdir}/{name}.jpg", width)

athlon = [
    ("cover", 1, "page", 1600),
    ("cover-texture", 75, 526, 1600),
    ("hero-aerial-dusk", 13, 99, 2000),
    ("runners", 4, 20, 1600),
    ("aerial-loops", 7, 40, 1800),
    ("clubhouse-cycle", 8, 46, 1600),
    ("clubhouse-dusk", 12, 94, 1600),
    ("family-lawn", 10, 81, 1600),
    ("villa-street", 11, 87, 1600),
    ("yoga", 14, 105, 1200),
    ("runner-path", 15, 109, 1600),
    ("padel", 16, 114, 1600),
    ("amenity-hub-aerial", 17, 123, 1200),
    ("pump-track", 18, 128, 1600),
    ("park-loop", 19, 132, 1600),
    ("pool-kids", 20, 136, 1600),
    ("bridge-cyclists", 21, 140, 1600),
    ("villas-aerial", 22, 144, 1600),
    ("atrium-tree", 24, 159, 1400),
    ("villa-carport", 25, 163, 1400),
    ("expert-haaland", 26, 174, 1000),
    ("family-football", 28, 190, 1600),
    ("townhouse-1-front", 29, 194, 1600), ("townhouse-1-back", 30, 198, 1600),
    ("townhouse-2-front", 31, 202, 1600), ("townhouse-2-back", 32, 206, 1600),
    ("villa-3-1-front", 35, 218, 1600), ("villa-3-1-back", 36, 222, 1600),
    ("villa-3-2-front", 37, 226, 1600), ("villa-3-2-back", 38, 230, 1600),
    ("villa-4-1-front", 40, 238, 1600), ("villa-4-1-back", 41, 242, 1600),
    ("villa-4-2-front", 42, 246, 1600), ("villa-4-2-back", 43, 250, 1600),
    ("villa-5-1-front", 45, 258, 1600), ("villa-5-1-back", 46, 262, 1600),
    ("villa-5-2-front", 47, 266, 1600), ("villa-5-2-back", 48, 270, 1600),
    ("premium-4-horizon-front", 51, 341, 1600), ("premium-4-horizon-back", 52, 346, 1600),
    ("premium-4-pillar-front", 53, 351, 1600), ("premium-4-pillar-back", 54, 355, 1600),
    ("premium-5-horizon-front", 56, 364, 1600), ("premium-5-horizon-back", 57, 368, 1600),
    ("premium-5-pillar-front", 58, 372, 1600), ("premium-5-pillar-back", 59, 376, 1600),
    ("premium-6-horizon-front", 61, 384, 1600), ("premium-6-horizon-back", 62, 389, 1600),
    ("premium-6-pillar-front", 63, 394, 1600), ("premium-6-pillar-back", 64, 399, 1600),
    ("interior-living", 66, 432, 1600), ("interior-dining", 67, 437, 1600),
    ("interior-kitchen", 68, 442, 1600), ("interior-bedroom", 69, 447, 1600),
    ("interior-bedroom-green", 70, 452, 1600), ("interior-double-height", 72, 462, 1600),
    ("developer-clubhouse", 2, 7, 1200),
    ("location-map", 9, 54, 2000),
]
damac = [
    ("cover", 1, "page", 1600),
    ("cover-texture", 1, 619, 1600),  # cover wave raster, no wordmark (also page 71)
    ("hero-lagoon-aerial", 5, 42, 2000),
    ("pier", 4, 36, 1600),
    ("beach-panorama", 29, 192, 1800),
    ("masterplan-aerial", 8, 76, 1800),
    ("masterplan-plan", 8, "page", 1800),
    ("masterplan-icons", 9, "page", 1600),
    ("cluster-map", 55, "page", 1600),
    ("aqua-park-aerial", 10, 83, 1600),
    ("central-hub-fountain", 11, 87, 1300),
    ("lagoon-beach", 12, 93, 1300),
    ("water-platforms", 13, 98, 1300),
    ("paddling", 14, 104, 1300),
    ("waterfalls-spa", 15, 110, 1300),
    ("jungle-river", 16, 116, 1300),
    ("zipline", 17, 122, 1300),
    ("aqua-park", 18, 128, 1300),
    ("jungle-swings", 19, 134, 1300),
    ("yoga-decks", 20, 139, 1300),
    ("fitness-park", 21, 145, 1300),
    ("fruit-market", 22, 151, 1300),
    ("wildlife-park", 23, 157, 1300),
    ("aqua-dome", 24, 162, 1300),
    ("hammock-tour", 25, 168, 1300),
    ("mini-golf", 26, 176, 1300),
    ("boat-rides", 27, 182, 1300),
    ("wedding-venue", 28, 187, 1300),
    ("villa-exterior-day", 32, 206, 1400),
    ("villa-pool-day", 33, 213, 1400),
    ("villa-pool-night", 44, 260, 1400),
    ("interior-foyer", 37, 233, 1600),
    ("interior-formal-living", 38, 237, 1600),
    ("interior-dining", 40, 245, 1600),
    ("interior-family-living", 41, 249, 1600),
    ("interior-master-bath", 42, 253, 1600),
    ("interior-bath-2", 43, 256, 1600),
    ("townhouse-street", 53, 373, 1400),
    ("villa-7-front", 57, 391, 1600), ("villa-7-rear", 58, 398, 1600),
    ("villa-6-front", 60, 424, 1600), ("villa-6-rear", 61, 428, 1600),
    ("villa-div3-front", 63, 453, 1600), ("villa-div3-rear", 64, 457, 1600),
    ("townhouse-front", 66, 474, 1600), ("townhouse-rear", 67, 478, 1600),
]
which = sys.argv[1]
if which == "athlon": run(A, f"{ROOT}/athlon", athlon)
else: run(D, f"{ROOT}/damac-islands", damac)

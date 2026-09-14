import sys, pymupdf as fitz
from PIL import Image, ImageDraw
pdf, outdir = sys.argv[1], sys.argv[2]
doc = fitz.open(pdf)
W, H, LBL = 620, 349, 26
cols, rows = 3, 4
per = cols*rows
n = len(doc)
for s in range(0, n, per):
    sheet = Image.new("RGB", (cols*W, rows*(H+LBL)), "white")
    d = ImageDraw.Draw(sheet)
    for k in range(per):
        i = s+k
        if i >= n: break
        page = doc[i]
        pix = page.get_pixmap(matrix=fitz.Matrix(W/page.rect.width, H/page.rect.height), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        x = (k%cols)*W; y = (k//cols)*(H+LBL)
        d.text((x+6, y+6), f"p{i+1}", fill="black")
        sheet.paste(img, (x, y+LBL))
    sheet.save(f"{outdir}/sheet-{s//per+1:02d}.jpg", quality=80)
    print("wrote", f"{outdir}/sheet-{s//per+1:02d}.jpg")

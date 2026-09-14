import sys, pymupdf as fitz
doc = fitz.open(sys.argv[1])
for i, page in enumerate(doc):
    infos = page.get_image_info(xrefs=True)
    parts = []
    for inf in infos:
        x0,y0,x1,y1 = inf["bbox"]
        w = x1-x0; h = y1-y0
        if w < 60 or h < 60: continue
        parts.append(f"xref{inf['xref']} {inf['width']}x{inf['height']} @({x0:.0f},{y0:.0f} {w:.0f}x{h:.0f})")
    print(f"p{i+1}: " + " | ".join(parts))

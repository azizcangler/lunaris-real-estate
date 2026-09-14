import pymupdf as fitz
A="/Users/lua/Desktop/Projeler/Lunaris_Real_Estate/ALDAR Athlon by Aldar.pdf"
OUT="/Users/lua/Desktop/Projeler/Lunaris_Real_Estate/extracted/src/assets/projects/athlon/location-map.svg"
doc=fitz.open(A); page=doc[8]
def pt(p): return f"{p.x:.1f} {p.y:.1f}"
def path_d(d):
    out=[]; cur=None
    for it in d["items"]:
        op=it[0]
        if op=="l":
            a,b=it[1],it[2]
            if cur is None or (abs(cur.x-a.x)>0.05 or abs(cur.y-a.y)>0.05): out.append("M"+pt(a))
            out.append("L"+pt(b)); cur=b
        elif op=="c":
            a,c1,c2,b=it[1],it[2],it[3],it[4]
            if cur is None or (abs(cur.x-a.x)>0.05 or abs(cur.y-a.y)>0.05): out.append("M"+pt(a))
            out.append(f"C{pt(c1)} {pt(c2)} {pt(b)}"); cur=b
        elif op=="re":
            r=it[1]; out.append(f"M{r.x0:.1f} {r.y0:.1f}H{r.x1:.1f}V{r.y1:.1f}H{r.x0:.1f}Z"); cur=None
        elif op=="qu":
            q=it[1]; out.append("M"+pt(q.ul)+" L"+pt(q.ur)+" L"+pt(q.lr)+" L"+pt(q.ll)+"Z"); cur=None
    if d.get("closePath"): out.append("Z")
    return "".join(out)
labels=[]; markers=[]; skipped=[]
for d in page.get_drawings():
    f=d.get("fill"); r=d["rect"]
    if d["type"]!="f" or f is None: continue
    hexf="#%02x%02x%02x"%tuple(int(round(v*255)) for v in f[:3])
    if hexf=="#ffffff":
        if r.x0>1350 and 520<r.y0<740: skipped.append(r); continue   # brochure wordmark
        if r.width>400 or r.height>400: skipped.append(r); continue
        labels.append(f'<path class="ink" d="{path_d(d)}"/>')
    elif f[0]>0.6 and f[1]<0.2 and f[2]>0.5: markers.append(f'<path class="marker" d="{path_d(d)}"/>')
    elif f[1]>0.35 and f[0]<0.3 and f[2]<0.5: markers.append(f'<path class="marker-2" d="{path_d(d)}"/>')
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" role="img" aria-labelledby="athlon-map-title">
<title id="athlon-map-title">Map of Athlon in Dubailand with surrounding roads and landmarks</title>
<style>
.ground{{fill:var(--map-ground,#e9e1cf)}}
.ink{{fill:var(--map-ink,#4a4340)}}
.marker{{fill:var(--map-marker,#c000a4)}}
.marker-2{{fill:var(--map-ink,#4a4340);opacity:.45}}
.marker-stroke{{stroke:var(--map-marker,#c000a4);stroke-width:1.5;fill:none}}
text{{font-family:"Work Sans",system-ui,sans-serif;font-weight:500;fill:var(--map-ink,#4a4340);letter-spacing:.14em}}
</style>
<rect class="ground" width="1920" height="1080"/>
<image href="__MAP_IMAGE__" x="-131.2" y="-44.8" width="2171.6" height="1169.6" preserveAspectRatio="none"/>
{chr(10).join(labels)}
{chr(10).join(markers)}
<path class="marker-stroke" d="M1130 653H1180"/>
<text x="1192" y="660" font-size="24">ATHLON</text>
</svg>'''
open(OUT,"w").write(svg)
print("labels", len(labels), "markers", len(markers), "skipped", len(skipped), [ (round(r.x0),round(r.y0),round(r.width),round(r.height)) for r in skipped][:12], "bytes", len(svg))

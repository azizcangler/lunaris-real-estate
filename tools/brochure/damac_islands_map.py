import math, re, pymupdf as fitz
D="/Users/lua/Desktop/Projeler/Lunaris_Real_Estate/DAMAC Damac Islands - Seychelles 2.pdf"
OUT="/Users/lua/Desktop/Projeler/Lunaris_Real_Estate/extracted/src/assets/projects/damac-islands/location-map.svg"
doc=fitz.open(D); page=doc[6]
X0, X1, Y0, Y1 = 640, 1850, 0, 1080
W, H = X1-X0, Y1-Y0
def hx(c): return None if c is None else "#%02x%02x%02x"%tuple(int(round(v*255)) for v in c[:3])
def f(v): return f"{v - (X0 if False else 0):.1f}"
def pt(p): return f"{p.x-X0:.1f} {p.y-Y0:.1f}"
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
            r=it[1]; out.append(f"M{pt(r.tl)}H{r.x1-X0:.1f}V{r.y1-Y0:.1f}H{r.x0-X0:.1f}Z"); cur=None
        elif op=="qu":
            q=it[1]; out.append("M"+pt(q.ul)+" L"+pt(q.ur)+" L"+pt(q.lr)+" L"+pt(q.ll)+"Z"); cur=None
    if d.get("closePath"): out.append("Z")
    return "".join(out)

def classify(d):
    fill=hx(d.get("fill")); stroke=hx(d.get("color")); w=d.get("width") or 0
    r=d["rect"]
    if fill and r.width*r.height > 1920*1080*1.2: return None   # unclipped page-size fills
    if d["type"]=="f":
        if fill in ("#218eae","#269eb9"):
            if r.width>1900 or (r.width<40 and r.height<40 and len(d["items"])>=4): return None
            return ("water", None)
        if fill in ("#0090a8","#006e8c","#007a9c","#0087ad","#005c7d"): return ("land", None)
        if fill in ("#dcdbd5","#dbdbd6"): return None
        if fill=="#19c1dd": return ("marker", None)
        if fill=="#ffffff": return ("icon", None)
        return ("land", None)
    # strokes
    dashed = bool(d.get("dashes") and d["dashes"] not in ("[] 0", "", None))
    if stroke in ("#005c7c",): return ("road", w)
    if stroke in ("#3b657f",): return ("road-minor", w)
    if stroke in ("#ffffff","#dcdbd5","#dbdbd6"): return ("ring" if dashed else "icon-stroke", w)
    if stroke=="#484f33": return None   # hidden duplicate tower outline
    return ("icon-stroke", w)

parts=[]
skipped=0
for d in page.get_drawings():
    r=d["rect"]
    if r.x1 < X0-20 or r.x0 > X1+20: continue
    c=classify(d)
    if not c: skipped+=1; continue
    cls,w=c
    dd=path_d(d)
    if not dd: continue
    op = d.get("fill_opacity") if d["type"]=="f" else d.get("stroke_opacity")
    if op is not None and op < 0.35: skipped+=1; continue
    opattr = f' opacity="{op:.2f}"' if op is not None and op < 0.98 else ""
    if d["type"]=="f":
        parts.append(f'<path class="{cls}"{opattr} d="{dd}"/>')
    else:
        dash = ' stroke-dasharray="6 6"' if cls=="ring" else ""
        parts.append(f'<path class="{cls}"{opattr} fill="none" stroke-width="{w:.1f}"{dash} d="{dd}"/>')

# road labels: consecutive line pieces along the same road become one <text> on a <textPath>
pieces=[]
td=page.get_text("dict")
for b in td["blocks"]:
    if b["type"]!=0: continue
    for l in b["lines"]:
        raw="".join(s["text"] for s in l["spans"])
        if not raw.strip(): continue
        x0,y0,x1,y1=l["bbox"]
        if x0 < X0 or x0 > 1780 or l["spans"][0]["size"]>20: continue
        sp=l["spans"][0]; ox,oy=sp["origin"]; dx,dy=l["dir"]
        width=math.hypot(x1-x0,y1-y0)
        pieces.append({"text":raw,"ox":ox,"oy":oy,"dx":dx,"dy":dy,"w":width,"size":sp["size"]})
groups=[]
for pc in pieces:
    if groups:
        g=groups[-1]; last=g[-1]
        ex=last["ox"]+last["dx"]*last["w"]; ey=last["oy"]+last["dy"]*last["w"]
        gap=math.hypot(pc["ox"]-ex, pc["oy"]-ey)
        ang=abs(math.degrees(math.atan2(pc["dy"],pc["dx"])-math.atan2(last["dx"],last["dy"]*0+last["dx"]) )) if False else abs(math.degrees(math.atan2(pc["dy"],pc["dx"])-math.atan2(last["dy"],last["dx"])))
        if gap < 90 and ang < 45:
            g.append(pc); continue
    groups.append([pc])
labels=[]; defs=[]
for gi,g in enumerate(groups):
    text=re.sub(r"\s+"," ", "".join(p["text"] for p in g)).strip()
    for a,b in (("SHEIKHZAYED","SHEIKH ZAYED"),("ZAYEDROAD","ZAYED ROAD"),("SHEIKHMOHAMMED","SHEIKH MOHAMMED"),("MOHAMMEDBIN","MOHAMMED BIN"),("BINZAYED","BIN ZAYED"),("KHAILROAD","KHAIL ROAD"),("EMIRATESROAD","EMIRATES ROAD"),("ALKHAIL","AL KHAIL")):
        text=text.replace(a,b)
    if not text: continue
    pts=[(p["ox"]-X0, p["oy"]-Y0) for p in g]
    last=g[-1]; pts.append((last["ox"]+last["dx"]*(last["w"]+40)-X0, last["oy"]+last["dy"]*(last["w"]+40)-Y0))
    d="M"+" L".join(f"{x:.1f} {y:.1f}" for x,y in pts)
    defs.append(f'<path id="rl{gi}" d="{d}"/>')
    labels.append(f'<text font-size="{g[0]["size"]:.1f}"><textPath href="#rl{gi}">{text}</textPath></text>')
print("label groups", len(groups), [re.sub(r"\s+"," ","".join(p["text"] for p in g)).strip() for g in groups])

svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="damac-map-title">
<title id="damac-map-title">Map of Damac Islands in Dubailand with surrounding roads and landmarks</title>
<style>
.ground{{fill:var(--map-ground,#1b8ea8)}}
.water{{fill:var(--map-water,#2aa4be)}}
.land{{fill:var(--map-land,#0a8ba4)}}
.road{{stroke:var(--map-ink,#065b78);stroke-linecap:round;stroke-linejoin:round}}
.road-minor{{stroke:var(--map-ink,#065b78);stroke-linecap:round;stroke-linejoin:round;opacity:.55}}
.icon{{fill:var(--map-icon,#ffffff)}}
.icon-stroke{{stroke:var(--map-icon,#ffffff);stroke-linecap:round;stroke-linejoin:round}}
.ring{{stroke:var(--map-icon,#ffffff);opacity:.8}}
.marker{{fill:var(--map-marker,#4be0f5)}}
text{{font-family:"Work Sans",system-ui,sans-serif;font-weight:500;fill:var(--map-icon,#ffffff);opacity:.8;letter-spacing:.08em}}
</style>
<defs>
{chr(10).join(defs)}
</defs>
<rect class="ground" width="{W}" height="{H}"/>
{chr(10).join(parts)}
{chr(10).join(labels)}
</svg>'''
open(OUT,"w").write(svg)
print("paths", len(parts), "labels", len(labels), "skipped", skipped, "bytes", len(svg))

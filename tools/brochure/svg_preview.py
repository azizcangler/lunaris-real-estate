import re, sys, pymupdf as fitz
src, out, imgpath = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv)>3 else None)
svg=open(src).read()
# collect class -> declarations from <style>
style=re.search(r"<style>(.*?)</style>", svg, re.S).group(1)
rules={}
for m in re.finditer(r"\.([a-z0-9-]+)\{([^}]*)\}", style):
    decl=m.group(2)
    decl=re.sub(r"var\(--[a-z-]+,(#[0-9a-f]{6})\)", r"\1", decl)
    attrs={}
    for kv in decl.split(";"):
        if ":" in kv:
            k,v=kv.split(":",1); attrs[k.strip()]=v.strip()
    rules[m.group(1)]=attrs
textrule=re.search(r"text\{([^}]*)\}", style).group(1)
textfill=re.search(r"fill:var\(--[a-z-]+,(#[0-9a-f]{6})\)", textrule).group(1)
def repl(m):
    cls=m.group(1); attrs=rules.get(cls,{})
    s=" ".join(f'{k}="{v}"' for k,v in attrs.items() if k in ("fill","stroke","opacity","stroke-width","stroke-linecap","stroke-linejoin"))
    return s
svg=re.sub(r'class="([a-z0-9-]+)"', repl, svg)
svg=re.sub(r"<style>.*?</style>", "", svg, flags=re.S)
svg=svg.replace("<text ", f'<text fill="{textfill}" font-family="Helvetica" ')
if imgpath: svg=svg.replace("__MAP_IMAGE__", imgpath)
doc=fitz.open(stream=svg.encode(), filetype="svg")
doc[0].get_pixmap(matrix=fitz.Matrix(1,1)).save(out); print("saved", out)

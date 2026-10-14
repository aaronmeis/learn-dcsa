# Internal link check for learn-dcsa. Run from the repo root: python3 tools/linkcheck.py .
import re,os,sys,glob,urllib.parse
root=sys.argv[1]; bad=[]; n=0
def chk(src,base,href):
    global n
    if not href or href.startswith(('http:','https:','mailto:','#','data:','javascript:','blob:')) or '${' in href: return
    p=urllib.parse.unquote(href.split('#')[0].split('?')[0])
    if not p: return
    n+=1
    t=os.path.normpath(os.path.join(base,p))
    if os.path.isdir(t): t=os.path.join(t,'index.html')
    if not os.path.exists(t): bad.append((src,href))
for f in [os.path.join(root,'index.html')]+glob.glob(os.path.join(root,'library','*.html')):
    s=open(f,encoding='utf-8').read()
    for h in re.findall(r'(?:href|src)=["\']([^"\']+)["\']',s): chk(os.path.relpath(f,root),os.path.dirname(f),h)
for f in glob.glob(os.path.join(root,'js','*.js'))+[os.path.join(root,'shorts-catalog.js')]:
    s=open(f,encoding='utf-8').read()
    for h in re.findall(r'lib\("([^"$]+)"',s): chk(os.path.relpath(f,root),root,'library/'+h+'.html')
    for h in re.findall(r'(?:\blib|slug):"([a-z0-9-]+)"',s): chk(os.path.relpath(f,root)+' (data slug)',root,'library/'+h+'.html')
    for h in re.findall(r'["\']((?:assets|media|library|css|js)/[^"\'$]+\.[a-z0-9]+)["\']',s): chk(os.path.relpath(f,root),root,h)
print(f"checked {n} internal refs, broken {len(bad)}")
for b in bad: print("BROKEN",*b)

/* Glossary map: a self-contained, dependency-free term web for Learn sites.
   Original implementation. No external assets, fonts, CDNs or APIs.
   API: TermMap.mount(container, {items, slug, onFocus, title, listFirst})
     items: [{id, label, group, weight(1-3), body(html), aliases[], related[]}]
   Keyboard (only while focus is inside the map; no page-wide shortcuts):
     "/" moves to the search box · ←/→ step between terms while a term node has focus
     Enter/Space opens a term · Esc clears the search, then closes the card. */
(function(){
  "use strict";
  const NS="http://www.w3.org/2000/svg";
  const esc=t=>String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const slugify=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const strip=h=>String(h||"").replace(/<[^>]+>/g," ");
  function hash(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
  /* Hyphen, space and no-space forms match each other ("SF-328" = "SF 328"). */
  const pat=x=>new RegExp("(^|[^A-Za-z0-9])"+x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\\?-|\s+/g,"[-\\s]?")+"([^A-Za-z0-9]|$)","i");

  function buildLinks(items,byId){
    const pats=items.map(it=>[it.label].concat(it.aliases||[]).filter(x=>x&&x.length>2).map(pat));
    items.forEach(a=>a.links=new Set());
    items.forEach((a,i)=>{const txt=strip(a.body);items.forEach((b,j)=>{if(i!==j&&pats[j].some(p=>p.test(txt))){a.links.add(b.id);b.links.add(a.id);}});});
    items.forEach(a=>(a.related||[]).forEach(r=>{const b=byId.get(slugify(r));if(b&&b!==a){a.links.add(b.id);b.links.add(a.id);}}));
  }

  function layout(items,W,H){
    const groups=[...new Set(items.map(i=>i.group))];
    const cx=W/2,cy=H/2,R=Math.min(W,H)*0.31;
    const gc={};groups.forEach((g,k)=>{const a=k/groups.length*Math.PI*2-Math.PI/2;gc[g]={x:cx+Math.cos(a)*R,y:cy+Math.sin(a)*R,a};});
    items.forEach(it=>{const h=hash(it.id),a=(h%360)/57.3,d=18+(h>>9)%60;it.x=gc[it.group].x+Math.cos(a)*d;it.y=gc[it.group].y+Math.sin(a)*d;it.r=6+2*(it.weight||1);});
    for(let step=0;step<260;step++){
      for(let i=0;i<items.length;i++){const a=items[i];
        a.x+=(gc[a.group].x-a.x)*0.02;a.y+=(gc[a.group].y-a.y)*0.02;
        for(let j=i+1;j<items.length;j++){const b=items[j];let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,min=a.r+b.r+44;
          if(d<min){const p=(min-d)/d*0.5;a.x-=dx*p;a.y-=dy*p;b.x+=dx*p;b.y+=dy*p;}}
        a.x=Math.max(60,Math.min(W-60,a.x));a.y=Math.max(40,Math.min(H-24,a.y));}
    }
    /* Group labels sit on the outer side of each cluster, then get pushed off any node they overlap. */
    groups.forEach(g=>{const mem=items.filter(i=>i.group===g);const c=gc[g];
      const far=Math.max(...mem.map(m=>Math.hypot(m.x-c.x,m.y-c.y)+m.r))+22;
      let lx=c.x+Math.cos(c.a)*far,ly=c.y+Math.sin(c.a)*far;
      for(let k=0;k<40;k++){const hit=items.find(n=>Math.abs(n.x-lx)<g.length*5+n.r&&Math.abs(n.y-ly)<14+n.r);if(!hit)break;lx+=Math.cos(c.a)*6;ly+=Math.sin(c.a)*6;}
      c.lx=Math.max(g.length*5+8,Math.min(W-g.length*5-8,lx));c.ly=Math.max(16,Math.min(H-8,ly));});
    return gc;
  }
  /* Groups differ by shape (and position/label), not by color. */
  function shape(gi,r){
    const poly=(n,rot)=>{const p=[];for(let k=0;k<n;k++){const a=rot+k/n*Math.PI*2;p.push((Math.cos(a)*r).toFixed(1)+","+(Math.sin(a)*r).toFixed(1));}return ["polygon",{points:p.join(" ")}];};
    switch(gi%7){case 0:return ["circle",{r}];case 1:return ["rect",{x:-r*.85,y:-r*.85,width:r*1.7,height:r*1.7}];
      case 2:return poly(4,0);case 3:return poly(3,-Math.PI/2);case 4:return poly(3,Math.PI/2);case 5:return poly(5,-Math.PI/2);default:return poly(6,0);}
  }

  function mount(root,opts){
    const items=opts.items.map(x=>Object.assign({},x,{id:x.id||slugify(x.label)}));
    const byId=new Map(items.map(i=>[i.id,i]));
    const order=items.slice().sort((a,b)=>a.group.localeCompare(b.group)||a.label.localeCompare(b.label));
    buildLinks(items,byId);
    const W=900,H=600,gc=layout(items,W,H);
    const groups=Object.keys(gc);
    const badSlug=opts.slug&&!byId.has(opts.slug)?opts.slug:null;
    const st={q:"",focus:opts.slug&&byId.has(opts.slug)?opts.slug:null,matches:[]};
    const listFirst=!!opts.listFirst;

    root.innerHTML=`<div class="tm">
      <div class="tm-bar">
        <label class="tm-search"><span class="tm-sr">Search terms</span>
          <input type="search" placeholder="Search terms…" autocomplete="off" aria-controls="tmList"></label>
        <span class="tm-count" role="status" aria-live="polite"></span>
        <span class="tm-step"><button type="button" class="b" data-step="-1">Previous</button><button type="button" class="b" data-step="1">Next</button></span>
      </div>
      <div class="tm-legend" aria-label="Groups">${groups.map((g,i)=>`<button type="button" class="tm-chip" data-g="${esc(g)}"><svg class="tm-key" viewBox="-9 -9 18 18" aria-hidden="true"></svg>${esc(g)}</button>`).join("")}</div>
      ${listFirst?`<button type="button" class="b tm-showmap" aria-expanded="false">Show map</button>`:""}
      <div class="tm-stage"${listFirst?" hidden":""}><svg class="tm-svg" viewBox="0 0 ${W} ${H}" role="group" aria-label="${esc(opts.title||"Glossary map")}: ${items.length} terms in ${groups.length} groups"></svg></div>
      <aside class="tm-card" hidden aria-labelledby="tmCardH"></aside>
      <details class="tm-listwrap"${listFirst?" open":""}><summary>All terms as a list</summary><ol class="tm-list" id="tmList"></ol></details>
      <p class="tm-help">Tab to a term and press Enter. While a term has focus, <kbd>←</kbd> <kbd>→</kbd> step to the next term. <kbd>/</kbd> jumps to search. <kbd>Esc</kbd> clears or closes. Lines join terms whose definitions mention each other or that we marked as related; they are study links, not official relationships.</p>
    </div>`;
    const $=s=>root.querySelector(s), svg=$(".tm-svg"), input=$(".tm-search input"), card=$(".tm-card"), count=$(".tm-count"), stage=$(".tm-stage");
    const el=(n,a)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e;};
    root.querySelectorAll(".tm-key").forEach((k,i)=>{const [n,a]=shape(i,7);k.appendChild(el(n,a));});
    const gEdges=el("g",{class:"tm-edges","aria-hidden":"true"}), gNodes=el("g",{class:"tm-nodes"}), gLab=el("g",{class:"tm-glabels","aria-hidden":"true"});
    groups.forEach(g=>{const t=el("text",{x:gc[g].lx,y:gc[g].ly,class:"tm-glabel","text-anchor":"middle"});t.textContent=g.toUpperCase();gLab.appendChild(t);});
    svg.append(gEdges,gLab,gNodes);
    const seen=new Set();
    items.forEach(a=>a.links.forEach(id=>{const k=[a.id,id].sort().join("|");if(seen.has(k))return;seen.add(k);const b=byId.get(id);
      gEdges.appendChild(el("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y,"data-a":a.id,"data-b":b.id}));}));
    items.forEach(it=>{const gi=groups.indexOf(it.group);
      const g=el("g",{class:"tm-node"+(it.weight>=3?" is-key":""),tabindex:"0",role:"button","data-id":it.id,"aria-label":it.label+" ("+it.group+", "+it.links.size+" related)",transform:`translate(${it.x.toFixed(1)},${it.y.toFixed(1)})`});
      g.append(el("circle",{r:16,class:"tm-hit"}));const [n,a]=shape(gi,it.r);g.append(el(n,Object.assign({class:"tm-shape"},a)));
      const t=el("text",{y:-it.r-6,"text-anchor":"middle"});t.textContent=it.label;g.append(t);
      g.addEventListener("click",()=>open(it.id,true));
      g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(it.id,true);}
        else if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault();stepNode(it.id,1);}
        else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();stepNode(it.id,-1);}});
      gNodes.appendChild(g);it.node=g;});
    $("#tmList").innerHTML=order.map(it=>`<li><button type="button" class="tm-li" data-id="${it.id}">${esc(it.label)} <span class="tm-lig">${esc(it.group)}</span></button></li>`).join("");
    root.querySelectorAll(".tm-li").forEach(b=>b.onclick=()=>open(b.dataset.id,true));
    const sm=$(".tm-showmap"); if(sm) sm.onclick=()=>{const on=stage.hidden;stage.hidden=!on;sm.setAttribute("aria-expanded",String(on));sm.textContent=on?"Hide map":"Show map";fitText();};

    /* Keep labels readable: at least ~12px on screen whatever the container width. */
    function fitText(){const w=svg.getBoundingClientRect().width||W;const k=W/w;svg.style.setProperty("--tm-fs",Math.max(10,12*k).toFixed(1)+"px");svg.style.setProperty("--tm-gfs",Math.max(10,11*k).toFixed(1)+"px");}
    if(window.ResizeObserver){const ro=new ResizeObserver(fitText);ro.observe(svg);} fitText();

    function score(it,q){const L=it.label.toLowerCase();if(L===q)return 100;if(L.startsWith(q))return 80;
      if((it.aliases||[]).some(a=>a.toLowerCase().includes(q)))return 60;if(L.includes(q))return 50;
      if(it.group.toLowerCase().includes(q))return 30;if(strip(it.body).toLowerCase().includes(q))return 10;return 0;}
    function search(q){st.q=q;const t=q.trim().toLowerCase();
      st.matches=t?items.map(it=>[it,score(it,t)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]||a[0].label.localeCompare(b[0].label)).map(x=>x[0].id):[];
      paint();}
    function seq(){return st.matches.length?st.matches:order.map(i=>i.id);}
    function stepNode(from,d){const l=seq();let i=l.indexOf(from);i=(i===-1?(d>0?-1:0):i)+d;const id=l[(i+l.length)%l.length];const n=byId.get(id).node;if(!stage.hidden)n.focus();announce(byId.get(id));}
    function step(d){const l=seq();const i=st.focus?l.indexOf(st.focus):-1;open(l[((i===-1?(d>0?-1:0):i)+d+l.length)%l.length],true);}
    let returnTo=null;
    function open(id,user){
      if(user&&id){const a=document.activeElement;if(a&&root.contains(a)&&!card.contains(a))returnTo=a;}
      st.focus=id||null;paint();if(opts.onFocus)opts.onFocus(st.focus);
      if(user&&st.focus){const h=card.querySelector("h3");if(h)h.focus();}
    }
    function close(){const back=returnTo||(st.focus&&byId.get(st.focus).node);st.focus=null;paint();if(opts.onFocus)opts.onFocus(null);
      if(back&&back.isConnected&&!(stage.hidden&&back.closest(".tm-stage")))back.focus();else input.focus();returnTo=null;}
    function announce(f){count.textContent=f?`${f.label}, ${f.group}, ${f.links.size} related`:(st.q.trim()?`${st.matches.length} match${st.matches.length===1?"":"es"}`:`${items.length} terms`);}
    function paint(){
      const m=new Set(st.matches),searching=!!st.q.trim(),f=st.focus?byId.get(st.focus):null;
      items.forEach(it=>{const n=it.node;n.classList.toggle("is-match",searching&&m.has(it.id));
        n.classList.toggle("is-dim",(searching&&!m.has(it.id))||(!!f&&!searching&&it.id!==f.id&&!f.links.has(it.id)));
        n.classList.toggle("is-focus",!!f&&it.id===f.id);n.setAttribute("aria-pressed",String(!!f&&it.id===f.id));});
      gEdges.querySelectorAll("line").forEach(l=>l.classList.toggle("is-on",!!f&&(l.dataset.a===f.id||l.dataset.b===f.id)));
      announce(f);
      if(f){const rel=[...f.links].map(id=>byId.get(id)).sort((a,b)=>a.label.localeCompare(b.label));
        card.hidden=false;
        card.innerHTML=`<div class="tm-cardhead"><div><div class="tm-cg">${esc(f.group)}</div><h3 id="tmCardH" tabindex="-1">${esc(f.label)}</h3></div>
          <button type="button" class="tm-x b">Close</button></div><div class="tm-cb">${f.body||""}</div>
          ${rel.length?`<div class="tm-rel"><span>Related</span>${rel.map(r=>`<button type="button" class="tm-chip" data-id="${r.id}">${esc(r.label)}</button>`).join("")}</div>`:""}`;
        card.querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>open(b.dataset.id,true));
        card.querySelector(".tm-x").onclick=close;
      } else {card.hidden=true;card.innerHTML="";}
    }
    input.addEventListener("input",()=>search(input.value));
    input.addEventListener("keydown",e=>{
      if(e.key==="Enter"){e.preventDefault();if(st.matches[0])open(st.matches[0],true);}
      else if(e.key==="ArrowDown"){e.preventDefault();step(1);}
      else if(e.key==="ArrowUp"){e.preventDefault();step(-1);}});
    root.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>step(+b.dataset.step));
    root.querySelectorAll(".tm-legend [data-g]").forEach(b=>b.onclick=()=>{input.value=b.dataset.g;search(b.dataset.g);});
    /* Shortcuts are scoped to the map: the listener lives on the map root, not the document. */
    root.addEventListener("keydown",e=>{
      if(e.ctrlKey||e.metaKey||e.altKey)return;
      const t=e.target,typing=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable);
      if(e.key==="Escape"){if(st.focus){e.preventDefault();e.stopPropagation();close();}else if(st.q){e.preventDefault();e.stopPropagation();input.value="";search("");}return;}
      if(!typing&&e.key==="/"){e.preventDefault();input.focus();input.select();}
    });
    paint();
    if(badSlug) count.textContent=`No term matches “${badSlug}”. Showing all ${items.length} terms.`;
    return {focus:id=>{if(id&&!byId.has(id)){count.textContent=`No term matches “${id}”.`;return;}open(id||null,false);},search:q=>{input.value=q;search(q);},get state(){return Object.assign({},st);}};
  }
  window.TermMap={mount,slugify};
})();

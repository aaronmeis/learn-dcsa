/* Architecture > Decision: weighted matrix, 3-year ROM TCO, accreditation timelines, TCO/break-even simulator.
   Every number here is an illustrative example estimate supplied with the user's draft. None is DCSA or DoD guidance. */
const EST_BANNER=`<div class="est-banner" role="note"><b>Illustrative example estimates, not DCSA or DoD guidance.</b> Costs, percentages, months, GPU prices and inheritance figures are unsourced planning placeholders.</div>`;
window.DECISION={
  weights:[25,20,15,15,15,10],
  totals:{enclosed:3.05,cloud:3.55},
  tco:{gpus:16,util:65,rows:[["Year 1",2.225,1.755],["3-year total",3.615,4.715]],be:"about month 21"},
  tracks:[["Track A: enclosed lab (on-prem)","10 to 15 months","Facility readiness, DAAG package in NISP eMASS, DCSA assessment"],["Track B: cloud lab (classified)","5 to 8 months","Inherits part of the provider authorization; customer package and NISP coordination still needed"]],
  rec:"Dual-track phased: start in the cloud lab for months 1 to 9 to get moving, and build the enclosed lab as the long-term anchor in months 6 to 18. The overlap lets work start before the enclosed lab is authorized. This is a planning pattern, not a DCSA recommendation.",
  fac:{existing:{l:"Existing Closed Area",capex:80000,ato:9},retrofit:{l:"Retrofit space",capex:380000,ato:12},greenfield:{l:"Greenfield build",capex:950000,ato:15}},
  cloudAto:6.5
};
function tcoCalc(g,u,f){const F=DECISION.fac[f],uf=u/100;
  const eC=F.capex+g*45000+170000+260000,eM=48333+g*450+g*uf*150,cC=95000+145000,cM=41667+g*730*uf*9.85+g*650;
  const e=[],c=[];for(let m=0;m<=36;m++){e.push(eC+m*eM);c.push(cC+m*cM);}
  const d=cM-eM,be=d>0?(eC-cC)/d:null;return {e,c,eC,cC,eM,cM,be:be!==null&&be>=0&&be<=36?be:null,ato:F.ato-DECISION.cloudAto};}
const usd=v=>Math.abs(v)>=1e6?"$"+(v/1e6).toFixed(2)+"M":"$"+Math.round(v/1e3)+"k";
function tcoChart(r){const W=620,H=260,px=50,py=16,mx=Math.max(r.e[36],r.c[36])*1.05,X=m=>px+m*(W-px-10)/36,Y=v=>H-30-(v/mx)*(H-30-py);
  const path=a=>a.map((v,m)=>(m?"L":"M")+X(m).toFixed(1)+" "+Y(v).toFixed(1)).join(" ");
  const ticks=[0,.25,.5,.75,1].map(t=>`<line x1="${px}" x2="${W-10}" y1="${Y(mx*t)}" y2="${Y(mx*t)}" stroke="var(--border-color)"/><text x="${px-6}" y="${Y(mx*t)+4}" text-anchor="end" font-size="10" fill="var(--text-dim)">${usd(mx*t)}</text>`).join("");
  const mt=[0,6,12,18,24,30,36].map(m=>`<text x="${X(m)}" y="${H-12}" text-anchor="middle" font-size="10" fill="var(--text-dim)">M${m}</text>`).join("");
  const be=r.be!==null?`<circle cx="${X(r.be)}" cy="${Y(r.e[0]+r.be*r.eM)}" r="6" fill="var(--accent-color)" stroke="var(--text-primary)"/><text x="${X(r.be)+8}" y="${Y(r.e[0]+r.be*r.eM)-8}" font-size="11" fill="var(--text-primary)">break-even M${r.be.toFixed(1)}</text>`:"";
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Cumulative 36-month cost. Enclosed ${usd(r.e[36])}, cloud ${usd(r.c[36])}${r.be!==null?", break-even at month "+r.be.toFixed(1):", no break-even within 36 months"}. Illustrative estimates.">${ticks}${mt}
   <path d="${path(r.e)}" fill="none" stroke="var(--text-primary)" stroke-width="2.4"/><path d="${path(r.c)}" fill="none" stroke="var(--accent-color)" stroke-width="2.4" stroke-dasharray="7 5"/>${be}</svg>
   <div class="tco-legend"><span><i class="lg-solid"></i>Enclosed lab (solid)</span><span><i class="lg-dash"></i>Cloud lab (dashed)</span></div>`;}
function renderDecision(){
  const D=DECISION,g=+LS.get(KEY+"tcoG",16),u=+LS.get(KEY+"tcoU",65),f=LS.get(KEY+"tcoF","retrofit"),r=tcoCalc(g,u,f);
  const crit=["Criterion 1","Criterion 2","Criterion 3","Criterion 4","Criterion 5","Criterion 6"];
  return `<h3 class="ax-h">Decision: enclosed lab, cloud lab, or both?</h3>${EST_BANNER}
  <section class="dsec" aria-labelledby="d1"><h4 id="d1">1 · Weighted decision matrix</h4>${EST_BANNER}
   <p>Six criteria with weights ${D.weights.join(" / ")} (they sum to ${D.weights.reduce((a,b)=>a+b,0)}%). Weighted score out of 5: enclosed <b>${D.totals.enclosed.toFixed(2)}</b>, cloud <b>${D.totals.cloud.toFixed(2)}</b>. The enclosed lab comes out ahead when you already have a Closed Area and keep GPUs busy more than about 60% of the time.</p>
   <p class="ax-note">Math check: the weights sum correctly. The per-criterion scores behind 3.05 and 3.55 weren't in the material provided, so those totals are shown as given and are not yet rechecked.</p></section>
  <section class="dsec" aria-labelledby="d2"><h4 id="d2">2 · 3-year rough order of magnitude (ROM) TCO</h4>${EST_BANNER}
   <div class="tblwrap"><table class="ax-matrix"><thead><tr><th scope="col">${D.tco.gpus} GPUs at ${D.tco.util}% use</th><th scope="col">Enclosed lab</th><th scope="col">Cloud lab (IL6)</th></tr></thead><tbody>${D.tco.rows.map(x=>`<tr><th scope="row">${x[0]}</th><td data-l="Enclosed lab">$${x[1].toFixed(3)}M</td><td data-l="Cloud lab">$${x[2].toFixed(3)}M</td></tr>`).join("")}</tbody></table></div>
   <p>Break-even: ${D.tco.be}, as given.</p>
   <p class="ax-note">Math check: from the table's own figures, years 2 and 3 cost about $0.695M a year enclosed and $1.480M a year cloud, which puts the crossover near month 19, not 21. The simulator below, with its default retrofit setting, gives $3.585M vs $4.807M over 3 years, $2.215M vs $1.762M in year 1, and break-even at month 18.5. The table and the simulator don't match, so treat both as rough.</p></section>
  <section class="dsec" aria-labelledby="d3"><h4 id="d3">3 · Accreditation timelines</h4>${EST_BANNER}
   <div class="tblwrap"><table class="ax-matrix"><thead><tr><th scope="col">Track</th><th scope="col">Estimate</th><th scope="col">What drives it</th></tr></thead><tbody>${D.tracks.map(t=>`<tr><th scope="row">${t[0]}</th><td data-l="Estimate">${t[1]}</td><td data-l="Drivers">${esc(t[2])}</td></tr>`).join("")}</tbody></table></div>
   <p class="ax-note">Consistency check: the simulator uses 9 months for an existing Closed Area, which is below Track A's 10 to 15 month range. Flagged, not changed.</p></section>
  <section class="dsec" aria-labelledby="d4"><h4 id="d4">4 · TCO and break-even simulator</h4>${EST_BANNER}
   <div class="tco-ctl">
    <div class="ax-toggle" role="radiogroup" aria-label="Facility readiness">${Object.keys(D.fac).map(k=>`<button type="button" role="radio" aria-checked="${f===k}" class="b ${f===k?"on":""}" data-tf="${k}">${D.fac[k].l}</button>`).join("")}</div>
    <label class="tco-sl">GPUs: <b>${g}</b><input type="range" id="tcoG" min="8" max="64" step="8" value="${g}" aria-valuetext="${g} GPUs"></label>
    <label class="tco-sl">Average GPU use: <b>${u}%</b><input type="range" id="tcoU" min="20" max="100" step="5" value="${u}" aria-valuetext="${u} percent"></label></div>
   <div class="tco-kpis" aria-live="polite"><div><span>3-yr enclosed</span><b>${usd(r.e[36])}</b><em>up-front ${usd(r.eC)}</em></div><div><span>3-yr cloud</span><b>${usd(r.c[36])}</b><em>monthly ${usd(r.cM)}</em></div><div><span>Break-even</span><b>${r.be!==null?"M"+r.be.toFixed(1):"none in 36 mo"}</b></div><div><span>Authorization time gap</span><b>${r.ato>=0?"+":""}${r.ato.toFixed(1)} mo</b><em>enclosed minus cloud</em></div></div>
   <div class="tco-chart">${tcoChart(r)}</div></section>
  <div class="note good"><b>Recommendation pattern.</b> ${esc(D.rec)}</div>`;
}
function bindDecision(el){
  $$("[data-tf]",el).forEach(b=>b.onclick=()=>{LS.set(KEY+"tcoF",b.dataset.tf);renderViews();const n=$(`[data-tf="${b.dataset.tf}"]`);if(n)n.focus();});
  ["tcoG","tcoU"].forEach(id=>{const s=$("#"+id);if(s)s.oninput=()=>{LS.set(KEY+id,+s.value);const t=document.createElement("div");t.innerHTML=renderDecision();
    [".tco-kpis",".tco-chart"].forEach(q=>{const a=$(q,el),b=$(q,t);if(a&&b)a.innerHTML=b.innerHTML;});
    const lab=s.closest("label").querySelector("b"),nb=$("#"+id,t).closest("label").querySelector("b");lab.textContent=nb.textContent;s.setAttribute("aria-valuetext",$("#"+id,t).getAttribute("aria-valuetext"));};});
}

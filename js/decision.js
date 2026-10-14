/* Architecture > Decision: weighted matrix, 3-year ROM TCO, accreditation timelines, TCO/break-even simulator.
   Every number here is an illustrative example estimate supplied with the user's draft. None is DCSA or DoD guidance. */
const EST_BANNER=`<div class="est-banner" role="note"><b>Illustrative example estimates, not DCSA or DoD guidance.</b> Costs, percentages, months, GPU prices and inheritance figures are unsourced planning placeholders.</div>`;
window.DECISION={
  weights:[25,20,15,15,15,10],
  totals:{enclosed:3.05,cloud:3.55},
  tco:{gpus:16,util:65,groups:[
    {type:"One-time (year 0 / phase 1)",rows:[
      {cat:"Facility and perimeter readiness",sub:"Closed Area retrofit, high-density power and cooling, PDS cabling, IDS",desc:"Physical changes for 25 kW+ heat load, versus a dedicated cloud circuit (for example a TACLANE encryptor) and landing-zone setup.",e:380000,c:95000},
      {cat:"AI compute, storage and network",sub:"2 x 8-GPU H100/H200 servers, 200 TB FIPS NVMe SAN, boundary firewalls, AFT hardware",desc:"All hardware up front plus 3-year OEM support (keep-your-drive), versus no hardware purchase in the cloud.",e:890000,c:35000},
      {cat:"RMF accreditation engineering",sub:"DAAG package in NISP eMASS: SSP, STIG automation, initial ACAS scans and controls traceability matrix",desc:"A full-stack RMF package (1,000+ controls) versus a customer package that inherits provider controls (~350 customer controls).",e:260000,c:145000}]},
    {type:"Annual recurring (years 1 to 3)",annual:true,rows:[
      {cat:"GPU compute, storage and platform",sub:"Cloud GPU at 65% duty, versus on-prem power, cooling and rack",desc:"Cloud: 16 GPUs x ~475 hrs/month at a classified blended rate, plus 200 TB encrypted storage. On-prem: 35 kW continuous power and HVAC plus maintenance.",e:115000,c:980000},
      {cat:"Enterprise software and Kubernetes stack",sub:"Hardened OS, RKE2 or OpenShift, Artifactory, SIEM (for example Splunk), ACAS",desc:"Same logical stack. The cloud adds managed boundary (SCCA), cloud HSM and cross-domain gateway fees.",e:160000,c:210000},
      {cat:"Cleared operations and continuous monitoring labor",sub:"ISSO, sysadmin and MLOps, media-transfer custodians",desc:"On-prem needs hands-on hardware admin and manual media transfers. The cloud saves about 1.0 FTE.",e:420000,c:290000}]}
  ],beUser:21},
  matrixNotes:[["When the enclosed lab wins","You already have a Closed Area, and GPU use stays above about 60%."],["When the cloud lab wins","Under the default weights (cloud 3.55 vs enclosed 3.05), mainly speed to authorization and no hardware purchase up front."],["What isn't shown","The per-criterion scores behind 3.05 and 3.55 weren't in the material provided, so the criteria names and scores aren't listed and the totals can't be rechecked."]],
  tracks:[
    {t:"Track A: enclosed lab (on-prem)",m:"10 to 15 months",d:"Facility readiness (Closed Area), hardware delivery, full DAAG package in NISP eMASS, DCSA assessment.",risk:"Facility work and the full control set set the pace."},
    {t:"Track B: cloud lab (classified)",m:"5 to 8 months",d:"Customer package that inherits part of the provider's authorization. NISP coordination is still needed for contractor classified systems.",risk:"Cross-domain gateway and provider onboarding."}],
  phases:[
    {p:"Phase 1: cloud fast-start",m:"Months 1 to 9",d:"Stand up the cloud lab first, so work starts before the enclosed lab is authorized."},
    {p:"Phase 2: enclosed lab anchor",m:"Months 6 to 18",d:"Build and authorize the enclosed lab as the long-term home for steady, high-use workloads."},
    {p:"Overlap",m:"Months 6 to 9",d:"Both run. Use the portable logical core so workloads move without a redesign."}],
  rec:"Dual-track phased. This is a planning pattern from the user's draft, not a DCSA recommendation.",
  fac:{existing:{l:"Existing Closed Area",capex:80000,ato:9},retrofit:{l:"Retrofit space",capex:380000,ato:12},greenfield:{l:"Greenfield build",capex:950000,ato:15}},
  cloudAto:6.5
};
/* Simulator: built from the table. Default (retrofit, 16 GPUs, 65%) reproduces it exactly: one-time 1,530k vs 275k, annual 695k vs 1,480k.
   Scaling (illustrative assumption): GPU hardware and on-prem GPU OpEx scale with GPU count; cloud GPU OpEx scales with GPU count x use; other rows are fixed. */
function tcoCalc(g,u,f){const F=DECISION.fac[f],G=DECISION.tco.groups,gr=g/16,ur=u/65;
  const [fac,hw,rmf]=G[0].rows,[gpu,sw,lab]=G[1].rows;
  const eC=F.capex+hw.e*gr+rmf.e, cC=fac.c+hw.c+rmf.c;
  const eA=gpu.e*gr+sw.e+lab.e, cA=gpu.c*gr*ur+sw.c+lab.c, eM=eA/12, cM=cA/12;
  const e=[],c=[];for(let m=0;m<=36;m++){e.push(eC+m*eM);c.push(cC+m*cM);}
  const d=cM-eM,be=d>0?(eC-cC)/d:null;return {e,c,eC,cC,eA,cA,eM,cM,be:be!==null&&be>=0&&be<=36?be:null,ato:F.ato-DECISION.cloudAto};}
const usd=v=>Math.abs(v)>=1e6?"$"+(v/1e6).toFixed(2)+"M":"$"+Math.round(v/1e3)+"k";
function tcoChart(r){const W=620,H=210,px=50,py=16,mx=Math.max(r.e[36],r.c[36])*1.05,X=m=>px+m*(W-px-10)/36,Y=v=>H-30-(v/mx)*(H-30-py);
  const path=a=>a.map((v,m)=>(m?"L":"M")+X(m).toFixed(1)+" "+Y(v).toFixed(1)).join(" ");
  const ticks=[0,.25,.5,.75,1].map(t=>`<line x1="${px}" x2="${W-10}" y1="${Y(mx*t)}" y2="${Y(mx*t)}" stroke="var(--border-color)"/><text x="${px-6}" y="${Y(mx*t)+4}" text-anchor="end" font-size="10" fill="var(--text-dim)">${usd(mx*t)}</text>`).join("");
  const mt=[0,6,12,18,24,30,36].map(m=>`<text x="${X(m)}" y="${H-12}" text-anchor="middle" font-size="10" fill="var(--text-dim)">M${m}</text>`).join("");
  const be=r.be!==null?`<circle cx="${X(r.be)}" cy="${Y(r.e[0]+r.be*r.eM)}" r="6" fill="var(--accent-color)" stroke="var(--text-primary)"/><text x="${X(r.be)+8}" y="${Y(r.e[0]+r.be*r.eM)-8}" font-size="11" fill="var(--text-primary)">break-even M${r.be.toFixed(1)}</text>`:"";
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Cumulative 36-month cost. Enclosed ${usd(r.e[36])}, cloud ${usd(r.c[36])}${r.be!==null?", break-even at month "+r.be.toFixed(1):", no break-even within 36 months"}. Illustrative estimates.">${ticks}${mt}
   <path d="${path(r.e)}" fill="none" stroke="var(--text-primary)" stroke-width="2.4"/><path d="${path(r.c)}" fill="none" stroke="var(--accent-color)" stroke-width="2.4" stroke-dasharray="7 5"/>${be}</svg>
   <div class="tco-legend"><span><i class="lg-solid"></i>Enclosed lab (solid)</span><span><i class="lg-dash"></i>Cloud lab (dashed)</span></div>`;}
function tcoTableHTML(){const T=DECISION.tco,k=v=>"$"+Math.round(v/1000).toLocaleString("en-US")+"k";
  const one=T.groups[0].rows.reduce((a,r)=>({e:a.e+r.e,c:a.c+r.c}),{e:0,c:0}),ann=T.groups[1].rows.reduce((a,r)=>({e:a.e+r.e,c:a.c+r.c}),{e:0,c:0});
  const y1={e:one.e+ann.e,c:one.c+ann.c},y3={e:one.e+3*ann.e,c:one.c+3*ann.c},be=(one.e-one.c)/((ann.c-ann.e)/12);
  const row=(r,annual)=>`<tr><td data-l="Category and sub-items"><b>${esc(r.cat)}</b><span class="tco-items">${r.sub.split(/, (?![^()]*\))/).map(x=>`<span class="tco-item">${esc(x)}</span>`).join("")}</span></td><td data-l="Architectural description">${esc(r.desc)}</td>
    <td data-l="Enclosed" class="num">${annual?`${k(r.e)}/yr<span class="tco-sub">3-yr ${k(3*r.e)}</span>`:k(r.e)}</td><td data-l="Cloud IL6" class="num">${annual?`${k(r.c)}/yr<span class="tco-sub">3-yr ${k(3*r.c)}</span>`:k(r.c)}</td></tr>`;
  const grp=(t,n)=>`<tr class="tco-grp"><th colspan="4" scope="colgroup">${esc(t)}</th></tr>`;
  return {html:`<div class="tblwrap"><table class="ax-matrix tco-full"><caption>3-year ROM TCO, ${T.gpus} GPUs at ${T.util}% use</caption>
   <thead><tr><th scope="col">Category and sub-items</th><th scope="col">Architectural description</th><th scope="col" class="num">Enclosed</th><th scope="col" class="num">Cloud IL6</th></tr></thead><tbody>
   ${T.groups.map(G=>grp(G.type)+G.rows.map(r=>row(r,G.annual)).join("")+`<tr class="tco-tot"><td data-l="Subtotal" colspan="2">${G.annual?"Annual subtotal":"One-time subtotal"}</td><td data-l="Enclosed" class="num">${k(G.annual?ann.e:one.e)}${G.annual?"/yr":""}</td><td data-l="Cloud IL6" class="num">${k(G.annual?ann.c:one.c)}${G.annual?"/yr":""}</td></tr>`).join("")}
   ${grp("Cash-flow summary")}
   <tr class="tco-tot"><td data-l="Category" colspan="2"><b>Year 1 total outlay</b><span class="tco-sub">Capital spike versus subscription ramp</span></td><td data-l="Enclosed" class="num">${k(y1.e)}</td><td data-l="Cloud IL6" class="num">${k(y1.c)}</td></tr>
   <tr class="tco-tot"><td data-l="Category" colspan="2"><b>Cumulative 3-year TCO</b><span class="tco-sub">One-time + 3 x annual</span></td><td data-l="Enclosed" class="num">${k(y3.e)}</td><td data-l="Cloud IL6" class="num">${k(y3.c)}</td></tr>
   </tbody></table></div>`,be,one,ann};}
function renderDecision(){
  const D=DECISION,g=+LS.get(KEY+"tcoG",16),u=+LS.get(KEY+"tcoU",65),f=LS.get(KEY+"tcoF","retrofit"),r=tcoCalc(g,u,f),T=tcoTableHTML();
  const card=(h,b)=>`<tr><th scope="row">${h}</th><td>${b}</td></tr>`;
  return `<h3 class="ax-h">Decision: enclosed lab, cloud lab, or both?</h3>${EST_BANNER}
  <section class="dsec" aria-labelledby="d1"><h4 id="d1">1 · Weighted decision matrix</h4>${EST_BANNER}
   <div class="tblwrap"><table class="ax-matrix"><thead><tr><th scope="col">Item</th><th scope="col">Enclosed lab</th><th scope="col">Cloud lab (IL6)</th></tr></thead><tbody>
    <tr><th scope="row">Weighted score (out of 5)</th><td data-l="Enclosed lab" class="num">${D.totals.enclosed.toFixed(2)}</td><td data-l="Cloud lab" class="num"><b>${D.totals.cloud.toFixed(2)}</b></td></tr>
    <tr><th scope="row">Criterion weights</th><td data-l="Weights" colspan="2">${D.weights.map(w=>w+"%").join(" · ")} (sum ${D.weights.reduce((a,b)=>a+b,0)}%)</td></tr></tbody></table></div>
   <div class="tblwrap"><table class="ax-matrix"><tbody>${D.matrixNotes.map(n=>card(esc(n[0]),esc(n[1]))).join("")}</tbody></table></div></section>
  <section class="dsec" aria-labelledby="d2"><h4 id="d2">2 · 3-year rough order of magnitude (ROM) TCO</h4>${EST_BANNER}${T.html}
   <div class="tblwrap"><table class="ax-matrix"><tbody>
    ${card("Break-even (user's figure)","About month "+D.tco.beUser)}
    ${card("Break-even (from the table)",`About month ${T.be.toFixed(1)}: (${Math.round(T.one.e/1000).toLocaleString()}k − ${Math.round(T.one.c/1000)}k) ÷ ((${Math.round(T.ann.c/1000).toLocaleString()}k − ${Math.round(T.ann.e/1000)}k) ÷ 12)`)}
    ${card("Why they differ","The table's own one-time and annual figures, spread evenly by month, cross at about month 19.2. The material doesn't say how month 21 was reached. It may count from a later start or include ramp-up, but that's unconfirmed, so both are shown.")}
    ${card("Math check","All row sums, the Year 1 totals and the 3-year totals add up.")}</tbody></table></div></section>
  <section class="dsec" aria-labelledby="d3"><h4 id="d3">3 · Accreditation timelines</h4>${EST_BANNER}
   <div class="tblwrap"><table class="ax-matrix"><thead><tr><th scope="col">Track</th><th scope="col">Estimate</th><th scope="col">What drives it</th><th scope="col">Main schedule risk</th></tr></thead><tbody>${D.tracks.map(t=>`<tr><th scope="row">${t.t}</th><td data-l="Estimate">${t.m}</td><td data-l="What drives it">${esc(t.d)}</td><td data-l="Main schedule risk">${esc(t.risk)}</td></tr>`).join("")}</tbody></table></div>
   <div class="tl" role="img" aria-label="Track A 10 to 15 months, Track B 5 to 8 months, on a 0 to 18 month scale">${[["Track A · enclosed",10,15],["Track B · cloud",5,8]].map(([l,a,b])=>`<div class="tl-row"><span>${l}</span><div class="tl-bar"><i style="left:${a/18*100}%;width:${(b-a)/18*100}%"></i><em style="left:${a/18*100}%">${a} to ${b} mo</em></div></div>`).join("")}<div class="tl-axis">${[0,3,6,9,12,15,18].map(m=>`<span style="left:${m/18*100}%">M${m}</span>`).join("")}</div></div>
   <p class="ax-note">Consistency check: the simulator uses 9 months for an existing Closed Area, below Track A's 10 to 15 month range. It's flagged here, not changed.</p></section>
  <section class="dsec" aria-labelledby="d4"><h4 id="d4">4 · TCO and break-even simulator</h4>${EST_BANNER}
   <p class="ax-note">The defaults (retrofit space, 16 GPUs, 65% use) reproduce the table: one-time ${usd(r.eC)} vs ${usd(r.cC)}, annual ${usd(r.eA)} vs ${usd(r.cA)}. When you move the controls, GPU hardware and on-prem GPU running costs scale with GPU count, cloud GPU cost scales with GPU count times use, and the other rows stay fixed. That scaling is an illustrative assumption.</p>
   <div class="tco-sim">
    <div class="tco-ctl">
     <div class="ax-toggle" role="radiogroup" aria-label="Facility readiness">${Object.keys(D.fac).map(k=>`<button type="button" role="radio" aria-checked="${f===k}" class="b ${f===k?"on":""}" data-tf="${k}">${D.fac[k].l}</button>`).join("")}</div>
     <label class="tco-sl"><span>GPUs <b>${g}</b></span><input type="range" id="tcoG" min="8" max="64" step="8" value="${g}" aria-valuetext="${g} GPUs"></label>
     <label class="tco-sl"><span>GPU use <b>${u}%</b></span><input type="range" id="tcoU" min="20" max="100" step="5" value="${u}" aria-valuetext="${u} percent"></label></div>
    <div class="tco-body"><div class="tco-chart">${tcoChart(r)}</div>
     <div class="tco-kpis" aria-live="polite"><div><span>3-yr enclosed</span><b>${usd(r.e[36])}</b><em>one-time ${usd(r.eC)}</em></div><div><span>3-yr cloud</span><b>${usd(r.c[36])}</b><em>annual ${usd(r.cA)}</em></div><div><span>Break-even</span><b>${r.be!==null?"M"+r.be.toFixed(1):"none in 36 mo"}</b><em>crossover month</em></div><div><span>Authorization gap</span><b>${r.ato>=0?"+":""}${r.ato.toFixed(1)} mo</b><em>enclosed minus cloud</em></div></div></div></div></section>
  <section class="dsec" aria-labelledby="d5"><h4 id="d5">Recommendation: dual-track phased</h4>${EST_BANNER}
   <div class="tblwrap"><table class="ax-matrix"><thead><tr><th scope="col">Phase</th><th scope="col">When</th><th scope="col">What happens</th></tr></thead><tbody>${D.phases.map(p=>`<tr><th scope="row">${p.p}</th><td data-l="When">${p.m}</td><td data-l="What happens">${esc(p.d)}</td></tr>`).join("")}</tbody></table></div>
   <p class="ax-note">${esc(D.rec)}</p></section>`;
}
function bindDecision(el){
  $$("[data-tf]",el).forEach(b=>b.onclick=()=>{LS.set(KEY+"tcoF",b.dataset.tf);renderViews();const n=$(`[data-tf="${b.dataset.tf}"]`);if(n)n.focus();});
  ["tcoG","tcoU"].forEach(id=>{const s=$("#"+id);if(s)s.oninput=()=>{LS.set(KEY+id,+s.value);const t=document.createElement("div");t.innerHTML=renderDecision();
    [".tco-kpis",".tco-chart"].forEach(q=>{const a=$(q,el),b=$(q,t);if(a&&b)a.innerHTML=b.innerHTML;});
    const lab=s.closest("label").querySelector("b"),nb=$("#"+id,t).closest("label").querySelector("b");lab.textContent=nb.textContent;s.setAttribute("aria-valuetext",$("#"+id,t).getAttribute("aria-valuetext"));};});
}

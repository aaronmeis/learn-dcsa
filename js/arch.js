/* Architecture section: Explorer overview, blueprint 1.1-1.4, Enclosed vs Cloud matrix, Golden 4 diagrams.
   Study model only. Products are examples, not requirements. Practice statements are guidance, not DCSA requirements.
   Citations [S#] render as source chips (js/source-notes.js). Items marked UNVERIFIED still need a primary source. */
window.ARCH = {
  intro:"This section models how a cleared contractor might lay out an AI system that handles classified work, in two postures: an enclosed on-premises lab and a classified cloud lab. It runs policy to boundary to hardware to AI pipeline as one traceable chain. For cleared contractors, DCSA authorizes classified systems under the RMF using the DAAG, with packages submitted in NISP eMASS [S13][S28]. This is a study model. It is not an authorization, and nothing here is a DCSA requirement unless it cites one.",
  nodes:{
    1:{title:"Authorization and trust boundary",tier:"Layer 1 · Conceptual",controls:["AC-2","PL-8","SA-9"],
      enclosed:"A Closed Area or other approved physical boundary around the system, with the ISSM and FSO roles in place. The system is authorized by DCSA under the RMF using the DAAG, with the package in NISP eMASS [S13][S1].",
      cloud:"A dedicated classified cloud environment at DoD SRG Impact Level 6 (classified up to SECRET). Security is split between the cloud provider and the customer. The SRG says off-premises contractor systems at this level are assessed in conjunction with the NISP [S29].",
      rmf:"Sets the authorization boundary: what is inside, who owns it, and which authorizing official decides [S28]."},
    2:{title:"Identity, security and audit plane",tier:"Layer 2 · Logical",controls:["IA-2","AU-2","SI-4"],
      enclosed:"Local directory and PKI with CAC or PIV smartcard sign-in, a local SIEM and vulnerability scanning. Examples: Active Directory, Splunk or ELK, ACAS.",
      cloud:"Federated identity tied to the customer's PKI, cloud-native logging into an immutable, encrypted audit store, and boundary sensors. Example services vary by provider.",
      rmf:"Multi-factor identity (IA-2), defined audit events (AU-2) and system monitoring (SI-4) [S27]."},
    3:{title:"Cross-domain and model ingestion",tier:"Layer 2 · Integration",controls:["CA-3","CM-7","SR-4"],
      enclosed:"Media or a one-way transfer path brings signed model weights and container images into the enclave, where they are scanned and published to an internal registry. Examples: an assured file transfer process, a hardware data diode, Harbor or Artifactory.",
      cloud:"An approved cross-domain solution moves signed images and model weights from a lower domain into an isolated registry inside the classified environment.",
      rmf:"Information exchange agreements (CA-3), least functionality (CM-7) and provenance (SR-4). SR replaced the withdrawn SA-12 in Rev 5 [S27]."},
    4:{title:"AI orchestration and guardrail runtime",tier:"Layer 3 · AI runtime",controls:["AC-3","SC-7","AU-12"],
      enclosed:"An air-gapped, hardened Kubernetes cluster running local inference, with retrieval filtered by user attributes at query time and every prompt and completion logged to the user's identity. Examples: RKE2 or OpenShift, vLLM or TGI.",
      cloud:"Hardened Kubernetes on dedicated hosts, model endpoints isolated inside the enclave network, and the same per-query access filter and prompt logging.",
      rmf:"Access enforcement (AC-3), boundary protection (SC-7) and audit record generation (AU-12) [S27]."},
    5:{title:"Compute, GPU and storage substrate",tier:"Layer 4 · Physical",controls:["PE-3","SC-28","MP-6"],
      enclosed:"Servers hardened to DISA STIGs, GPU nodes, encrypted storage using FIPS 140-3 validated modules, and media sanitized or destroyed at end of life [S33][S31][S34]. Examples: NVIDIA GPUs, a SAN or NAS.",
      cloud:"Dedicated or isolated GPU instances inside the classified environment, provider key management using FIPS validated modules, and cryptographic erasure where the authorizing official accepts it [S31][S34].",
      rmf:"Physical access (PE-3), protection of data at rest (SC-28) and media sanitization (MP-6) [S27]."}
  },
  edges:[[1,2],[1,3],[2,4],[3,4],[4,5]],
  views:[
    {id:"c",h:"1.1 Conceptual: why",ea:"conceptual",p:[
      "Start with the authorization boundary. Everything inside it is in scope for the RMF package, and everything outside is an interconnection you have to document [S28][S13].",
      "Set the classification ceiling and need-to-know separation next. A system authorized for one level and program shouldn't quietly serve another.",
      "Group the system into four trust zones: ingestion, enclave core, AI compute and inference, and audit and security operations.",
      "Then name who owns what. In an enclosed lab the contractor owns the whole stack inside the Closed Area. In a cloud lab, some controls are inherited from the provider's authorization (FedRAMP High plus DoD SRG controls), and the customer still owns the rest [S30][S29]."]},
    {id:"l",h:"1.2 Logical: what (four planes)",ea:"logical",p:[
      "Management and control plane: identity provider, PKI and smartcards, policy and configuration management.",
      "Data and storage plane: object, vector and relational stores, partitioned per program so need-to-know holds at the data layer.",
      "Compute and orchestration plane: hardened Kubernetes, hypervisors and batch jobs.",
      "Security and audit plane, run out of band: SIEM, vulnerability scanning, endpoint protection and an immutable audit trail covering the AU control family [S27].",
      "Traffic rules: east-west traffic between services is mutually authenticated (mTLS) in line with zero trust, and north-south traffic crosses defined checkpoints [S35]. This is guidance, not a DCSA requirement."]},
    {id:"p",h:"1.3 Physical: where",ea:"physical",p:[
      "Hardware: GPU nodes with a documented process for clearing memory between jobs, SAN or NAS storage, and cryptography from FIPS 140-3 validated modules [S31].",
      "Facility: a Closed Area or other approved storage under 32 CFR 117, with physical protection of the network and port controls [S1]. TEMPEST and protected distribution system (PDS) needs are set case by case. UNVERIFIED: this site has no primary source yet for specific TEMPEST or PDS rules.",
      "Hardening and supply chain: DISA STIG baselines, Secure Boot and TPM, and no covered telecommunications or video surveillance equipment under Section 889 (FAR 52.204-25) [S33][S32]."]},
    {id:"i",h:"1.4 Integration and AI: how",ea:"integration",p:[
      "Air gap or cross-domain bridge: files move in through an assured file transfer process or a one-way diode, get scanned, and are accepted only if signed. UNVERIFIED: whether two-person integrity is required for these media transfers. Treat it as a common practice until the DAAG or the authorizing official says so.",
      "Internal registry: container images and model weights are served only from an internal artifact and model registry. Examples: Harbor, Artifactory.",
      "AI runtime guardrails: sandbox agents and their tool connections (for example MCP servers), apply RBAC or ABAC at query time in retrieval (RAG), keep a human in or on the loop, and log every prompt and completion against the user's identity (AU-12) [S27]. These are design guidance, not DCSA requirements."]}
  ],
  matrix:{cols:["Dimension","Enclosed lab (on-prem)","Cloud lab (classified, IL6)"],rows:[
    ["Accreditation","DCSA authorizes under the RMF using the DAAG; package in NISP eMASS [S13]","Provider authorization (FedRAMP High plus SRG) inherited, plus the customer's own authorization. Assessed in conjunction with the NISP for contractor systems [S29][S30]"],
    ["Physical and perimeter","Contractor-run Closed Area or approved storage [S1]","Provider's classified data centers; the customer manages the logical boundary [S29]"],
    ["GPU elasticity","Fixed by what you buy and accredit","Elastic in principle. UNVERIFIED: GPU capacity and quotas in classified regions"],
    ["Data ingress and egress","Media transfer or one-way diode, scanned and signed","Approved cross-domain solution"],
    ["DevSecOps friction","High. Every update crosses the air gap","Lower inside the enclave. Updates still cross a domain boundary"],
    ["Sanitization","Physical sanitization or destruction of media [S34]","Cryptographic erasure where the authorizing official accepts it [S34]"]]},
  tip:"Portable logical core (guidance). Keep the logical design the same in both postures: Kubernetes, GitOps and hardened images. Treat enclosed and cloud as interchangeable substrate adapters underneath. You re-accredit the substrate, not the whole design. Each posture still needs its own authorization.",
  flags:["GPU capacity and quotas in classified cloud regions","Specific TEMPEST and protected distribution system (PDS) requirements","Two-person integrity for media transfers into the enclave","Cryptographic erasure being accepted as sanitization for a given system (authorizing official's decision)","Whether a given NISP contractor can use a commercial IL6 offering for its classified work (depends on the contract and DCSA)"]
};

function archSVG(kind){
  const C="var(--text-primary)",A="var(--accent-color)",M="var(--text-dim)",B="var(--card-bg2)",S="var(--border-color)";
  const box=(x,y,w,h,t,sub,hi)=>`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${B}" stroke="${hi?A:S}" stroke-width="${hi?2:1}"/><text x="${x+w/2}" y="${y+h/2-(sub?3:-4)}" text-anchor="middle" font-size="12" font-weight="700" fill="${C}">${t}</text>${sub?`<text x="${x+w/2}" y="${y+h/2+13}" text-anchor="middle" font-size="10" fill="${M}">${sub}</text>`:""}</g>`;
  const ar=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${A}" stroke-width="1.6" marker-end="url(#ah-${kind})"/>`;
  const defs=`<defs><marker id="ah-${kind}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M1 1L8 5L1 9" fill="none" stroke="${A}" stroke-width="1.6"/></marker></defs>`;
  if(kind==="rmf") return `<svg viewBox="0 0 620 330" role="img" aria-labelledby="t-rmf"><title id="t-rmf">RMF traceability stack: policy to boundary to logical planes to physical substrate to AI pipeline, each with its evidence</title>${defs}
    ${[["Policy","32 CFR 117 · DAAG · NIST SP 800-53 Rev 5"],["Authorization boundary","what is in scope · authorizing official"],["Logical planes","control · data · compute · audit"],["Physical and virtual substrate","hosts · GPUs · storage · facility"],["AI pipelines","ingest · registry · runtime · audit"]].map((r,i)=>box(20,15+i*62,380,48,r[0],r[1],i===0)).join("")}
    ${[0,1,2,3].map(i=>ar(210,63+i*62,210,77+i*62)).join("")}
    ${[["S1 · S13 · S27"],["SSP boundary"],["PL-8 · SC-7"],["PE-3 · SC-28"],["AU-12 · SR-4"]].map((r,i)=>`<text x="420" y="${44+i*62}" font-size="11" fill="${M}">evidence: ${r[0]}</text>`).join("")}</svg>`;
  if(kind==="topo") return `<svg viewBox="0 0 620 300" role="img" aria-labelledby="t-topo"><title id="t-topo">Enclave topology: north-south checkpoint at the boundary, four planes inside, audit plane out of band</title>${defs}
    <rect x="110" y="10" width="500" height="280" rx="10" fill="none" stroke="${A}" stroke-dasharray="6 4"/><text x="122" y="28" font-size="11" fill="${M}">AUTHORIZATION BOUNDARY (enclave)</text>
    ${box(10,120,90,50,"Users","CAC / PIV")}${ar(100,145,128,145)}
    ${box(130,120,90,50,"Checkpoint","north-south",true)}
    ${box(250,40,160,48,"Control plane","IdP · PKI · config")}${box(250,110,160,48,"Compute plane","hardened K8s")}${box(250,180,160,48,"Data plane","per-program stores")}
    ${ar(220,145,248,134)}<text x="430" y="138" font-size="10" fill="${M}">east-west: mTLS</text>
    ${box(440,180,160,48,"Audit plane","SIEM · immutable log",true)}<text x="440" y="250" font-size="10" fill="${M}">out of band: receives, never serves</text>
    ${ar(410,204,438,204)}</svg>`;
  if(kind==="ingest") return `<svg viewBox="0 0 640 170" role="img" aria-labelledby="t-ing"><title id="t-ing">Air-gap AI ingestion pipeline: source, transfer, scan, verify signature, internal registry, runtime, with audit at each step</title>${defs}
    ${[["Low side","weights · images"],["Transfer","media or diode"],["Scan","malware · SBOM"],["Verify","signature"],["Registry","internal only",true],["Runtime","inference"]].map((r,i)=>box(8+i*105,30,92,56,r[0],r[1],r[2])).join("")}
    ${[0,1,2,3,4].map(i=>ar(100+i*105,58,112+i*105,58)).join("")}
    <line x1="20" y1="120" x2="620" y2="120" stroke="${S}"/><text x="320" y="142" text-anchor="middle" font-size="11" fill="${M}">every step writes to the audit plane (AU-12) · rejected files never reach the registry</text></svg>`;
  if(kind==="side") return `<svg viewBox="0 0 640 300" role="img" aria-labelledby="t-side"><title id="t-side">Side by side: same logical core on two substrates, enclosed lab and cloud lab</title>${defs}
    ${box(170,10,300,56,"Portable logical core","K8s · GitOps · hardened images",true)}
    ${ar(260,66,160,110)}${ar(380,66,480,110)}
    <rect x="10" y="112" width="300" height="176" rx="10" fill="none" stroke="${S}"/><text x="24" y="132" font-size="12" font-weight="700" fill="${C}">Enclosed lab</text>
    ${["Closed Area · contractor-run","Media or diode ingest","Fixed GPUs","DAAG authorization in NISP eMASS"].map((t,i)=>`<text x="24" y="${158+i*30}" font-size="11" fill="${M}">· ${t}</text>`).join("")}
    <rect x="330" y="112" width="300" height="176" rx="10" fill="none" stroke="${S}"/><text x="344" y="132" font-size="12" font-weight="700" fill="${C}">Cloud lab (IL6)</text>
    ${["Provider classified region","Cross-domain solution ingest","Elastic GPUs (quota unverified)","Inherited + customer authorization"].map((t,i)=>`<text x="344" y="${158+i*30}" font-size="11" fill="${M}">· ${t}</text>`).join("")}</svg>`;
  /* explorer */
  const N=ARCH.nodes,pos={1:[230,20,200,58],2:[40,120,210,58],3:[410,120,210,58],4:[225,220,210,58],5:[225,320,210,58]};
  const bands=["LAYER 1 · CONCEPTUAL BOUNDARY","LAYER 2 · LOGICAL PLANES AND INGESTION","LAYER 3 · AI ORCHESTRATION AND GUARDRAILS","LAYER 4 · COMPUTE AND STORAGE SUBSTRATE"];
  const mid=id=>{const p=pos[id];return [p[0]+p[2]/2,p[1]+p[3]/2,p];};
  return `<svg class="ax-svg" viewBox="0 0 660 390" role="group" aria-label="Architecture explorer diagram: five components in four layers. Use Tab and Enter to pick a component.">${defs}
    ${bands.map((b,i)=>`<rect x="6" y="${8+[0,100,200,300][i]}" width="648" height="${i===1?96:88}" rx="8" fill="none" stroke="${S}" stroke-dasharray="2 4"/><text x="16" y="${22+[0,100,200,300][i]}" font-size="10" fill="${M}">${b}</text>`).join("")}
    ${ARCH.edges.map(([a,b])=>{const[ax,ay,pa]=mid(a),[bx,by,pb]=mid(b);return `<line class="ax-edge" data-e="${a}-${b}" x1="${ax}" y1="${pa[1]+pa[3]}" x2="${bx}" y2="${pb[1]-2}" stroke="${S}" stroke-width="1.5" marker-end="url(#ah-${kind})"/>`;}).join("")}
    ${Object.keys(N).map(id=>{const p=pos[id];return `<g class="ax-node" data-n="${id}" tabindex="0" role="button" aria-label="${N[id].title}, ${N[id].tier}"><rect x="${p[0]}" y="${p[1]}" width="${p[2]}" height="${p[3]}" rx="8"/><text x="${p[0]+p[2]/2}" y="${p[1]+24}" text-anchor="middle" font-size="12" font-weight="700">${N[id].title}</text><text x="${p[0]+p[2]/2}" y="${p[1]+42}" text-anchor="middle" font-size="10" class="ax-ctl">${N[id].controls.join(" · ")}</text></g>`;}).join("")}</svg>`;
}

function renderArchOverview(){
  const A=ARCH,mode=LS.get(KEY+"axMode","enclosed"),sel=+LS.get(KEY+"axNode",1);
  const d=A.nodes[sel],lbl={enclosed:"Enclosed lab (on-prem)",cloud:"Cloud lab (classified, IL6)",both:"Side by side"};
  const spec=mode==="both"?`<div class="tblwrap"><table class="ax-cmp"><thead><tr><th scope="col">Enclosed lab</th><th scope="col">Cloud lab (IL6)</th></tr></thead><tbody><tr><td>${chipsInline(d.enclosed)}</td><td>${chipsInline(d.cloud)}</td></tr></tbody></table></div>`
    :`<div class="ax-spec"><span class="ax-lab">${esc(lbl[mode])}</span><p>${chipsInline(d[mode])}</p></div>`;
  return `<section class="ax" aria-labelledby="axH"><h3 id="axH">Architecture explorer</h3><p class="lead">${chipsInline(A.intro)}</p>
   <div class="ax-toggle" role="radiogroup" aria-label="Deployment posture">${Object.keys(lbl).map(k=>`<button type="button" role="radio" aria-checked="${mode===k}" class="b ${mode===k?"on":""}" data-axm="${k}">${lbl[k]}</button>`).join("")}</div>
   <div class="ax-grid"><div class="ax-canvas">${archSVG("explorer")}</div>
   <div class="ax-detail" aria-live="polite"><span class="ax-tier">${esc(d.tier)}</span><h4>${esc(d.title)}</h4>
    <div class="ax-chips" aria-label="NIST SP 800-53 Rev 5 controls">${d.controls.map(c=>`<span class="pill">${c}</span>`).join("")}</div>${spec}
    <div class="ax-spec"><span class="ax-lab">RMF context</span><p>${chipsInline(d.rmf)}</p></div>
    <p class="ax-note">Products named are examples, not requirements.</p></div></div></section>`;
}
function bindArch(el){
  const paint=()=>{const sel=+LS.get(KEY+"axNode",1),n=ARCH.nodes[sel],rel=new Set([sel]);ARCH.edges.forEach(([a,b])=>{if(a===sel)rel.add(b);if(b===sel)rel.add(a);});
    $$(".ax-node",el).forEach(g=>{const id=+g.dataset.n;g.classList.toggle("is-sel",id===sel);g.classList.toggle("is-dim",!rel.has(id));g.setAttribute("aria-pressed",id===sel);});
    $$(".ax-edge",el).forEach(e=>{const[a,b]=e.dataset.e.split("-").map(Number);e.classList.toggle("is-on",a===sel||b===sel);});};
  $$(".ax-node",el).forEach(g=>{const pick=()=>{LS.set(KEY+"axNode",+g.dataset.n);renderViews();const ng=$(`.ax-node[data-n="${g.dataset.n}"]`);if(ng)ng.focus();};
    g.onclick=pick;g.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick();}};});
  $$("[data-axm]",el).forEach(b=>b.onclick=()=>{LS.set(KEY+"axMode",b.dataset.axm);renderViews();const nb=$(`[data-axm="${b.dataset.axm}"]`);if(nb)nb.focus();});
  paint(); if(typeof bindSourceChips==="function") bindSourceChips(el);
}
function archBlueprintHTML(tab){
  const A=ARCH,trace=`<div class="note"><b>Trace it.</b> ${['<a href="#/ea">EA mapping</a>','<a href="#/glossary">Glossary</a> (DAAG, NISP eMASS, Possessing FCL)','<a href="#/refs">Source ledger</a>'].join(" · ")}. Tap any S# chip for the source summary.</div>`;
  const chipify=t=>typeof promptBody==="function"?t:ec(t);
  const P=t=>`<p>${chipsInline(t)}</p>`;
  if(tab==="overview") return renderArchOverview()+`<div class="note good"><b>${esc(A.tip.split(".")[0])}.</b> ${chipsInline(A.tip.split(". ").slice(1).join(". "))}</div>`+trace;
  const v=A.views.find(x=>x.id===tab); if(v) return `<h3 class="ax-h">${esc(v.h)}</h3>${v.p.map(P).join("")}`+trace;
  if(tab==="matrix") return `<h3 class="ax-h">2 · Enclosed lab vs cloud lab</h3><div class="tblwrap"><table class="ax-matrix"><thead><tr>${A.matrix.cols.map(c=>`<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${A.matrix.rows.map(r=>`<tr><th scope="row">${esc(r[0])}</th><td data-l="Enclosed lab">${chipsInline(r[1])}</td><td data-l="Cloud lab">${chipsInline(r[2])}</td></tr>`).join("")}</tbody></table></div>
    <figure class="ax-fig">${archSVG("side")}<figcaption>Side by side: one logical core, two substrates.</figcaption></figure>`+trace;
  if(tab==="golden") return `<h3 class="ax-h">3 · The Golden 4 diagrams</h3>${[["rmf","RMF traceability stack: policy to pipeline, with evidence per layer."],["topo","Enclave plane and network topology."],["ingest","Air-gap AI ingestion pipeline."],["side","Enclosed vs cloud, side by side."]].map(([k,c])=>`<figure class="ax-fig">${archSVG(k)}<figcaption>${c}</figcaption></figure>`).join("")}`+trace;
  if(tab==="flags") return `<h3 class="ax-h">Still to verify</h3><p>These claims have no primary source on this site yet. Don't rely on them.</p><ul>${A.flags.map(f=>`<li>UNVERIFIED: ${esc(f)}</li>`).join("")}</ul>`;
  return "";
}
/* S# chips inside architecture text, reusing the prompt chip markup */
function chipsInline(t){let k=0;return esc(t).replace(/\[(S\d+(?:\s*,\s*S\d+)*)\]/g,(m,inner)=>"["+inner.replace(/S(\d+)/g,(x,n)=>{const s=SRC[+n];if(!s)return x;const id=`axtip-${n}-${k++}-${Math.random().toString(36).slice(2,6)}`;
  return `<span class="schip-wrap"><button type="button" class="schip" aria-expanded="false" aria-controls="${id}" aria-label="Source S${n}: ${esc(s.t)}. Show summary">S${n}</button><span class="stip" id="${id}" role="tooltip" hidden><b>S${n} · ${esc(s.t)}</b>${esc(srcNote(n))}<br><a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a></span></span>`;})+"]");}

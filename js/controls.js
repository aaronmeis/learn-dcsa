/* NIST SP 800-53 Rev 5 control notes. Names are exactly as in the Rev 5 catalog (checked against NIST's
   OSCAL catalog, release 5.2.0). The plain-English lines say what the control means and why it matters in
   this site's architecture. Links go to NIST's official SP 800-53 Rev 5 control catalog (CPRT). */
window.CTL_URL=c=>`https://csrc.nist.gov/projects/cprt/catalog#/cprt/framework/version/SP_800_53_5_1_1/home?element=${c}`;
window.CTL_FAMILIES={AC:"Access Control",AU:"Audit and Accountability",CA:"Assessment, Authorization, and Monitoring",CM:"Configuration Management",IA:"Identification and Authentication",MP:"Media Protection",PE:"Physical and Environmental Protection",PL:"Planning",SA:"System and Services Acquisition",SC:"System and Communications Protection",SI:"System and Information Integrity",SR:"Supply Chain Risk Management"};
window.CONTROLS={
 "AC-2":{n:"Account Management",t:"Create, approve, review and remove user and service accounts on purpose. Here it means every person, admin and AI agent inside the boundary has a known, approved account."},
 "AC-3":{n:"Access Enforcement",t:"The system itself enforces who may reach what. For the AI runtime that means the model, tools and retrieval only return what the requesting user is approved to see."},
 "AU-2":{n:"Event Logging",t:"Decide in advance which events the system must log (Rev 5 renamed this from 'Audit Events'). Here: sign-ins, admin actions, data movement and model use."},
 "AU-12":{n:"Audit Record Generation",t:"The system actually produces the audit records chosen under AU-2. Here every prompt, completion and pipeline step writes a record tied to a user identity."},
 "CA-3":{n:"Information Exchange",t:"Approve and document every connection that moves data between systems, usually in an interconnection or exchange agreement. Here it covers the cross-domain or air-gap path."},
 "CM-7":{n:"Least Functionality",t:"Turn on only the ports, services and software the mission needs. Here it keeps GPU nodes, containers and agent tools stripped down."},
 "IA-2":{n:"Identification and Authentication (Organizational Users)",t:"Uniquely identify and authenticate the organization's users, with multi-factor authentication in its enhancements. Here: PKI or token sign-in before anyone reaches the lab."},
 "MP-6":{n:"Media Sanitization",t:"Clean or destroy media before it is reused or leaves control. Here: drives and storage at end of life, per NIST SP 800-88."},
 "PE-3":{n:"Physical Access Control",t:"Control who can physically enter where the system lives. Here: the Closed Area or SCIF around the enclosed lab."},
 "PL-8":{n:"Security and Privacy Architectures",t:"Write down the security architecture and how it protects the system. Here: the trust boundary and layers this Explorer shows, captured in the SSP."},
 "SA-9":{n:"External System Services",t:"Hold outside providers to your security requirements and monitor them. Here: what a cloud provider supplies and what you still own."},
 "SA-12":{n:"Supply Chain Protection",w:true,t:"Withdrawn in Rev 5. Its content was incorporated into the new SR (Supply Chain Risk Management) family; use SR controls such as SR-4 instead."},
 "SC-7":{n:"Boundary Protection",t:"Monitor and control traffic at the system's external and key internal boundaries. Here: firewalls and guards around the enclave and the AI runtime."},
 "SC-28":{n:"Protection of Information at Rest",t:"Protect stored data, usually with encryption. Here: model weights, datasets and logs on GPU and SAN storage."},
 "SI-4":{n:"System Monitoring",t:"Watch the system for attacks, misuse and unauthorized connections. Here: SIEM monitoring of the lab and its AI workloads."},
 "SR-4":{n:"Provenance",t:"Document and track where components and data came from. Here: proving the origin of model weights, containers and hardware brought into the lab."},
 "FIPS 140-3":{n:"Security Requirements for Cryptographic Modules",std:true,u:"https://csrc.nist.gov/pubs/fips/140-3/final",t:"The NIST standard that cryptographic modules are validated against. Here: encryption for storage and links should use FIPS 140-3 validated modules."}
};
window.CTL_RE=/\b(?:(?:AC|AU|CA|CM|IA|MP|PE|PL|SA|SC|SI|SR)-\d{1,2}|FIPS 140-3)\b/g;
window.ctlChip=function(c){const x=CONTROLS[c];if(!x)return c;const id="ctl-"+c.replace(/\W/g,"")+"-"+Math.random().toString(36).slice(2,7);
 const fam=x.std?"Federal standard":"NIST SP 800-53 Rev 5 · "+(CTL_FAMILIES[c.slice(0,2)]||"");const u=x.u||CTL_URL(c);const e=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
 return `<span class="schip-wrap"><button type="button" class="schip ctl${x.w?" wd":""}" aria-expanded="false" aria-controls="${id}" aria-label="${e(c)}: ${e(x.n)}${x.w?" (withdrawn)":""}. Show note">${e(c)}</button><span class="stip" id="${id}" role="tooltip" hidden><b>${e(c)} · ${e(x.n)}${x.w?" (withdrawn)":""}</b><span class="ctl-fam">${e(fam)}</span>${e(x.t)}<br><a href="${e(u)}" target="_blank" rel="noopener">${x.std?"Open the standard":"Open on NIST"} ↗</a></span></span>`;};
/* Wraps bare codes in already-escaped text. Run before S# chip replacement. */
window.ctlInline=function(html){return html.replace(CTL_RE,m=>CONTROLS[m]?ctlChip(m):m);};
/* Glossary entries (and search, Map) for every code above, plus a "Control families" parent entry. */
(function(){ if(typeof DATA==="undefined"||!DATA.glossary) return;
 const fams=Object.keys(CTL_FAMILIES);
 DATA.glossary.push({category:"Security controls",term:"Control families",rung:200,
  definition:"NIST SP 800-53 Rev 5 groups its controls into 20 families, named by two-letter codes. The ones this site uses: "+fams.map(f=>f+" "+CTL_FAMILIES[f]).join("; ")+". A code like IA-2 means family IA, control 2.",
  source:"site",link:{href:"https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",label:"NIST SP 800-53 Rev 5"}});
 Object.keys(CONTROLS).forEach(c=>{const x=CONTROLS[c];
  DATA.glossary.push({category:"Security controls",term:c,rung:300,
   definition:x.n+(x.w?" (withdrawn in Rev 5)":"")+". "+(x.std?"":"NIST SP 800-53 Rev 5, "+CTL_FAMILIES[c.slice(0,2)]+" family. ")+x.t,
   source:"site",link:{href:x.u||CTL_URL(c),label:x.std?"Open the standard":"Open on NIST"}});});
 const L=DATA.glossaryLinks=DATA.glossaryLinks||{};L.related=L.related||{};
 L.related["Control families"]=Object.keys(CONTROLS).filter(c=>!CONTROLS[c].std);
 L.related["SA-12"]=["SR-4"];L.related["AU-2"]=["AU-12"];
})();

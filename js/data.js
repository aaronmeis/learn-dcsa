const SOURCES = [
  {n:1,g:"Primary regs",t:"eCFR 32 CFR Part 117 NISPOM",u:"https://www.ecfr.gov/current/title-32/subtitle-A/chapter-I/subchapter-D/part-117",type:"primary-reg",trust:"high",b:"1-7"},
  {n:2,g:"Handbooks",t:"DCSA FCL Orientation Handbook (2026)",u:"https://www.dcsa.mil/Portals/128/Documents/CTP/fc/DCSA%20FCL_Orientation_Handbook_20260828.pdf",type:"handbook",trust:"high",b:"1,3,5"},
  {n:3,g:"News",t:"DCSA SF 328 update announcement May 2025",u:"https://www.dcsa.mil/About-Us/News/Article/Article/4180585/dcsa-announces-approval-of-the-updated-form-328-certificate-pertaining-to-forei/",type:"news",trust:"high",b:"1,5,7"},
  {n:4,g:"Primary",t:"DCSA SF 328 Industry Information Paper May 2025",u:"https://www.dcsa.mil/Portals/128/Documents/CTP/FOCI/Updated%20SF328%20-%20Industry%20Information%20Paper%20(final).pdf",type:"primary",trust:"high",b:"1,5,7"},
  {n:5,g:"CDSE",t:"Facility Clearances in the NISP IS140.16",u:"https://www.cdse.edu/Training/eLearning/IS140/",type:"course",trust:"high",b:"1,2,6"},
  {n:6,g:"CDSE",t:"Personnel Clearances in the NISP IS142.16",u:"https://www.cdse.edu/Training/eLearning/IS142-resources/",type:"course",trust:"high",b:"1,2,6"},
  {n:7,g:"CDSE",t:"FSO Orientation Non-Possessing IS020.CU",u:"https://www.cdse.edu/Training/Curricula/IS020/",type:"curriculum",trust:"high",b:"2,6,7"},
  {n:8,g:"CDSE",t:"CDSE FSO Toolkit",u:"https://www.cdse.edu/Training/Toolkits/FSO-Toolkit/",type:"toolkit",trust:"high",b:"2,6"},
  {n:9,g:"News",t:"DCSA Continuous Vetting update May 2026",u:"https://www.dcsa.mil/About-Us/News/Article/Article/4496039/dcsa-updates-nisp-contractor-continuous-vetting-process/",type:"news",trust:"high",b:"1,5"},
  {n:10,g:"Talks",t:"How to Get a Facility Clearance (Bennett FSO talk)",u:"https://www.youtube.com/watch?v=Jf-SDX2WE8k",type:"video",trust:"high",b:"1,3,4"},
  {n:11,g:"Talks",t:"DON OSBP Small Business Webinar — DCSA",u:"https://www.youtube.com/watch?v=Y5t5sV9GQy0",type:"video",trust:"high",b:"1,3"},
  {n:12,g:"Talks",t:"FOCI and Supply Chain Risk Management webinar",u:"https://www.youtube.com/watch?v=CrifvnX3o5M",type:"video",trust:"high",b:"1,5"},
  {n:13,g:"Manuals",t:"DAAPM v2.2 (RMF for NISP contractors)",u:"https://rmf.org/wp-content/uploads/2022/02/DCSA-Assessment-and-Authorization-Process-Manual-Version-2.2.pdf",type:"manual",trust:"high",b:"1,5"},
  {n:14,g:"CDSE",t:"Applying A&A in the NISP CS250.16",u:"https://www.cdse.edu/Training/eLearning/CS250/",type:"course",trust:"high",b:"1,6"}
];

const DATA = {
  checked:"Checked against ODM+TDD DCSA packs and ledger [S1]–[S14] on 2026-10-13. NotebookLM reports are secondary.",
  weeks:[
    {n:1,title:"Dual-track core",time:"60 min",rungs:"100",lib:"odm-block-01-core-concepts",
     opener:"DCSA runs an interlocking operating model: Facility Clearance (FCL) under NISPOM 32 CFR 117 via NISS, and Personnel Clearance (PCL) via SF-86/NBIS with SEAD 4 adjudication [S1][S2]. Plain English: the facility and the people unlock each other. Analogy: a locked vault and the keys — neither works alone.",
     obj:"State the dual-track lock and the no-self-sponsor rule without notes.",
     deliv:"Two sentences: who may sponsor an FCL, and why KMPs matter.",
     mods:[
       {t:"Dual-track lock [S2]",rl:"fcl · 100", action:"Write: no useful PCL pipeline without an eligible facility sponsor; no usable FCL without cleared KMPs.", whyMatters:"Badge chase without FCL is the common failure."},
       {t:"No self-sponsor [S2][S10]",rl:"fcl · 100", action:"Name who initiates NISS: GCA or cleared prime.", whyMatters:"Self-sponsor is the pack falsifier."}
     ],
     vids:[{s:2},{s:10}]},
    {n:2,title:"Mental models",time:"45 min",rungs:"100",lib:"odm-block-02-mental-models",
     opener:"Experts chunk DCSA with five models: dual-track lock, clock vs quality, FOCI as schedule risk, whole-person SEAD 4, and two walls (CMMC ≠ FCL) [S2][S4][S9]. Plain English: use the right frame before diving into forms.",
     obj:"Name the model for 'we'll get GCC High and then we're cleared.'",
     deliv:"Five-row table: model / when / failure mode.",
     mods:[
       {t:"Clock vs quality [S2]",rl:"fcl · 100", action:"Day 20 complete package beats a fast empty package.", whyMatters:"Incomplete first packages burn the clock."},
       {t:"Two walls [S13]",rl:"cui · 100", action:"CMMC floor ≠ FCL ≠ classified ATO.", whyMatters:"Cloud attestations support; they do not confer."}
     ],
     vids:[{s:2},{s:4}]},
    {n:3,title:"Package and clocks drill",time:"90 min",rungs:"200",lib:"odm-block-03-active-practice",
     opener:"Welcome email is Day 1. Day 20: formation docs, ownership chart, DD 441, SF 328, KMP list. Day 45: KMP investigation requests + fingerprints [S2]. Plain English: the early gates are paperwork quality under a hard clock.",
     obj:"Recite Day 20 contents and Day 45 ask from memory.",
     deliv:"Annotated package checklist + swimlane sketch (GCA→NISS→package→KMP PCLs→FCL).",
     mods:[
       {t:"Day 20 package [S2]",rl:"fcl · 200", action:"List the five core package items.", whyMatters:"Missing one item returns the package."},
       {t:"Day 45 KMPs [S2]",rl:"pcl · 200", action:"Queue e-QIP/fingerprints for uncleared KMPs.", whyMatters:"FCL grant waits on KMP eligibility."}
     ],
     vids:[{s:2},{s:10}]},
    {n:4,title:"Teach-back",time:"30 min",rungs:"200",lib:"odm-block-04-teach-it",
     opener:"Teach the dual-track swimlane in ~10 minutes and kill one falsifier: self-sponsor or GCC High = FCL [S2][S10]. Plain English: if you can teach it, you own it.",
     obj:"Deliver a 10-minute teach without reading slides.",
     deliv:"Spoken outline + one falsifier kill line.",
     mods:[
       {t:"Swimlane teach [S2]",rl:"fcl · 200", action:"Narrate GCA→NISS→Day 20→Day 45→grant.", whyMatters:"Mission success test."},
       {t:"Falsifier kill",rl:"cui · 200", action:"Say support ≠ confer for CMMC/GCC High/FedRAMP.", whyMatters:"Pack falsifier."}
     ],
     vids:[{s:10},{s:11}]},
    {n:5,title:"FOCI, CV, possessing",time:"45 min",rungs:"300",lib:"odm-block-05-edge-cases",
     opener:"May 2025 SF 328 lowered Q7b foreign proceeds disclosure to 15% (NISS ~12 May 2025). Continuous vetting moved NISP contractors toward a five-year PVQ; possessing vs non-possessing changes on-site storage, not the need for KMPs [S3][S4][S9].",
     obj:"State the 15% change and possessing vs non-possessing in one line each.",
     deliv:"FOCI one-pager: threshold, what triggers narrative, mitigation as schedule risk.",
     mods:[
       {t:"SF 328 15% [S3][S4]",rl:"foci · 300", action:"Rewrite any 'we're under 30%' habit to 15%.", whyMatters:"Labs with international revenue get caught here."},
       {t:"Possessing vs non-possessing [S2]",rl:"fcl · 200", action:"Non-possessing still needs sponsorship, KMPs, FSO.", whyMatters:"Common myth that non-possessing skips the dual-track."}
     ],
     vids:[{s:3},{s:4},{s:9}]},
    {n:6,title:"Spaced review",time:"20 min",rungs:"200",lib:"odm-block-06-spaced-review",
     opener:"Closed-book retrieval on clocks, tiers, SEAD 4, SF 328, and the falsifier [S2][S4][S6]. Plain English: if you cannot recall it cold, you do not have it yet.",
     obj:"Answer quiz bank Q1–Q12 without notes.",
     deliv:"Scored quiz + three flash prompts for 24h/7d review.",
     mods:[
       {t:"Quiz bank",rl:"all · 200", action:"Run `#/quiz` closed-book.", whyMatters:"Spaced review block exit."},
       {t:"Flash prompts",rl:"all · 200", action:"Schedule three: clocks, tiers, falsifier.", whyMatters:"Retention."}
     ],
     vids:[{s:5},{s:6}]},
    {n:7,title:"Application artifacts",time:"60 min",rungs:"300",lib:"odm-block-07-application",
     opener:"Ship three artifacts: dual-track swimlane, FOCI/SF 328 one-pager, CDSE course map (IS140, IS142, IS020.CU, CS250) [S5][S6][S7][S14].",
     obj:"Produce all three without inventing unverified return-rate stats.",
     deliv:"Swimlane + FOCI brief + CDSE map filed in learning-records.",
     mods:[
       {t:"CDSE map [S5][S6][S7][S8]",rl:"career · 200", action:"Map four domains to courses on STEPP.", whyMatters:"Career path after the day."},
       {t:"No folklore stats",rl:"fcl · 300", action:"Do not quote ~2/3 incomplete until E1W.", whyMatters:"Claims note silence."}
     ],
     vids:[{s:5},{s:8}]},
    {n:8,title:"Conceptual architecture",time:"60 min",rungs:"200",lib:"tdd-view-01-conceptual",
     opener:"TDD altitude: capabilities without product names — sponsorship intake, FOCI evaluation, personnel eligibility, IS authorization, CI support. CMMC is an adjacent CUI floor, not a NISP eligibility box.",
     obj:"Draw conceptual view with no product logos.",
     deliv:"Capability boxes + three-wall decision rule.",
     mods:[
       {t:"Capability map",rl:"arch · 200", action:"Name C1 sponsorship through CI support.", whyMatters:"Design-review language."},
       {t:"Three walls",rl:"cui · 200", action:"CMMC floor / FCL / classified ATO — one sentence each.", whyMatters:"Quiz item 7."}
     ],
     vids:[{s:1},{s:13}]},
    {n:9,title:"Logical and physical",time:"60 min",rungs:"300",lib:"tdd-view-02-logical",
     opener:"Logical components realize capabilities (NISS, NBIS, STEPP, eMASS). Physical services host them. DAAPM overlays NIST RMF for contractor classified systems [S13][S14].",
     obj:"Map three logical components to physical services.",
     deliv:"One logical→physical row set for sponsorship, PCL, and A&A.",
     mods:[
       {t:"NISS as sponsorship gate [S2]",rl:"arch · 300", action:"Logical sponsorship → physical NISS.", whyMatters:"C1 realization."},
       {t:"DAAPM overlays RMF [S13]",rl:"ato · 300", action:"Classified contractor IS needs DAAPM ATO, not CMMC alone.", whyMatters:"Third wall."}
     ],
     vids:[{s:13},{s:14}]},
    {n:10,title:"Integration, AI, failures",time:"60 min",rungs:"300",lib:"tdd-view-04-integration-ai",
     opener:"External systems: NISS, NBIS/e-QIP, STEPP, eMASS, DD 254 from GCA. AI assistive only — hard-block SF-86 and FOCI PII into consumer AI. Failure catalog: equating CMMC/cloud with FCL/ATO is critical.",
     obj:"Name three externals and the AI hard-block.",
     deliv:"Third-party inventory row + one failure-mode card.",
     mods:[
       {t:"External inventory",rl:"arch · 300", action:"List NISS, NBIS, STEPP, eMASS roles.", whyMatters:"TDD third-party requirement."},
       {t:"AI default-deny",rl:"trust · 300", action:"SF-86/FOCI PII never enter consumer AI.", whyMatters:"Human FSO owns submissions."}
     ],
     vids:[{s:2},{s:13}]},
    {n:11,title:"Decision packet",time:"25 min",rungs:"300",lib:"nblm-odm-decision-packet",
     opener:"Walk into a room with: dual-track lock, Day 20/45, SF 328 15%, three walls, CDSE start courses. Refuse self-sponsor and CMMC=FCL.",
     obj:"Three-line decision: in, out, measure.",
     deliv:"In = NISP dual-track plan; out = treating cloud as clearance; measure = package completeness before Day 20.",
     mods:[
       {t:"In / out / measure",rl:"scope · 300", action:"Write the three lines.", whyMatters:"Executive packet exit."},
       {t:"Warrant check",rl:"scope · 300", action:"Pick one debate; write If X then Y.", whyMatters:"Research-craft layer."}
     ],
     vids:[{s:2},{s:4}]}
  ],
  ladder:[
    {key:"fcl",name:"Facility track",img:"100",r:[{n:100,t:"No self-sponsor; GCA or cleared prime via NISS."},{n:200,t:"Day 20 package contents and Day 45 KMP clock."},{n:300,t:"Possessing vs non-possessing; FOCI mitigation as schedule risk."}]},
    {key:"pcl",name:"Personnel track",img:"200",r:[{n:100,t:"SF-86 / NBIS; Tier 3 vs Tier 5."},{n:200,t:"SEAD 4 thirteen guidelines, whole person."},{n:300,t:"Continuous vetting / PVQ cadence for NISP contractors."}]},
    {key:"cui",name:"Walls and ATO",img:"300",r:[{n:100,t:"CMMC floor ≠ FCL."},{n:200,t:"GCC High / FedRAMP support ≠ confer."},{n:300,t:"DAAPM overlays RMF for classified contractor systems."}]}
  ],
  miniModules:[
    {name:"NISS",t:"System of record for FCL sponsorship and industrial security packages."},
    {name:"NBIS / e-QIP",t:"Personnel investigation intake for PCL."},
    {name:"STEPP / CDSE",t:"Training portal: IS140, IS142, IS020.CU, CS250."},
    {name:"DAAPM / eMASS",t:"RMF-aligned authorization path for classified contractor IS."},
    {name:"CMMC (contrast)",t:"Uncleared CUI cybersecurity floor — adjacent, not NISP eligibility."}
  ],
  prompts:[
    {cat:"1 · Dual-track",model:"any",desc:"Facility and people unlock each other.",items:["Lab wants badges first","Company wants to self-file in NISS"],
     flagship:"Explain the dual-track lock in eight sentences. Who sponsors an FCL? What happens if KMPs are uncleared? Cite [S2]. Kill the self-sponsor myth."},
    {cat:"2 · Clocks",model:"any",desc:"Day 20 and Day 45 from welcome Day 1.",items:["Incomplete ownership chart","Uncleared FSO"],
     flagship:"Welcome email is Day 1. List Day 20 package items and Day 45 asks. Say why incomplete packages burn more calendar than slow complete ones. Cite [S2]."},
    {cat:"3 · SF 328",model:"any",desc:"May 2025 fifteen percent.",items:["University with foreign tuition","Lab under old 30% habit"],
     flagship:"State the Q7b threshold change, form approval date, and NISS deploy date. Write three questions finance/sponsored programs must answer. Cite [S3][S4]."},
    {cat:"4 · SEAD 4",model:"any",desc:"Whole person versus checklist.",items:["SF-86 as pass/fail","Continuous vetting alert"],
     flagship:"Name thirteen guidelines as a structure (not a memorized essay). Steelman the checklist habit. Cite [S6][S9]."},
    {cat:"5 · Three walls",model:"any",desc:"CMMC floor, FCL, classified ATO.",items:["GCC High pitch","CMMC Level 2 certificate"],
     flagship:"One sentence each for CMMC floor, FCL, and classified ATO. End with support ≠ confer. Cite [S13] and the sibling CMMC pack."},
    {cat:"6 · Architecture",model:"any",desc:"Conceptual then logical.",items:["Whiteboard for leadership","Vendor logo slide"],
     flagship:"Draw conceptual capabilities with no product names, then map sponsorship to NISS and A&A to DAAPM/eMASS. Cite [S2][S13]."},
    {cat:"7 · Failure modes",model:"any",desc:"Critical equivocation.",items:["FedRAMP High = Secret","Non-possessing skips KMPs"],
     flagship:"Pick two failure modes from the catalog. For each: symptom, root confusion, fix. Mark any return-rate percentage as unverified until E1W."},
    {cat:"8 · CDSE path",model:"any",desc:"Four domains to courses.",items:["New FSO","Non-possessing facility"],
     flagship:"Map industrial security, personnel vetting, IS authorization, and CI to IS140, IS142, CS250, and IS020.CU. Cite [S5][S6][S7][S14]."},
    {cat:"9 · Warrants",model:"any",desc:"If X then Y.",items:["Debate 1 package quality","Debate 2 SF 328 15%"],
     flagship:"Pick one live debate. Write Claim A, Claim B, warrant as If X then Y, one hidden assumption, and tests E*A / E*B / E*W. Status pills stay unrun until evidence sittings."}
  ],
  checklist:[
    {title:"Self-sponsor myth",view:"Facility",src:"S2",
     good:"GCA or cleared prime initiates sponsorship in NISS.",
     bad:"Tell: company tries to open its own FCL case. Root cause: confusing desire with sponsorship authority."},
    {title:"Incomplete Day 20 package",view:"Facility",src:"S2",
     good:"Formation docs, ownership chart, DD 441, SF 328, KMP list complete and consistent.",
     bad:"Tell: package returned; clock still running. Root cause: missing beneficial owners or mismatched KMP roles."},
    {title:"Finance still on 30%",view:"FOCI",src:"S4",
     good:"Model foreign proceeds against the 15% Q7b threshold after May 2025.",
     bad:"Tell: affirmative Q7 surprise mid-review. Root cause: old threshold habit."},
    {title:"CMMC or GCC High as clearance",view:"Walls",src:"S13",
     good:"Treat CMMC/FedRAMP/GCC High as CUI/cloud support only.",
     bad:"Tell: slides claim 'we're cleared.' Root cause: support confused with confer."},
    {title:"Non-possessing skips dual-track",view:"Facility",src:"S2",
     good:"Non-possessing still needs sponsorship, cleared KMPs, and an FSO program.",
     bad:"Tell: plan omits KMP PCLs because 'we won't store classified.'"},
    {title:"SF-86 into consumer AI",view:"Trust",src:"pack",
     good:"Hard-block SF-86 and FOCI PII from consumer AI; human FSO owns submissions.",
     bad:"Tell: paste of investigative PII into a chatbot."},
    {title:"DAAPM skipped for classified IS",view:"ATO",src:"S13",
     good:"Classified contractor systems follow DAAPM overlay on RMF / eMASS.",
     bad:"Tell: CMMC Level 2 used as Secret system authorization."},
    {title:"Checklist-only adjudication",view:"Personnel",src:"S6",
     good:"SEAD 4 whole-person across thirteen guidelines; CV alerts triaged in context.",
     bad:"Tell: yes/no theater on a short list of guidelines only."}
  ],
  cheat:[
    {t:"Sponsor rule",d:"GCA or cleared prime → NISS. Applicant cannot self-sponsor."},
    {t:"Clocks",d:"Welcome = Day 1. Day 20 package. Day 45 KMP investigations + fingerprints."},
    {t:"SF 328 Q7b",d:"Foreign proceeds disclosure threshold 15% as of May 2025 (NISS ~12 May)."},
    {t:"Three walls",d:"CMMC floor (CUI) · FCL (facility eligibility) · classified ATO (DAAPM/RMF). Support ≠ confer."},
    {t:"Tiers",d:"Tier 3 ≈ Secret/Confidential. Tier 5 ≈ Top Secret."},
    {t:"SEAD 4",d:"Thirteen adjudicative guidelines; whole-person, not a checklist."},
    {t:"CDSE start",d:"IS140 (FCL), IS142 (PCL), IS020.CU (non-possessing FSO), CS250 (A&A)."}
  ],
  falsifier:"Ending the day still believing a company can self-sponsor an FCL, or that GCC High / CMMC / FedRAMP equals FCL (or authorizes Secret/TS).",
  quizSections:{1:"Sponsorship and clocks",2:"Personnel and SEAD 4",3:"FOCI and walls",4:"Architecture",5:"Warrants"},
  quiz:[
    {section:1,question:"Can a company self-sponsor an FCL in NISS?",answer:"No. A GCA or cleared prime initiates sponsorship [S2][S10].",src:"S2"},
    {section:1,question:"Welcome email is Day 1. What is due by Day 20? By Day 45?",answer:"Day 20: formation docs, ownership chart, DD 441, SF 328, KMP list. Day 45: KMP investigation requests + fingerprints [S2].",src:"S2"},
    {section:1,question:"Name the five core FCL package items.",answer:"Formation/legal docs · ownership chart · DD 441 · SF 328 · KMP list.",src:"S2"},
    {section:2,question:"Tier 3 vs Tier 5 — typical levels and one depth cue.",answer:"Tier 3 → Secret/Confidential (~5 years, NAC/credit). Tier 5 → Top Secret (full field, ~10 years, interviews).",src:"S6"},
    {section:2,question:"What is SEAD 4? How many guidelines? Checklist?",answer:"Security Executive Agent Directive 4 — thirteen whole-person guidelines; cumulative/contextual, not yes/no checklist.",src:"S6"},
    {section:3,question:"May 2025 SF 328 Q7b change and NISS deploy date?",answer:"Foreign proceeds threshold 30% → 15%. Form ~1 May 2025; NISS ~12 May 2025 [S3][S4].",src:"S4"},
    {section:3,question:"True/false: CMMC Level 2 or GCC High confers an FCL or Secret ATO.",answer:"False. CMMC/GCC High are CUI/cloud support. FCL and DAAPM ATO are separate walls.",src:"S13"},
    {section:3,question:"Possessing vs non-possessing — one line. Do KMPs go away?",answer:"Possessing may store/process classified on site; non-possessing does not store on site but still needs sponsorship, KMPs, and FSO.",src:"S2"},
    {section:4,question:"Name the four DCSA domains in this pack.",answer:"Industrial security/NISP · personnel vetting · IS authorization (DAAPM/RMF) · counterintelligence.",src:"S5"},
    {section:4,question:"Which manual governs classified contractor IS authorization under DCSA?",answer:"DAAPM overlays NIST RMF; CDSE CS250 covers applying A&A in the NISP [S13][S14].",src:"S13"},
    {section:4,question:"Map one CDSE course to FCL and one to PCL. Portal?",answer:"IS140 Facility Clearances · IS142 Personnel Clearances · STEPP via CDSE [S5][S6][S8].",src:"S5"},
    {section:5,question:"State today's falsifier in one sentence.",answer:"Still believing self-sponsor works, or that GCC High/CMMC/FedRAMP equals FCL or Secret/TS ATO.",src:"S2"},
    {section:5,question:"What warrant makes Day-20 package quality a schedule driver?",answer:"If the process publishes hard early gates and limited retries on completeness, then documentation defects explain early stops and rework [S2].",src:"S2"},
    {section:5,question:"Why is '~two-thirds of first packages returned incomplete' not on the quiz as fact?",answer:"It is unverified folklore until evidence sitting E1W finds a primary statistic.",src:"claims"}
  ],
  glossary:[
    {category:"Agency",term:"DCSA",rung:100,essential:true,definition:"Defense Counterintelligence and Security Agency — administers NISP for industry, personnel vetting, industrial security, CI support, and related IS authorization oversight.",source:"ledger"},
    {category:"Agency",term:"NISP",rung:100,essential:true,definition:"National Industrial Security Program — framework for protecting classified information in industry.",source:"ledger"},
    {category:"Agency",term:"NISPOM",rung:100,essential:true,definition:"National Industrial Security Program Operating Manual — codified as 32 CFR Part 117. [S1]",source:"ledger"},
    {category:"Facility",term:"NISS",rung:100,essential:true,definition:"National Industrial Security System — DCSA system of record for FCL sponsorship and industrial security casework. [S2]",source:"ledger"},
    {category:"Facility",term:"FCL",rung:100,essential:true,definition:"Facility Clearance — authorization for a company to access classified information at a stated level; cannot be self-sponsored. [S2]",source:"ledger"},
    {category:"Facility",term:"GCA",rung:100,essential:true,definition:"Government Contracting Activity — with cleared primes, can initiate FCL sponsorship. [S2]",source:"ledger"},
    {category:"Facility",term:"DD-441",rung:200,essential:true,definition:"DD Form 441 — Security Agreement between the US Government and the contractor under the NISP.",source:"ledger"},
    {category:"Facility",term:"KMP",rung:100,essential:true,definition:"Key Management Personnel — officers/directors and designated security roles who must be cleared or excluded for FCL. [S2]",source:"ledger"},
    {category:"Facility",term:"Possessing FCL",rung:200,essential:true,definition:"Facility authorized to store/process classified information on-site.",source:"ledger"},
    {category:"Facility",term:"Non-possessing FCL",rung:200,essential:true,definition:"Facility cleared for access without storing classified on-site — still needs sponsorship, KMPs, and FSO program.",source:"ledger"},
    {category:"Facility",term:"FSO",rung:100,essential:true,definition:"Facility Security Officer — contractor security lead for NISP compliance at the facility.",source:"ledger"},
    {category:"Facility",term:"ISR",rung:200,definition:"Industrial Security Representative — DCSA field contact for the cleared facility.",source:"ledger"},
    {category:"FOCI",term:"SF-328",rung:100,essential:true,definition:"Certificate Pertaining to Foreign Interests — FOCI disclosure form; May 2025 Q7b threshold 15%. [S3][S4]",source:"ledger"},
    {category:"FOCI",term:"FOCI",rung:100,essential:true,definition:"Foreign Ownership, Control, or Influence — can block or delay FCL until mitigated (SCA, SSA, Proxy Board, etc.).",source:"ledger"},
    {category:"Personnel",term:"PCL",rung:100,essential:true,definition:"Personnel Clearance — individual eligibility for classified access after investigation and adjudication.",source:"ledger"},
    {category:"Personnel",term:"SF-86",rung:100,essential:true,definition:"Questionnaire for National Security Positions — submitted via e-QIP / NBIS for PCL.",source:"ledger"},
    {category:"Personnel",term:"NBIS",rung:200,essential:true,definition:"National Background Investigation Services — modern personnel vetting IT suite.",source:"ledger"},
    {category:"Personnel",term:"Tier 3",rung:100,essential:true,definition:"Investigation tier typically supporting Secret/Confidential — NAC, credit, ~5 years history.",source:"ledger"},
    {category:"Personnel",term:"Tier 5",rung:100,essential:true,definition:"Investigation tier typically supporting Top Secret — full field, ~10 years, subject interviews.",source:"ledger"},
    {category:"Personnel",term:"SEAD 4",rung:100,essential:true,definition:"Security Executive Agent Directive 4 — thirteen adjudicative guidelines under the whole-person concept. [S6]",source:"ledger"},
    {category:"Personnel",term:"Continuous vetting",rung:200,essential:true,definition:"Ongoing checks after clearance grant; NISP contractor model toward PVQ every 5 years with PR eliminated for many. [S9]",source:"ledger"},
    {category:"ATO",term:"DAAPM",rung:200,essential:true,definition:"DCSA Assessment and Authorization Process Manual — RMF-aligned process for authorizing classified contractor information systems. [S13]",source:"ledger"},
    {category:"ATO",term:"CMMC (contrast)",rung:100,essential:true,definition:"Cybersecurity Maturity Model Certification — uncleared/CUI contractor floor; ≠ FCL and does not authorize Secret/TS.",source:"ledger"},
    {category:"Training",term:"CDSE",rung:100,essential:true,definition:"Center for Development of Security Excellence — DCSA training organization.",source:"ledger"},
    {category:"Training",term:"STEPP",rung:100,essential:true,definition:"Security Training, Education, and Professionalization Portal — CDSE learning portal.",source:"ledger"},
    {category:"Training",term:"IS140",rung:200,definition:"CDSE eLearning: Facility Clearances in the NISP. [S5]",source:"ledger"},
    {category:"Training",term:"IS142",rung:200,definition:"CDSE eLearning: Personnel Clearances in the NISP. [S6]",source:"ledger"},
    {category:"Training",term:"IS020.CU",rung:200,definition:"Non-possessing FSO orientation curriculum (~26.5h). [S7]",source:"ledger"},
    {category:"Training",term:"CS250",rung:200,definition:"Applying Assessment and Authorization in the NISP. [S14]",source:"ledger"}
  ],
  views:{
    conceptual:{rule:"Capabilities without product logos. Dual-track + four domains. CMMC is adjacent CUI floor.",lib:"tdd-view-01-conceptual",img:["assets/diagrams/01-conceptual-1.png"],
      tables:[{caption:"Three walls",headers:["Wall","Decides"],rows:[["CMMC floor","Uncleared CUI cybersecurity maturity"],["FCL","Facility eligibility under NISP"],["Classified ATO","System authorization (DAAPM/RMF)"]]}]},
    logical:{rule:"Components realize capabilities: NISS, NBIS, STEPP, eMASS, FOCI casework.",lib:"tdd-view-02-logical",img:["assets/diagrams/02-logical-1.png"],
      tables:[{caption:"Capability → component",headers:["Capability","Logical component"],rows:[["Sponsorship intake","NISS case"],["Personnel eligibility","NBIS / investigation + SEAD 4"],["Training","STEPP / CDSE"],["Classified IS auth","DAAPM / eMASS"]]}]},
    physical:{rule:"Physical services and forms that host the logical model.",lib:"tdd-view-03-physical",img:["assets/diagrams/03-physical-1.png"],
      tables:[{caption:"Physical cues",headers:["Item","Role"],rows:[["NISS web package","FCL package submission"],["SF-86 in NBIS","PCL investigation UI"],["DD 441 / SF 328","Agreement + FOCI disclosure"],["eMASS","RMF package for classified IS"]]}]},
    integration:{rule:"Externals and AI boundary. Default-deny investigative PII.",lib:"tdd-view-04-integration-ai",img:["assets/diagrams/04-integration-ai-1.png"],
      tables:[{caption:"Externals",headers:["System","Mechanism"],rows:[["NISS","Web package / casework"],["NBIS / e-QIP","Investigation intake"],["STEPP","LMS"],["eMASS","RMF A&A"],["DD 254","GCA contract security requirements"]]}]},
    govcloud:{rule:"Cloud and CMMC support CUI architectures; they do not confer FCL or Secret ATO.",lib:"nblm-tdd-failure-modes",img:[],
      tables:[{caption:"Support ≠ confer",headers:["Claim heard","Correct reading"],rows:[["GCC High = cleared","Cloud support for CUI / gov workloads"],["CMMC L2 = FCL","CUI floor only"],["FedRAMP High = Secret ATO","Separate from DAAPM classified ATO"]]}]}
  },
  eaFrameworks:{
    note:"DCSA dual-track as an enterprise operating model. Use TOGAF/DoDAF language in the TDD crosswalk report; keep the phone view short.",
    conceptual:[
      {phase:"C1",t:"Sponsorship",items:["GCA or cleared prime initiates NISS.","No self-sponsor."]},
      {phase:"C2",t:"Dual-track lock",items:["FCL needs cleared KMPs.","PCL pipeline needs eligible facility context."]},
      {phase:"C3",t:"Adjacent floors",items:["CMMC = CUI cybersecurity.","Classified ATO = DAAPM/RMF."]}
    ],
    logical:[
      {phase:"L1",t:"Case systems",items:["NISS for FCL.","NBIS for PCL."]},
      {phase:"L2",t:"Adjudication",items:["SEAD 4 whole person.","Continuous vetting after grant."]},
      {phase:"L3",t:"IS authorization",items:["DAAPM overlays RMF.","eMASS hosts packages."]}
    ],
    physical:[
      {phase:"P1",t:"Forms and clocks",items:["Day 20 package artifacts.","Day 45 fingerprints."]},
      {phase:"P2",t:"Training",items:["STEPP courses IS140/IS142/CS250.","IS020.CU for non-possessing FSO."]},
      {phase:"P3",t:"FOCI artifacts",items:["SF 328 May 2025.","Mitigation instruments as schedule risk."]}
    ]
  },
  cut:{
    labels:["Title","Dual-track","Sponsorship","Day 20","Day 45","Package","SF 328 15%","SEAD 4","Tiers","Possessing","Three walls","DAAPM","CDSE map","Failure modes","Decision"],
    slides:[
      "assets/slides/slide-01.jpg","assets/slides/slide-02.jpg","assets/slides/slide-03.jpg","assets/slides/slide-04.jpg","assets/slides/slide-05.jpg",
      "assets/slides/slide-06.jpg","assets/slides/slide-07.jpg","assets/slides/slide-08.jpg","assets/slides/slide-09.jpg","assets/slides/slide-10.jpg",
      "assets/slides/slide-11.jpg","assets/slides/slide-12.jpg","assets/slides/slide-13.jpg","assets/slides/slide-14.jpg","assets/slides/slide-15.jpg"
    ],
    cards:[
      {question:"Who may sponsor an FCL?",detail:"GCA or cleared prime in NISS.",why:"Self-sponsor is the falsifier.",example:"Applicant company cannot open its own case."},
      {question:"What starts the Day 20/45 clocks?",detail:"Sponsorship welcome email = Day 1.",why:"Clock vs quality model.",example:"Incomplete package still burns calendar."},
      {question:"List five Day 20 package items.",detail:"Formation, ownership, DD 441, SF 328, KMP list.",why:"Package quality choke point.",example:"Missing beneficial owner → return."},
      {question:"What is due by Day 45?",detail:"KMP investigation requests + fingerprints.",why:"Dual-track hinge.",example:"Uncleared FSO blocks usable FCL."},
      {question:"SF 328 Q7b threshold after May 2025?",detail:"15% foreign proceeds (was 30%).",why:"Labs with international ties.",example:"Finance still modeling 30% is a tell."},
      {question:"SEAD 4 guideline count?",detail:"Thirteen; whole-person.",why:"Not a checklist.",example:"Candor + foreign influence read together."},
      {question:"Tier 3 vs Tier 5?",detail:"Secret/Confidential vs Top Secret depth.",why:"Investigation scoping.",example:"~5 years vs ~10 years + interviews."},
      {question:"Does non-possessing remove KMPs?",detail:"No.",why:"Access still needs cleared people and FSO program.",example:"Work at other sites; still dual-track."},
      {question:"Three walls in one breath?",detail:"CMMC floor · FCL · classified ATO.",why:"Support ≠ confer.",example:"GCC High ≠ Secret FCL."},
      {question:"Where does DAAPM sit?",detail:"Overlays NIST RMF for contractor classified IS.",why:"Third wall.",example:"eMASS package, not CMMC certificate."},
      {question:"IS140 vs IS142?",detail:"Facility vs personnel clearances on STEPP.",why:"CDSE map.",example:"New FSO starts both."},
      {question:"Name a critical failure mode.",detail:"Equating CMMC/cloud with FCL/ATO.",why:"Contract and accreditation risk.",example:"Slide that says 'we're cleared' after FedRAMP."},
      {question:"What AI hard-block?",detail:"No SF-86 or FOCI PII into consumer AI.",why:"Human FSO owns submissions.",example:"Chatbot paste of investigative data."},
      {question:"State the falsifier.",detail:"Self-sponsor or CMMC/GCC High/FedRAMP = FCL/Secret ATO.",why:"Mission exit.",example:"End-of-day teach-back kill line."}
    ],
    deepDive:{file:"",youtube:""}
  }
};

DATA.looks = {
  "1:0":"<pre>FCL track: GCA/prime → NISS → Day 20 package → Day 45 KMPs → FCL grant\nPCL track: need-to-know → SF-86/NBIS → investigation → SEAD 4 → eligibility\nHinge: KMP roster</pre>",
  "1:1":"<p><b>No self-sponsor.</b> Only a GCA or cleared prime opens NISS. The applicant company prepares the package; it does not sponsor itself [S2][S10].</p>",
  "2:0":"<table class='tbl'><thead><tr><th>Model</th><th>Failure</th></tr></thead><tbody><tr><td>Dual-track lock</td><td>Badge chase without FCL</td></tr><tr><td>Clock vs quality</td><td>Fast empty package</td></tr><tr><td>FOCI schedule risk</td><td>Ignoring 15% Q7b</td></tr><tr><td>Whole person</td><td>Checklist theater</td></tr><tr><td>Two walls</td><td>GCC High = Secret</td></tr></tbody></table>",
  "3:0":"<pre>Day 1  welcome email\nDay 20 formation · ownership · DD 441 · SF 328 · KMP list\nDay 45 KMP e-QIP + fingerprints</pre>",
  "5:0":"<p>SF 328 May 2025: Q7b foreign proceeds <b>15%</b> (was 30%). Form ~1 May; NISS ~12 May [S3][S4].</p>",
  "8:0":"<table class='tbl'><thead><tr><th>Wall</th><th>One line</th></tr></thead><tbody><tr><td>CMMC floor</td><td>CUI cybersecurity maturity</td></tr><tr><td>FCL</td><td>Facility eligibility under NISP</td></tr><tr><td>Classified ATO</td><td>DAAPM/RMF system authorization</td></tr></tbody></table><p class='flagnote'>Support ≠ confer.</p>",
  "11:0":"<ol><li>Plan dual-track under NISP (sponsor → package → KMPs).</li><li>Refuse self-sponsor and CMMC/cloud-as-clearance.</li><li>Measure package completeness before Day 20; re-model FOCI at 15%.</li></ol>"
};

DATA.watch = [
  {who:"Bennett (FSO talk)",title:"How to Get a Facility Clearance",url:"https://www.youtube.com/watch?v=Jf-SDX2WE8k",why:"Sponsorship, Day 20/45, KMP pitfalls. Ledger S10.",min:"~60 min"},
  {who:"DON OSBP",title:"Small Business Webinar — DCSA",url:"https://www.youtube.com/watch?v=Y5t5sV9GQy0",why:"Official-adjacent FCL roadmap. Ledger S11.",min:"webinar"},
  {who:"FOCI webinar",title:"FOCI and Supply Chain Risk Management",url:"https://www.youtube.com/watch?v=CrifvnX3o5M",why:"FOCI lifecycle and package quality. Ledger S12.",min:"webinar"}
];

DATA.books = [
  {kind:"Rule",title:"32 CFR Part 117 (NISPOM)",who:"eCFR",url:"https://www.ecfr.gov/current/title-32/subtitle-A/chapter-I/subchapter-D/part-117"},
  {kind:"Handbook",title:"DCSA FCL Orientation Handbook",who:"DCSA",url:"https://www.dcsa.mil/Portals/128/Documents/CTP/fc/DCSA%20FCL_Orientation_Handbook_20260828.pdf"},
  {kind:"Course",title:"IS140 Facility Clearances in the NISP",who:"CDSE",url:"https://www.cdse.edu/Training/eLearning/IS140/"},
  {kind:"Course",title:"IS142 Personnel Clearances in the NISP",who:"CDSE",url:"https://www.cdse.edu/Training/eLearning/IS142-resources/"},
  {kind:"Curriculum",title:"IS020.CU Non-Possessing FSO",who:"CDSE",url:"https://www.cdse.edu/Training/Curricula/IS020/"},
  {kind:"Manual",title:"DAAPM v2.2",who:"DCSA",url:"https://rmf.org/wp-content/uploads/2022/02/DCSA-Assessment-and-Authorization-Process-Manual-Version-2.2.pdf"}
];

DATA.packPages = [
  {slug:"odm-mission",t:"ODM mission"},
  {slug:"tdd-mission",t:"TDD mission"},
  {slug:"claims-debates",t:"Claims and debates"},
  {slug:"glossary",t:"Glossary"},
  {slug:"cheatsheet",t:"Cheatsheet"},
  {slug:"quiz-bank",t:"Quiz bank"},
  {slug:"source-ledger",t:"Source ledger"},
  {slug:"tdd-view-01-conceptual",t:"Conceptual view"},
  {slug:"tdd-view-02-logical",t:"Logical view"},
  {slug:"tdd-view-03-physical",t:"Physical view"},
  {slug:"tdd-view-04-integration-ai",t:"Integration and AI"},
  {slug:"nblm-odm-decision-packet",t:"ODM decision packet"},
  {slug:"nblm-tdd-decision-packet",t:"TDD decision packet"},
  {slug:"nblm-tdd-failure-modes",t:"Failure modes catalog"},
  {slug:"nblm-tdd-crosswalk",t:"EA crosswalk"}
];

DATA.fromReports = [
  {slug:"nblm-odm-mental-models",title:"Mental models",point:"Two walls: CMMC/GCC High support a CUI architecture; they do not confer FCL or Secret ATO."},
  {slug:"nblm-odm-decision-packet",title:"ODM decision packet",point:"Dual-track fluency is the success test: sponsorship rule, Day 20/45, SF 328 15%, falsifier kill."},
  {slug:"nblm-tdd-conceptual",title:"Conceptual report",point:"CMMC establishes a CUI cybersecurity floor, not an FCL."},
  {slug:"nblm-tdd-failure-modes",title:"Failure catalog",point:"Equating CUI/CMMC or cloud with FCL/ATO is a critical deployment failure mode."},
  {slug:"nblm-tdd-crosswalk",title:"EA crosswalk",point:"Architectural decision rule: SP 800-171/CMMC gives zero NISP facility eligibility."},
  {slug:"claims-debates",title:"Claims and debates",point:"~2/3 first-package return rate stays folklore until E1W. Teach documentation quality without inventing the fraction."},
  {slug:"tdd-view-04-integration-ai",title:"Integration and AI",point:"Default-deny SF-86 and FOCI PII into consumer AI; FSO owns submissions."},
  {slug:"cheatsheet",title:"Cheatsheet",point:"Four domains → IS140, IS142, CS250, CI toolkit; IS020.CU for non-possessing FSO."}
];

DATA.debateProblem = {
  practical:"Teams burn calendar on incomplete FCL packages, surprise FOCI mitigation, or confusing CMMC/cloud with an FCL — delaying classified lab work.",
  research:"Practitioner folklore (self-sponsorship, unverified return rates, 30% foreign-revenue habits) outruns current primaries (32 CFR 117, FCL handbook, SF 328 May 2025, CV policy).",
  soWhat:"One hour locking dual-track and the 15% SF 328 line prevents multi-month surprises for labs with international research ties."
};

DATA.debates = [
  {title:"Is documentation quality the dominant FCL failure mode?",src:"S2",
   idA:"E1A",idB:"E1B",idBoth:"E1W",kindA:"desk",kindB:"desk",kindBoth:"desk",
   statusA:"unrun",statusB:"unrun",statusBoth:"unrun",
   claimA:"Most first-pass FCL packages fail on completeness/accuracy of legal, ownership, DD 441, SF 328, and KMP materials under the Day-20 clock.",
   claimB:"KMP investigation/adjudication latency and FOCI mitigation dominate wall-clock once a package is good enough.",
   warrant:"If the process publishes hard early gates and limited retries on package completeness, then early-cycle documentation defects explain a large share of stops and rework.",
   assume:"Facilities have accurate ownership records; FOCI facts are knowable at Day 20; ISR workload is not the hidden bottleneck.",
   qualify:"Initial FCL packages under DCSA cognizance. FOCI-heavy structures may invert which delay dominates. Exact return-rate fraction is not in [S1]–[S14].",
   testA:"Quote current FCL Orientation Handbook language on resubmit attempts and discontinuation.",
   testB:"Collect published DCSA or Voice-of-Industry metrics on package return rates vs KMP investigation mean days.",
   testBoth:"Find a primary source stating the ~2/3 incomplete rate or falsifying it."},
  {title:"Does the May 2025 SF 328 15% threshold expand FOCI workload?",src:"S4",
   idA:"E2A",idB:"E2B",idBoth:"E2W",kindA:"desk",kindB:"desk",kindBoth:"lab-local",
   statusA:"unrun",statusB:"unrun",statusBoth:"unrun",
   claimA:"Lowering aggregate foreign proceeds disclosure from 30% to 15% will catch many labs with international partnerships that previously stayed silent on Q7.",
   claimB:"The revision mainly clarifies instructions; ownership/control questions already captured serious FOCI risk, so the threshold change is incremental.",
   warrant:"If disclosure thresholds define who must explain foreign economic ties, then cutting the threshold in half increases affirmative Q7 narratives DCSA must process.",
   assume:"Labs can measure foreign proceeds consistently; low-dollar partnerships still matter under other SF 328 questions.",
   qualify:"Mandatory for packages on/after 12 May 2025; older in-flight packages were not forced to rewrite solely for the form update.",
   testA:"Walk a fictional lab P&L/grant mix through Q7 at 30% vs 15%.",
   testB:"Compare law-firm alerts vs DCSA paper on whether ownership questions already forced the same narrative.",
   testBoth:"Interview an FSO (with human GO) on post-May-2025 package churn."},
  {title:"Whole-person SEAD 4 vs checklist clearance culture",src:"S6",
   idA:"E3A",idB:"E3B",idBoth:"E3W",kindA:"desk",kindB:"desk",kindBoth:"desk",
   statusA:"unrun",statusB:"unrun",statusBoth:"unrun",
   claimA:"Adjudication under SEAD 4 is a whole-person judgment across thirteen guidelines; SF-86 as pass/fail checklist produces brittle PCL outcomes.",
   claimB:"A small set of guidelines drive most adverse actions, so focused checklists plus automated continuous vetting deliver most security value.",
   warrant:"If eligibility must remain clearly consistent with national security across a multi-factor record, then reducing adjudication to a short checklist underfits the official standard.",
   assume:"FSOs can obtain accurate guidance; CV alerts are triaged with a whole-person lens.",
   qualify:"NISP contractor lane under DCSA. IC/SCI polygraph cultures vary.",
   testA:"Add SEAD 4 primary PDF to ledger and quote whole-person language.",
   testB:"Find official DCSA/ODNI stats on guideline prevalence.",
   testBoth:"Map SEAD 3 reporting duties vs CV automated checks for one vignette."}
];

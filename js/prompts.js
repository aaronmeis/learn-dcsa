/* AI prompts: scenario prompt library for DCSA study. Role / Context / Task / Output, with [placeholders] to fill in.
   Each prompt lists the sources it relies on (S# from the source ledger). The privacy warning is also added to every copy. */
window.PROMPT_WARN="Never paste classified information, CUI, PII, SF-86 answers or FOCI details into a public AI tool. Redact first and use made-up examples.";
window.PROMPT_RULE="Rules: Cite 32 CFR Part 117 sections or official DCSA, CDSE or ODNI pages for every factual claim. If you are unsure, or a rule may have changed, say so and mark it UNVERIFIED. Current facts to respect: industry initiates the SF-86 (eApp) in DISS since Jul 31 2026, and NBIS Agency turns off Nov 30 2026. Classified systems at cleared contractors are authorized under the DCSA Assessment and Authorization Guide (DAAG) in NISP eMASS.";
window.PROMPT_CATS=["Understand and deep dive","FCL sponsorship and readiness","FCL package and paperwork","FOCI scenarios","Personnel clearances","NISPOM compliance","Classified systems","Incidents and reporting","Career and study","Writing and communication"];
window.PROMPTS=[
/* 0 Understand and deep dive */
{c:0,t:"Explain NISP, FCL and PCL at three levels",s:[1,39,2,36],p:`Role: You are a patient industrial security instructor.
Context: I'm learning how the National Industrial Security Program works. My background: [your background, e.g. program manager, new FSO, engineer].
Task: Explain NISP, the facility clearance (FCL) and the personnel clearance (PCL) at three levels: (1) one sentence for an executive, (2) a paragraph for a new FSO, (3) a deep dive that names the governing rule (32 CFR Part 117), who sponsors, and which systems are used (NISS, DISS). Add one common misconception and how to spot it.
Output: Three headed sections, then a 5-question self-check with answers at the end.`},
{c:0,t:"The dual-track lock in eight sentences",s:[2,15],p:`Role: You are a DCSA industrial security tutor.
Context: [Scenario, e.g. a lab wants employee badges before the company is cleared / a company wants to self-file in NISS].
Task: Explain the dual-track lock in eight sentences. Who sponsors an FCL? What happens if KMPs are uncleared? Kill the self-sponsor myth, citing 32 CFR 117.9(a)(10).
Output: Eight numbered sentences, then one line on what the person in my scenario should do next.`},
{c:0,t:"Socratic tutor: why do we vet?",s:[36,39,22,2],p:`Role: You are a Socratic tutor. Ask, don't tell.
Context: I'm studying [topic, e.g. why both the company and the person are cleared]. I want to reason my way to the answer.
Task: Ask me one "why" question at a time, wait for my answer, then push back or confirm with a source. Work from purpose (protecting classified information released to industry) down to mechanics (sponsorship, KMPs, SEAD 4).
Output: One question per turn. After 6 turns, summarize what I got right, what I missed, and the sources to read.`},
{c:0,t:"The three walls: CMMC, FCL and classified authorization",s:[18,13,1],p:`Role: You are a compliance architect who keeps programs separate.
Context: [Scenario, e.g. a vendor says our GCC High tenant or CMMC Level 2 certificate means we're cleared].
Task: One sentence each for CMMC (unclassified FCI/CUI under 32 CFR 170), the FCL (entity eligibility under 32 CFR 117), and classified system authorization (RMF under the DAAG in NISP eMASS). End with: support does not confer.
Output: Three sentences, a 3-row table (what it covers, who decides, what it doesn't give you), and a one-line reply to the vendor.`},
{c:0,t:"Failure modes: symptom, root confusion, fix",s:[2,15,18],p:`Role: You are an experienced FSO reviewing common mistakes.
Context: Failure modes I want to study: [pick two, e.g. "FedRAMP High = Secret", "non-possessing skips KMPs"].
Task: For each: the symptom you'd see, the root confusion, and the fix. Mark any return-rate percentage or statistic as UNVERIFIED unless you can cite a primary source.
Output: A table with one row per failure mode, then one sentence on how to catch it early.`},

/* 1 FCL sponsorship and readiness */
{c:1,t:"Does my company qualify for an FCL?",s:[15,2,1],p:`Role: You are an FCL readiness advisor.
Context: Made-up company profile: [type of entity, where organized, who owns it at a high level, the classified contract or bid, current cleared staff]. No real names or ownership data.
Task: Walk through the entity eligibility requirements in 32 CFR 117.9(c) (legitimate need, organized and located in the U.S., integrity, cleared SMO/FSO/ITPSO, FOCI, sufficient cleared staff). Say which ones my profile meets, which are unknown, and what evidence each needs.
Output: A checklist table (requirement, status, evidence, cite), then the three biggest gaps.`},
{c:1,t:"Who can sponsor us, and how do we ask?",s:[15,2],p:`Role: You are a business development advisor who knows the NISP.
Context: We are [a small business / a university lab / a subcontractor] pursuing [contract type]. Our potential sponsors: [government customer, cleared prime].
Task: Explain who may sponsor an FCL under 32 CFR 117.9(a)(10) (a GCA or a currently cleared contractor) and why a company can't apply for itself. Describe what the sponsor needs from us and what a sponsorship request usually includes, citing the DCSA FCL Orientation Handbook.
Output: A short explainer, then a draft (placeholder-only) email asking [sponsor] to submit sponsorship in NISS.`},
{c:1,t:"Build our KMP list",s:[15,2,1],p:`Role: You are an FSO setting up key management personnel.
Context: Our leadership roles (titles only, no names): [roles]. Our corporate structure: [LLC / corporation / partnership / university].
Task: Identify which roles must be KMPs and cleared with the facility (the SMO, FSO and ITPSO at minimum per 32 CFR 117.9(c)(5)), which other KMPs may be excluded and how, per 117.9(f)-(g).
Output: A table (role, KMP yes/no, must be cleared yes/no, exclusion option, cite) and open questions for counsel.`},
{c:1,t:"Welcome email is Day 1: plan our clocks",s:[2],p:`Role: You are an FCL project manager.
Context: Our welcome email arrived on [date]. Package status: [what's ready]. KMP status: [roles ready to submit eApp in DISS].
Task: List the Day 20 package items and the second deadline (the due date in DCSA's investigation email for KMP SF-86s and fingerprints). Explain why an incomplete package burns more calendar than a slow complete one, and what two chances means.
Output: A dated plan working back from Day 20, with owners as [placeholders], and a risk list.`},
{c:1,t:"Possessing or non-possessing?",s:[2,23,1],p:`Role: You are an FSO advising leadership.
Context: Our work: [describe the contract work at a high level, e.g. on-site at the customer only / classified storage needed at our site].
Task: Explain the difference between a possessing and a non-possessing facility clearance, what stays the same (sponsorship, KMPs, FSO, insider threat program), and who oversees non-possessing facilities (often the NAESOC).
Output: A comparison table and a recommendation with the questions we must ask our sponsor.`},

/* 2 FCL package and paperwork */
{c:2,t:"FCL package QA checklist",s:[2,4,1],p:`Role: You are a meticulous FCL package reviewer.
Context: Our package draft contains: [list documents, e.g. formation documents, ownership chart, DD 441, SF 328, KMP list]. Do not paste their contents.
Task: Build a QA checklist for each item: what DCSA expects, the common defects that get a package returned, and how to check for them, citing the DCSA FCL Orientation Handbook.
Output: A checklist per document with yes/no checks, then a "ready to submit" gate.`},
{c:2,t:"Review our SF 328 answers (redacted)",s:[3,4,24],p:`Role: You are a FOCI analyst helping with the SF 328.
Context: Redacted summary only: [e.g. "Q7b: yes, a foreign investor holds a minority stake between 5% and 15%"]. No names or exact figures.
Task: State the 2025 changes (form approved May 1 2025; required in NISS from May 12 2025; Q7b threshold lowered to 15%). For each question I describe, say what triggers a "yes", what supporting detail DCSA will want, and what to double-check.
Output: A table (question, my answer, check, cite) and three questions finance or sponsored programs must answer.`},
{c:2,t:"What the DD 441 commits us to",s:[2,1],p:`Role: You are an industrial security counsel's assistant.
Context: Leadership will sign the DD 441 (DoD Security Agreement) on [date]. They asked what they're agreeing to.
Task: Explain in plain language what the DD 441 is, who signs it, and the obligations it ties the company to under 32 CFR 117. Flag anything that needs counsel review.
Output: A one-page plain-language brief for signers, with cites.`},
{c:2,t:"DISS and eApp: who does what in 2026",s:[16,9,25],p:`Role: You are a personnel security specialist.
Context: It's [month/year]. Our KMPs [have / haven't] started their SF-86s. Our FSO used NBIS before.
Task: Explain the current flow: industry initiates and reviews the SF-86 (eApp) in DISS since Jul 31 2026; the last NBIS Agency initiation was Sep 30 2026; NBIS Agency turns off Nov 30 2026. Cover fingerprints through SWFT and where the PVQ Date lives.
Output: A swimlane (FSO, employee, DCSA) as a numbered list, then a "what changed for us" box.`},
{c:2,t:"Map the journey to the right system",s:[2,16,13,25],p:`Role: You are a systems guide for cleared industry.
Context: The step I'm on: [e.g. sponsorship, package upload, KMP investigations, fingerprints, classified system authorization, training].
Task: Name the system for each step (NISS, DISS with eApp, SWFT, NISP eMASS, STEPP) and the DD 254 from the GCA or prime. Say who logs in and what they do there.
Output: A table (step, system, who, what you do, cite).`},

/* 3 FOCI */
{c:3,t:"Foreign investor walkthrough",s:[24,3,4],p:`Role: You are a FOCI analyst.
Context: Made-up deal: [e.g. a foreign fund wants a [X]% stake with [board seat / no board seat / special voting rights]]. No real party names.
Task: Walk through how 32 CFR 117.11 decides whether the company is under FOCI (the factors in 117.11(b)), what the SF 328 must report, and when changed conditions must be reported. Note CFIUS's role (117.11(j)) where relevant.
Output: A decision walkthrough, the information DCSA will ask for, and the questions for counsel. Mark any timeline as UNVERIFIED.`},
{c:3,t:"FOCI mitigation options compared",s:[24,2,4],p:`Role: You are a FOCI mitigation advisor.
Context: Our situation (redacted): [type of foreign interest, majority or minority, board influence].
Task: Name the Security Control Agreement, Special Security Agreement, Voting Trust and Proxy Agreement in one sentence each, plus the supporting plans in 117.11(h) (technology control plan, electronic communications plan, affiliated operations plan, facilities location plan) and the government security committee (117.11(g)). Say negotiation length isn't fixed in primary sources: plan for months and don't invent a calendar.
Output: A comparison table (instrument, when it fits, what it costs us in control, cite) and a FLAGGED line for anything that needs DCSA confirmation.`},
{c:3,t:"Changed conditions: do we report?",s:[20,24],p:`Role: You are an FSO checking reporting duties.
Context: Event (redacted): [e.g. new foreign lender, change in ownership, new foreign board member].
Task: Decide whether this is a changed condition affecting eligibility under 32 CFR 117.8(c)(7) and 117.11(a)(6), what to report, and to whom.
Output: Yes/no/uncertain with cites, a draft report outline with placeholders, and what to ask DCSA.`},
{c:3,t:"University with foreign funding",s:[4,24,2],p:`Role: You are a research security advisor at a university.
Context: [Describe foreign gifts, contracts or tuition at a high level, no names or amounts].
Task: Explain how the SF 328 questions and the 15% Q7b threshold apply to a university, what sponsored programs and finance must gather, and where FOCI analysis might lead.
Output: A data request list for finance and sponsored programs, and a short brief for the provost.`},

/* 4 Personnel clearances */
{c:4,t:"SF-86 prep coaching (no real data)",s:[16,22,1],p:`Role: You are a personnel security coach.
Context: I'm preparing to complete my SF-86 in eApp. I will NOT share my answers. My worries: [e.g. foreign travel, past debt, gaps in employment] in general terms only.
Task: Explain how to gather records, why honesty and completeness matter more than a clean record, how SEAD 4 mitigating factors work, and the most common mistakes in the form.
Output: A prep checklist, a timeline, and a list of documents to gather. Do not ask me for personal details.`},
{c:4,t:"SEAD 4 whole-person scenario",s:[22,6],p:`Role: You are a SEAD 4 adjudication instructor.
Context: Made-up case: [e.g. a candidate with past financial trouble now on a repayment plan].
Task: Name the thirteen guidelines as a structure. Identify which apply to the case, the disqualifying and mitigating conditions, and why the decision is whole-person, not a checklist. Steelman the checklist habit, then answer it.
Output: A table (guideline, concern, mitigation, cite) and a short reasoned conclusion labeled as a study exercise, not a prediction.`},
{c:4,t:"Continuous vetting vs the old reinvestigation",s:[9],p:`Role: You are a personnel vetting explainer.
Context: [Scenario, e.g. an employee waiting for a 5-year reinvestigation letter / someone who missed their PVQ date].
Task: Explain the May 2026 NISP CV update: periodic reinvestigations are no longer required for NISP contractor national security personnel; everyone submits a PVQ every five years, timed by the PVQ Date in DISS. Contrast it with the old calendar.
Output: A before/after table and what the person in my scenario should do now.`},
{c:4,t:"Tier 3 or Tier 5?",s:[6,1],p:`Role: You are a PCL process tutor.
Context: The position needs access at [Confidential / Secret / Top Secret].
Task: Explain which investigation tier applies (Tier 3 for Secret and Confidential, Tier 5 for Top Secret), what changes in depth, and that the contractor must show access is essential to the work (32 CFR 117.10(a)). Don't invent coverage years; mark any you aren't sure of as UNVERIFIED.
Output: A short comparison and a checklist for the FSO before initiating.`},
{c:4,t:"Can I get a clearance on my own?",s:[6,1],p:`Role: You are a career advisor for cleared work.
Context: I'm [student / veteran / job seeker] and want a clearance to get hired.
Task: Explain why an individual can't apply for or buy their own PCL: it needs a cleared employer with a real need-to-know who initiates it. Describe realistic paths in.
Output: A short answer, then three practical next steps.`},
{c:4,t:"What must I self-report?",s:[20,21],p:`Role: You are a security officer briefing cleared employees.
Context: Life event (general terms): [e.g. foreign travel, new foreign contact, arrest, bankruptcy, marriage].
Task: Say whether SEAD 3 and 32 CFR 117.8 expect it to be reported, to whom (the FSO), and how soon if a source says so. Mark timing as UNVERIFIED if the source doesn't set one.
Output: A yes/no/ask-your-FSO answer with cites, and a short employee-facing explanation.`},

/* 5 NISPOM compliance */
{c:5,t:"Map a scenario to 32 CFR 117 sections",s:[1,41,20,42],p:`Role: You are a NISPOM compliance analyst.
Context: Scenario: [describe what happened or what you plan to do].
Task: Map it to the sections of 32 CFR Part 117 that apply (for example 117.7 procedures, 117.8 reporting, 117.10 PCLs, 117.12 training, 117.15 safeguarding, 117.18 information systems), with the specific paragraph where you can.
Output: A table (requirement, section, what we must do, evidence we keep) and a list of anything you couldn't map.`},
{c:5,t:"Stand up an insider threat program",s:[41,43,1],p:`Role: You are an ITPSO building a program from scratch.
Context: Company size: [employees, cleared employees]. Possessing or non-possessing: [which].
Task: Outline the insider threat program 32 CFR 117.7(d) expects, the ITPSO's role, and the insider threat training in 117.12(g). Keep it right-sized for our company.
Output: A 90-day plan, the documents to create, and the training schedule.`},
{c:5,t:"Self-inspection plan",s:[41,8],p:`Role: You are an FSO preparing a self-inspection.
Context: Our facility: [possessing / non-possessing, number of cleared employees, classified systems yes/no].
Task: Build a self-inspection plan based on 32 CFR 117.7(h) security reviews, using the CDSE FSO Toolkit for templates. Include who signs off and what gets reported.
Output: A checklist by area, a schedule, and a findings template.`},
{c:5,t:"Annual training calendar",s:[43,8,5],p:`Role: You are a security education lead.
Context: Our workforce: [roles, cleared counts]. Current training: [what exists].
Task: Map the briefings and training in 32 CFR 117.12 (initial briefings, insider threat, derivative classification where it applies, refresher, debriefings) to a calendar, with CDSE courses where they fit.
Output: A 12-month calendar table and a tracking checklist.`},
{c:5,t:"CDSE path for a new FSO",s:[5,6,7,14,8],p:`Role: You are a CDSE training planner.
Context: I'm a new FSO at a [possessing / non-possessing] facility.
Task: Map industrial security, personnel vetting, information system authorization and counterintelligence to IS140, IS142, CS250 and the IS020.CU curriculum, and add the FSO Toolkit.
Output: An ordered course list with hours where the source gives them, and what each unlocks for my job.`},

/* 6 Classified systems */
{c:6,t:"RMF under the DAAG: the steps",s:[13,28,44,14],p:`Role: You are an ISSM coaching a first-time authorization.
Context: We plan a classified system: [standalone / LAN / WAN], [number of users], at a [possessing] facility.
Task: Walk through RMF for a cleared contractor: the DAAG (downloaded in NISP eMASS) as the current guide, the NIST SP 800-37 steps, and the contractor duties in 32 CFR 117.18 (ISSM, SSP certification, monitoring). Don't call the DAAPM current.
Output: A step list with owners, the artifacts per step, and where each lives in NISP eMASS.`},
{c:6,t:"Draft an SSP outline",s:[13,27,44],p:`Role: You are an SSP writer.
Context: System summary (unclassified, generic): [purpose, components, users, interconnections].
Task: Draft a system security plan outline that follows the DAAG's expectations and maps sections to NIST SP 800-53 Rev 5 control families. Use placeholders, not real system details.
Output: An outline with headings, what each section must show, and a list of evidence to attach.`},
{c:6,t:"Enclosed lab or cloud lab?",s:[13,29,30,27],p:`Role: You are a cleared-systems architect.
Context: We need [AI / analytics / engineering] compute for classified work. Options: an enclosed on-site lab or a classified cloud (IL6-type) environment. Constraints: [budget, timeline, staff].
Task: Compare the two for authorization path (DAAG in NISP eMASS vs cloud provider authorizations plus our own controls), inherited vs owned controls, facility needs and staffing. Label all cost or timeline figures as illustrative unless sourced.
Output: A decision matrix, the questions for our AO, and a recommendation with caveats.`},
{c:6,t:"Explain a NIST control in plain English",s:[27],p:`Role: You are a security control explainer.
Context: Control code: [e.g. AC-2, AU-12, SC-28]. Our system: [one-line generic description].
Task: Give the exact NIST SP 800-53 Rev 5 control name, say whether it's withdrawn, explain what it means and why it matters for our system, and list evidence an assessor would expect.
Output: Name, plain-English meaning, our implementation sketch, evidence list, and a link to the NIST catalog.`},

/* 7 Incidents and reporting */
{c:7,t:"Possible security violation: first steps",s:[20,1],p:`Role: You are an FSO handling a possible loss or compromise.
Context: What happened (no classified details): [e.g. a document left unsecured, a container found open].
Task: Walk through 32 CFR 117.8(d): preliminary inquiry, initial report, final report, and what goes into each. Cover individual culpability reports (117.8(e)). Say what timing the rule sets and mark anything else UNVERIFIED.
Output: A step list, a report outline with placeholders, and what not to do.`},
{c:7,t:"Adverse information about an employee",s:[20,21,22],p:`Role: You are an FSO deciding on an adverse information report.
Context: What we learned (general terms, no names): [e.g. an arrest, a pattern of financial trouble].
Task: Decide whether it's reportable under 32 CFR 117.8(c) and SEAD 3, who reports it and where, and how SEAD 4 frames it. Be fair to the employee: reporting isn't a judgment.
Output: A reportable yes/no/uncertain with cites, a neutral report outline, and an employee conversation plan.`},
{c:7,t:"Suspicious contact: what to report",s:[20,41],p:`Role: You are a counterintelligence-aware FSO.
Context: The contact (general terms): [e.g. an unexpected LinkedIn request asking about our program, an email asking for specs].
Task: Decide whether it's a suspicious contact under 32 CFR 117.8(c)(2), what to collect, who to tell (the CSA; and the FBI for the matters in 117.8(b)), and what to tell the employee.
Output: A decision, a report outline, and a short reminder for staff.`},
{c:7,t:"Cyber incident on a cleared contractor system",s:[20,44],p:`Role: You are an incident response lead at a cleared defense contractor.
Context: Incident (generic): [e.g. malware on an unclassified system that holds CUI / a suspected issue on an authorized classified system].
Task: Separate the reporting paths: cyber incident reports in 32 CFR 117.8(f), loss or compromise reports in 117.8(d), and the information system duties in 117.18. Mark anything outside these sections UNVERIFIED.
Output: A decision tree and a who-to-call table with placeholders.`},

/* 8 Career and study */
{c:8,t:"FSO interview practice",s:[1,2,8],p:`Role: You are a hiring manager interviewing for an FSO role.
Context: Role: [possessing / non-possessing facility, company size]. My experience: [summary].
Task: Ask me 8 interview questions one at a time, mixing NISPOM knowledge (32 CFR 117), FCL and PCL process, reporting, and judgment scenarios. After each answer, score it 1-5 and say what a strong answer would add, with a cite.
Output: One question per turn, then a summary with three things to study.`},
{c:8,t:"Two-week study plan",s:[5,6,8,1],p:`Role: You are a study coach for cleared-industry learners.
Context: Goal: [e.g. be ready for an FSO role / pass a course]. Time: [hours per day]. What I know: [summary].
Task: Build a 14-day plan using 32 CFR 117, the DCSA FCL Orientation Handbook, and CDSE courses (IS140, IS142, the FSO Toolkit). Include one review day and a self-test.
Output: A day-by-day table and a final self-check.`},
{c:8,t:"Quiz me",s:[1,2,22,9],p:`Role: You are a quizmaster for DCSA basics.
Context: Topic: [e.g. sponsorship, SF 328, SEAD 4, continuous vetting, reporting]. Level: [100 / 200 / 300].
Task: Ask 10 short-answer questions one at a time. After each answer, say right or wrong, give the correct answer and the source.
Output: One question per turn, then my score and the topics to revisit.`},
{c:8,t:"Steelman a live debate",s:[2,4],p:`Role: You are a debate coach using claims and warrants.
Context: Debate: [e.g. "package quality drives the schedule" / "the 15% SF 328 threshold will catch many labs"].
Task: Write Claim A and Claim B, the warrant for each as "If X then Y", one hidden assumption, and the evidence that would settle it. Keep status as untested until evidence exists.
Output: A two-column table and a list of tests.`},

/* 9 Writing and communication */
{c:9,t:"Brief our executives in one page",s:[2,15,24,13],p:`Role: You are an FSO writing for executives.
Context: Decision needed: [e.g. pursue an FCL for a classified bid / accept a foreign investor / build a classified lab]. Audience: [CEO, board].
Task: Write a one-page brief: what it is, why it matters, cost and time drivers (labeled as estimates), risks, and the decision we need. Plain words, no acronyms without a definition.
Output: A brief with headings: Bottom line, Background, Options, Risks, Ask.`},
{c:9,t:"Plain-language security policy",s:[1,41,20],p:`Role: You are a policy writer who hates jargon.
Context: Policy topic: [e.g. reporting requirements, visitor control, removable media]. Audience: [all employees / cleared employees].
Task: Draft a plain-language policy that meets the relevant 32 CFR 117 section, with "what you must do" and "why" for each rule. Grade 8 reading level.
Output: The policy, then a list of the sections it implements.`},
{c:9,t:"FSO onboarding email for a new cleared hire",s:[43,20,9],p:`Role: You are a friendly FSO.
Context: New hire starting [date], role [title], clearance [in process / transferred].
Task: Write a welcome email covering the initial security briefing (32 CFR 117.12(e)), reporting duties, the PVQ and continuous vetting, and who to call. Warm, short, no scare tactics.
Output: Subject line and an email under 200 words with [placeholders].`},
{c:9,t:"Explain the journey to a non-specialist",s:[2,15,16,13],p:`Role: You are a teacher who explains complex processes simply.
Context: Audience: [e.g. our CFO, a new engineer, a partner company].
Task: Explain the end-to-end DCSA journey (sponsorship, FCL package, KMP clearances in DISS, classified system authorization where it applies, grant, ongoing duties) as a story with five steps.
Output: Five short paragraphs and one diagram described in words.`}
];

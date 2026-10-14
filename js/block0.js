/* Block 0: Introductory basics. Interactive history timeline, who DCSA serves, plain-language NISP/FCL/PCL,
   Socratic "why do we do this?" questions with guided answers, a site map and a mini self-check.
   Facts cite primary sources S1, S2, S9, S15, S16, S36-S40. Verbatim quotes are from S36 and S39. */
window.BLOCK0={
  history:[
    {y:"1971",t:"Defense Investigative Service (DIS)",d:"The Secretary of Defense set up DIS on Dec 29 1971. It started on Jan 1 1972 and ran DoD personnel investigations. [S37]"},
    {y:"1980",t:"Industrial security joins DIS",d:"The Industrial Security Program moved to DIS from the Defense Logistics Agency, so people and company security sat in one agency. [S37]"},
    {y:"1993",t:"NISP created",d:"EO 12829 created the National Industrial Security Program in January 1993. DIS finished the draft NISPOM that October, and it took effect in April 1995. [S37][S39]"},
    {y:"1999",t:"DIS becomes DSS",d:"DIS was reorganized as the Defense Security Service. [S37]"},
    {y:"2005",t:"Investigations move to OPM",d:"On Feb 20 2005 personnel security investigations, including industry's, moved from DSS to OPM. [S37]"},
    {y:"2016",t:"NBIB set up under OPM",d:"The National Background Investigations Bureau did about 95% of federal background investigations. [S37]"},
    {y:"2019",t:"DSS becomes DCSA",d:"EO 13869 (Apr 24 2019) directed the rename of DSS to DCSA and made DCSA the primary federal background investigation provider [S38]. NBIB moved in effective Oct 1 2019 [S37], and the DoD CAF transfer completed the same day [S40]."},
    {y:"2020",t:"More functions join",d:"Select DISA and DMDC functions were directed to move to DCSA by Oct 1 2020 [S40]. The National Center for Credibility Assessment also transferred in 2020 [S37]."},
    {y:"2026",t:"eApp cases start in DISS",d:"Industry starts and reviews eApp cases in DISS from Jul 31 2026, and NBIS Agency turns off Nov 30 2026. [S16]"}],
  serves:[["Government","DCSA says it supports over 100 federal entities and runs background investigations for 105 departments and agencies. [S36]"],["Industry","It oversees cleared companies under the NISP, checking that they protect their facilities, people and IT systems. [S36]"],["Individuals","This is our framing rather than a DCSA category. People being vetted, and the FSOs who file for them, deal with DCSA through eApp in DISS, fingerprints and continuous vetting. [S16][S9]"]],
  plain:[["NISP","The program that lets the government share classified information with contractors, licensees and grantees, as long as they protect it \"in a manner equivalent to its protection within the executive branch.\" The rulebook is the NISPOM, 32 CFR Part 117. [S39][S1]"],["FCL","The company's eligibility. A government contracting activity or a currently cleared contractor has to sponsor it. A company can't sponsor itself. [S15]"],["PCL","One person's eligibility. It starts with the SF-86, which industry now starts in eApp in DISS. [S16]"],["Why both?","The company's key managers must be cleared for the FCL, and people are processed through a cleared company. We call this the \"dual-track lock\". The name is our shorthand, and the rule comes from the handbook. [S2]"]],
  socratic:[
    {q:"Why would the government let private companies hold secrets?",a:"Because it buys a lot of its work from them. EO 12829 says the government issues contracts, licenses and grants to private organizations \"to promote our national interests,\" and when that work needs classified information, the information must be protected as well as it would be inside government. The deal is access in exchange for following the rules. [S39]"},
    {q:"What's the risk if it didn't vet people?",a:"Classified information goes to people nobody has checked. DCSA's counterintelligence mission exists to \"identify and stop attempts by our nation's adversaries to steal sensitive national security information and technologies,\" and an unvetted insider is the easy way in [S36]. Vetting isn't one-and-done either: NISP contractor personnel now submit a PVQ every five years under continuous vetting [S9]. Push further: what would you give up if vetting got faster but shallower?"},
    {q:"Why clear both the company and the person?",a:"They protect different things. The FCL says the organization can safeguard classified work, with a security program, cleared managers and an FSO. The PCL says this person can be trusted with it. Each check covers a gap the other can't see. [S2][S1]"}],
  flags:["The exact day the DCSA name took effect in 2019. EO 13869 directs the rename, but the effective date isn't confirmed here.","DCSA's scale figures (95%, 70%, 12,500 facilities) are DCSA's own published numbers. Recheck them before quoting."]
};
function block0HTML(){const B=BLOCK0,yi=Math.min(+LS.get(KEY+"b0y",B.history.length-3),B.history.length-1),h=B.history[yi];
  const ci=x=>typeof chipsInline==="function"?chipsInline(x):ec(x);
  return `<div class="b0">
  <h4>Where DCSA came from</h4>
  <div class="b0-tl" role="tablist" aria-label="DCSA history timeline">${B.history.map((x,i)=>`<button type="button" role="tab" aria-selected="${i===yi}" class="b0-y ${i===yi?"on":""}" data-b0y="${i}">${x.y}</button>`).join("")}</div>
  <div class="b0-card" role="tabpanel" aria-live="polite"><b>${esc(h.y)} · ${esc(h.t)}</b><p>${ci(h.d)}</p>
   <div class="b0-nav"><button type="button" class="b" data-b0step="-1" ${yi===0?"disabled":""}>← Earlier</button><button type="button" class="b" data-b0step="1" ${yi===B.history.length-1?"disabled":""}>Later →</button></div></div>
  <p class="ax-note">So what? Investigations, adjudication and company oversight used to sit in different places. Since 2019 they sit in one agency.</p>
  <h4>Who DCSA serves</h4><div class="b0-grid">${B.serves.map(s=>`<div class="b0-tile"><b>${s[0]}</b><p>${ci(s[1])}</p></div>`).join("")}</div>
  <h4>NISP, FCL and PCL in plain language</h4><div class="b0-grid">${B.plain.map(s=>`<div class="b0-tile"><b>${s[0]}</b><p>${ci(s[1])}</p></div>`).join("")}</div>
  <p class="ax-note">Heads-up: the site uses a few labels of its own (dual-track lock, Five-Pack, Clock Theater, three walls). They're marked as our shorthand and aren't DCSA terms.</p>
  <h4>Why do we even do this?</h4><p>Answer each question yourself first, then open the guided answer.</p>
  ${B.socratic.map((s,i)=>`<details class="b0-q"><summary>${esc(s.q)}</summary><p>${ci(s.a)}</p></details>`).join("")}
  <details class="b0-q"><summary>Bonus, with no guided answer: who pays when a clearance takes too long?</summary><p>Keep it in mind for Block 3.</p></details>
  <h4>How this site is organized</h4>
  <ol class="b0-map"><li><b>Start here:</b> Block 0</li><li><b>One-day mastery track:</b> Blocks 1, 2, 3, 5, 4, 6, 7</li><li><b>Tech deep dive track:</b> Blocks 8 to 11</li><li><b>Current rules:</b> Block 14</li><li><b>Extension:</b> Block 12</li><li><b>Capstone:</b> Block 13, closed-book quiz</li></ol>
  <p class="ax-note">Practice anytime: <a href="#/flash">Flashcards</a> · <a href="#/quiz">Quiz</a> (section 0 is this block) · <a href="#/failures">Failure modes</a>. Reference: <a href="#/glossary">Glossary</a> · <a href="#/ea">EA mapping</a> · <a href="#/views">Architecture</a> · <a href="#/refs">Source ledger</a>.</p>
  <h4>Mini self-check</h4><div class="b0-check">${DATA.quiz.filter(q=>q.section===0).map((q,i)=>`<div class="b0-qa"><p><b>${i+1}.</b> ${esc(q.question)}</p><button type="button" class="b" data-b0a="${i}" aria-expanded="false" aria-controls="b0a${i}">Show answer</button><p id="b0a${i}" class="b0-ans" hidden>${ci(q.answer)}</p></div>`).join("")}</div>
  <div class="note"><b>Still to verify.</b> ${B.flags.map(esc).join(" ")}</div></div>`;}
function bindBlock0(el){
  const go0=i=>{LS.set(KEY+"b0y",i);renderCurriculum();$("#wb-0").classList.add("open");const b=$(`[data-b0y="${i}"]`);if(b)b.focus();};
  $$("[data-b0y]",el).forEach(b=>{b.onclick=()=>go0(+b.dataset.b0y);b.onkeydown=e=>{const i=+b.dataset.b0y;if(e.key==="ArrowRight"&&i<BLOCK0.history.length-1){e.preventDefault();go0(i+1);}if(e.key==="ArrowLeft"&&i>0){e.preventDefault();go0(i-1);}};});
  $$("[data-b0step]",el).forEach(b=>b.onclick=()=>{const i=Math.min(+LS.get(KEY+"b0y",BLOCK0.history.length-3),BLOCK0.history.length-1)+(+b.dataset.b0step);go0(Math.max(0,Math.min(BLOCK0.history.length-1,i)));});
  $$("[data-b0a]",el).forEach(b=>b.onclick=()=>{const p=$("#b0a"+b.dataset.b0a);p.hidden=!p.hidden;b.setAttribute("aria-expanded",!p.hidden);b.textContent=p.hidden?"Show answer":"Hide answer";});
  if(typeof bindSourceChips==="function") bindSourceChips(el);
}

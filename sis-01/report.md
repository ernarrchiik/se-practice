# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.(write here)

<!-- Exactly one of 1.1 … 1.10, e.g.  **Topic:** 1.4  -->


---

## 1. Scenario

<!-- 100–150 words, labels included. One small scenario, used in every prompt and in your
     whole answer. Anything fictional is labelled in Assumptions. -->

**Question:** (write here — the question of your topic, in your own words)

**Users:** (write here)

**Problem:** (write here)

**Constraints:** (write here — two constraints)

**Risk:** (write here — one important failure or misuse risk)

**Assumptions:** (write here — every fictional detail, labelled as fictional)

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->
     Does AI code generation always lower total system cost? No. AI tools reduce the cost of producing the first version, which course material identifies as the smallest part of the total bill. Over a long system life, maintenance costs 2-4 times as much as development, and writing code faster does not change that. Software engineering therefore treats cost across the whole life like requirements, design, implementation, testing, deployment and maintenance. The library currently tracks loans on paper, which is the real baseline. Paper has almost no development or hardware cost but offers no check on who borrowed which book or when it is due. A new system adds costs paper lacks building it, entering existing loans, training staff and maintaining it. It is justified only if its lifetime cost is outweighed by better records and fewer errors and no figures were supplied, so the comparison stays qualitative. Each engineering method targets a specific cost in a specific phase. Fixing how due dates are calculated before coding reduces rework later in implementation and testing. Keeping date and fine logic separate from the interface means a policy change touches one place, lowering future change cost. Testing the date and fine rules (testing phase) reduces the cost of incorrect fines and corrections after deployment. Readable, documented code targets maintenance directly, about 60% of maintenance effort goes on understanding code before changing it, so this addresses the largest share of lifetime cost, and it also meets the constraint that the IT staff member must maintain the system after the developer leaves. The argument is about how AI-generated code is used, not about AI itself. I assume unreviewed AI-generated code would not be understood by the IT staff member, raising the understanding cost. If the developer reviews, tests and documents it, that cost may be no higher than for hand-written code. A wrong date or a lost record can cause incorrect fines or unreturned books. A lost record is likely the more serious failure, since it may be unrecoverable, while a wrong fine can usually be corrected by staff like validation, backups and a transaction log address both. Planning and testing raise first-version cost but target the larger maintenance cost. Fast generation lowers only first-version cost, a simpler design suits the library's old computers but may offer fewer features. There is no cost-free option — the goal is spending effort where failure is most expensive.

(write here)

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

Prompt B's critique raised nine concerns. The most important was that my draft never gave a direct verdict on whether AI code generation "always" lowers total cost — it argued against the claim but never restated a clear position. I accepted this. The revised section 2 now opens with "No," grounded in course material.
I also accepted that each engineering method was listed without tracing which specific cost, in which phase, it reduces — a list of good practices rather than an argument. The revision now names the phase and cost for requirements, modularity, testing and documentation separately.
A more serious finding was that my "Facts" list stated "defects cost more to fix the later they are found" as established, while also listing it under claims to verify — a direct contradiction. I checked this against Lesson #01's "Software costs" slide myself, confirming the exact figures cited: maintenance costs 2-4x development over a system's life, and about 60% of maintenance effort is spent understanding code before changing it. I replaced the vague claim with these specific figures.
I also verified that the slide explicitly states AI tools reduce only "the cost of the first version — the smallest part of the total bill", which gave the "not always" verdict a cited basis instead of an assertion.
I rejected deepening the risk-proportionality argument into a full cost-weighted comparison — my scenario's word budget does not support it, so only one sentence distinguishing the two failure modes' likely severity was added, a judgment call rather than a correction. I accepted using the scenario's paper-baseline detail to ground "total cost," since cost claims need a comparison point the original draft lacked.

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

For this library, AI-assisted code generation is useful for the first working version but does not by itself lower total cost, because maintenance — not development — is the larger and more durable share of lifetime cost. The recommendation is to let AI produce a first draft, then invest deliberately in requirements clarity, modular separation of date and fine logic, testing of those rules, and documentation, since these target maintenance and understanding cost directly rather than development speed.
The main limitation is that this recommendation rests on a general course figure that was not verified as applying specifically to a small, single-purpose system like this one, and no real cost data for this library or its current paper process was available, so the comparison against the paper baseline remains qualitative rather than quantified

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

Running the critique in a new chat, not the one that wrote the draft, mattered more than I expected — when I reread the original draft, it looked fine, but a separate review found real contradictions I had not noticed, like calling something a "fact" while also listing it as a claim to verify. The most useful change was replacing a vague claim with an actual figure from the course slide (2-4x maintenance cost, 60% of effort spent understanding code). A specific number is something I can defend; a vague claim is not — I could not have said how much more expensive late defects are before checking the source myself.
What I learned is that an AI draft and an AI critique of that draft are both claims, not evidence — the critique even said this about its own feedback. I had to open the actual PDF slide myself to confirm the exact numbers before I could cite them with confidence, rather than trusting either chat's memory of "a course slide." Writing the five initial points before using AI also made it easier to see which of the AI's later additions were genuinely new versus restating my own ideas back to me.

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

 I-Driven Software Engineering, Lesson #01 — "Professional software development," slide "Software costs."

## 7. Appendix A — Initial outline

<!-- Written BEFORE you run Prompt A. Five points, your own words, numbered. These are the
     "five points" you paste into Prompt A. -->

1. Clarifying and checking requirements early prevents the errors while fixing the error late can cost many time
2. Cleaning up old code and using tested libraries keeps future changes cheap
3. When we break the system into small parts and each one does one job we can change or fix this part without touching the other ones
4. If other people or tools will check the code for bugs before the software of system released and in the future will be less fixing
5. Testing the code often helps us find bugs early, when they are cheap to fix

## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the fenced block that follows its label. If a response itself contains ``` lines, open
     and close that block with ~~~~ instead. You may add B4, B5 … after B3 if you ran more. -->

### B1 — Draft (Prompt A)

**Tool:** Claude Free
- **Model:** Sonnet 5.5
- **Date:** 2026-10-20
- **Purpose:** Generate a contextual first draft analyzing topic 1.3 against my scenario

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.3 | Software engineering and cost | Explain how engineering methods can reduce costs over a system's life. Challenge AI claims that faster code generation always means lower total cost for a first-year-level university assignment.

My scenario is **Users:** Staff of unversities library who check out and return physical books, **Constraints:** 1. The system must on library's computers without needing upgrade to high-quality and fast ones. 2. The IT staff member should be able to maintain the system when developer leaves, **Risk:** A book may be not returned or a student may be wrong fined if the system registers a incorrect date or loses records. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
# Software Engineering and Cost: Library Book Checkout System

## Explanation (approx. 460 words)

A common claim is that AI tools lower software cost because they generate code quickly. This confuses *development cost* with *total cost of ownership*. Software engineering treats cost across the whole system life: requirements, design, implementation, testing, deployment, maintenance and eventual replacement. Writing code is only one part of that, and in many systems maintenance and correction make up a large share of the total.

Consider a checkout and return system for university library staff. Imagine an AI tool produces a working prototype in an hour. The cost question is what happens afterwards.

**Engineering methods and lifetime cost.** Clear requirements prevent rework. For example, deciding early how due dates are calculated (calendar days, closing days, time zones) avoids rebuilding the date logic later. Modular design keeps the date and fine calculation separate from the user interface, so a policy change affects one place. Testing, especially of date and fine rules, finds defects while they are cheap to fix. Documentation and readable code serve your second constraint: an IT staff member who did not write the system must be able to maintain it. Code that nobody on the team understands is a hidden future cost, even if it was free to generate.

**Applying your constraints.** Because the library's computers are not being upgraded, you should favour a simple, lightweight design (for example, a small local database rather than a heavy framework). This is a design decision that avoids hardware costs. Because maintainability matters, choose a common language and standard tools that the IT staff can support, and keep the structure plain.

**Risk.** A wrong date or lost record can cause incorrect fines or unreturned books. That raises the value of validation, input checks, backups and an audit log of transactions. A failure here costs staff time, student complaints and possibly lost books, so spending effort on testing is justified.

**Trade-offs.** More up-front planning and testing slows initial delivery and costs more at the start. Fast generation saves time now but may produce code you do not fully understand, with subtle date bugs. Simpler designs run on old computers but may offer fewer features. There is no free option; the aim is to spend effort where failure is most expensive.

## Facts vs. Assumptions

**Facts (general, well-established ideas):**
- Software cost includes the whole lifecycle, not just coding.
- Defects usually cost more to fix the later they are found.
- Maintainability and testing are standard software engineering concerns.

**Assumptions (from your scenario, not confirmed):**
- Maintenance will dominate cost for this system.
- The library's computers are old enough to constrain design.
- The IT staff member has limited programming experience.
- Fine rules and loan periods are simple and stable.

## Claims to Verify

1. **"Maintenance is most of lifetime cost."** You will often see a specific percentage. Find it in your course textbook or lecture notes and cite the actual source rather than relying on me or on memory.
2. **"Later defects cost more to fix."** Check how your course states this, and whether the evidence applies to small projects like yours.
3. **"AI-generated code is lower quality or harder to maintain."** This is not established as universally true. Test it yourself: can you explain and modify the generated code?
4. **Hardware limits.** Confirm the actual specifications of the library's computers.
5. **Library policies.** Check real loan periods and fine rules with library staff.

I have not included quotations, references or page numbers. Add citations from your own course materials.

If you want, I can help you tighten this to exactly 400–500 words or draft a short test plan for the date and fine logic.
```

### B2 — Critique (Prompt B)

- **Tool:** Claude Free
- **Model:** Sonnet 5.5
- **Date:** 2026-10-20
- **Purpose:** critical review of the draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: Does AI code generation always lower total cost  and how software engineering methods reduce  system's cost? Scenario: **Users:** Staff of unversities library who check out and return physical books

**Problem:** At this time the library tracks loans on paper and they need a system to record and check who borrowed which book and when they need to return 

**Constraints:** 1. The system must on library's computers without needing upgrade to high-quality and fast ones. 2. The IT staff member should be able to maintain the system when developer leaves

**Risk:** A book may be not returned or a student may be wrong fined if the system registers a incorrect date or loses records. Draft: # Software Engineering and Cost: Library Book Checkout System

## Explanation (approx. 460 words)

A common claim is that AI tools lower software cost because they generate code quickly. This confuses *development cost* with *total cost of ownership*. Software engineering treats cost across the whole system life: requirements, design, implementation, testing, deployment, maintenance and eventual replacement. Writing code is only one part of that, and in many systems maintenance and correction make up a large share of the total.

Consider a checkout and return system for university library staff. Imagine an AI tool produces a working prototype in an hour. The cost question is what happens afterwards.

**Engineering methods and lifetime cost.** Clear requirements prevent rework. For example, deciding early how due dates are calculated (calendar days, closing days, time zones) avoids rebuilding the date logic later. Modular design keeps the date and fine calculation separate from the user interface, so a policy change affects one place. Testing, especially of date and fine rules, finds defects while they are cheap to fix. Documentation and readable code serve your second constraint: an IT staff member who did not write the system must be able to maintain it. Code that nobody on the team understands is a hidden future cost, even if it was free to generate.

**Applying your constraints.** Because the library's computers are not being upgraded, you should favour a simple, lightweight design (for example, a small local database rather than a heavy framework). This is a design decision that avoids hardware costs. Because maintainability matters, choose a common language and standard tools that the IT staff can support, and keep the structure plain.

**Risk.** A wrong date or lost record can cause incorrect fines or unreturned books. That raises the value of validation, input checks, backups and an audit log of transactions. A failure here costs staff time, student complaints and possibly lost books, so spending effort on testing is justified.

**Trade-offs.** More up-front planning and testing slows initial delivery and costs more at the start. Fast generation saves time now but may produce code you do not fully understand, with subtle date bugs. Simpler designs run on old computers but may offer fewer features. There is no free option; the aim is to spend effort where failure is most expensive.

## Facts vs. Assumptions

**Facts (general, well-established ideas):**
- Software cost includes the whole lifecycle, not just coding.
- Defects usually cost more to fix the later they are found.
- Maintainability and testing are standard software engineering concerns.

**Assumptions (from your scenario, not confirmed):**
- Maintenance will dominate cost for this system.
- The library's computers are old enough to constrain design.
- The IT staff member has limited programming experience.
- Fine rules and loan periods are simple and stable.

## Claims to Verify

1. **"Maintenance is most of lifetime cost."** You will often see a specific percentage. Find it in your course textbook or lecture notes and cite the actual source rather than relying on me or on memory.
2. **"Later defects cost more to fix."** Check how your course states this, and whether the evidence applies to small projects like yours.
3. **"AI-generated code is lower quality or harder to maintain."** This is not established as universally true. Test it yourself: can you explain and modify the generated code?
4. **Hardware limits.** Confirm the actual specifications of the library's computers.
5. **Library policies.** Check real loan periods and fine rules with library staff.

I have not included quotations, references or page numbers. Add citations from your own course materials.

If you want, I can help you tighten this to exactly 400–500 words or draft a short test plan for the date and fine logic.

```

**Response:**

```text
# Review of the Draft

The draft's overall direction is sound, but several problems would weaken it as an assessed answer. I've grouped them by type and ordered them roughly by importance.

## 1. The draft doesn't answer the question you chose

**Concern:** Your question has two parts: (a) does AI code generation *always* lower total cost, and (b) how do engineering methods reduce cost over a system's life? The draft rebuts "AI always lowers cost" in its first paragraph, then mostly stops engaging with AI. Part (a) is never given a clear verdict. Nothing says "No, not always, because..." and then tests that verdict against the scenario.

**Why it matters:** An assessor will look for a direct answer to the stated question. A reader should not have to infer your position.

**How to check:** Read only your first and last sentences. Do they state and restate a position on "always"?

**Counterexample / alternative:** AI generation can lower total cost in some cases: boilerplate, test scaffolding, a throwaway prototype, or a developer who reviews every line. A stronger answer says "not always, and here are the conditions under which it does and does not," rather than treating AI as simply a risk.

## 2. Part (b) lists methods without tracing cost mechanisms

**Concern:** The draft says clear requirements "prevent rework" and testing "finds defects while they are cheap to fix." These are assertions. It never explains the mechanism by which each method reduces a specific cost over the system's life, or which phase's cost falls.

**Why it matters:** The topic is about cost reduction, so the reasoning link from method to cost is the core of the answer. Without it, the paragraph reads as a list of good practices.

**How to check:** For each method, try to complete the sentence "This method reduces [specific cost] in [specific phase] because [mechanism]." Any method you cannot complete this for is under-argued.

**Alternative interpretation:** Some methods increase cost without reducing it. Heavy documentation on a tiny system can cost more to maintain than it saves. The draft treats all methods as beneficial and ignores this.

## 3. The "Facts" section contains claims that are not safe facts

**Concern:** "Defects usually cost more to fix the later they are found" is presented as established fact. It is a widely taught idea, but its strength and applicability are debated, and evidence is mixed, particularly for small projects or iterative development. I'm flagging this from general knowledge, not from a source I can point you to, so verify it. The draft also lists it as a "Fact" and then separately lists it under "Claims to Verify," which is contradictory.

**Why it matters:** Labelling something a fact and a claim to verify at once undermines the facts/assumptions separation you were asked to make.

**How to check:** Look at how your course materials phrase this. Do they present it as a rule, a general tendency, or a finding with caveats?

**Counterexample:** In a small system with a short feedback loop, a defect found in use may be fixed in minutes, so "later is costlier" may barely apply.

## 4. Vague claims with no scope or measure

**Concern:** Several phrases are vague: "a large share of the total," "heavy framework," "subtle date bugs," "cheap to fix," "old enough to constrain design." None says how large, how heavy, or how old.

**Why it matters:** Vague claims cannot be tested, and an argument about *cost* should say something about what is being counted (money, staff hours, risk exposure).

**How to check:** Ask of each phrase, "What would I measure to confirm this?" If there is no answer, either define it or soften it.

**Alternative interpretation:** "Heavy" is relative. Many modern lightweight frameworks run fine on modest hardware, so "a small local database rather than a framework" may be a false choice.

## 5. Constraint reasoning is shallow and partly unsupported

**Concern:** The hardware constraint is addressed with one example (small local database), but the draft never explains why a heavier design would fail on the library's computers, and it never considers that the constraint might be fully met by almost any simple desktop program. The maintainability constraint ("common language and standard tools") assumes the IT staff member's skills without evidence.

**Why it matters:** Constraints are the most scenario-specific part of the question. Generic advice that would fit any system suggests the scenario was not really analysed.

**How to check:** Ask what would actually break if the design were heavier (memory, startup time, installation?), and what "maintain" concretely means here (fixing bugs, changing the fine rate, restoring from backup).

**Counterexample:** If the IT staff member can only edit configuration values, then a "common language" is less important than making loan periods and fine rates configurable without touching code.

## 6. The new problem statement is not used

**Concern:** Your scenario now states that the library currently tracks loans on paper. The draft ignores this. That fact opens several cost points: data migration from paper, staff retraining, a transition period running both systems, and the baseline cost of the paper process you are comparing against.

**Why it matters:** "Total cost" must be compared against something. Without the paper baseline, the draft cannot say whether the system lowers cost at all.

**How to check:** List costs that arise *only because* the library is moving from paper (entering existing loans, handling the changeover).

**Alternative interpretation:** For a very small library, the paper system might be cheaper overall, and the honest conclusion might be that a system is justified mainly by the risk reduction, not by cost savings.

## 7. The risk section stays generic

**Concern:** Validation, backups and audit logs are listed, but they are not tied to the two specific failure modes (incorrect date, lost records) or weighed against their own cost. The draft also treats unreturned books and wrong fines as equal-sized risks without comparing likelihood and impact.

**Why it matters:** A cost argument needs proportionality: how much effort is justified by how much expected loss?

**How to check:** For each mitigation, name which failure it addresses and roughly what it would cost to build and maintain.

**Counterexample:** A wrongly fined student can be corrected by staff in a minute if the audit log exists, so the real cost of that error might be low, while *lost records* may be far more serious. The two risks may deserve different effort.

## 8. Word count and format claims

**Concern:** The draft says "approx. 460 words," but the explanation section may not actually fall in the 400–500 range. Also, the draft addresses "you" directly ("your second constraint"), which is inappropriate in a submitted answer.

**Why it matters:** Meeting the stated length and register is part of the task.

**How to check:** Paste only the explanation section into a word counter and don't trust my estimate or the label.

## 9. Unsupported assumptions that carry the argument

**Concern:** Several assumptions are doing real work without being justified: that the prototype is generated in "an hour," that nobody understands AI-generated code, that the IT staff member has limited programming experience, and that fine rules are simple. The draft lists some as assumptions but not the one about AI code being poorly understood, which is in the main text.

**How to check:** For each, ask whether the argument still holds if the assumption is false.

**Alternative interpretation:** If the developer reviews and tests AI-generated code properly, the "hidden future cost" claim largely disappears. The argument should therefore be about *how* AI is used, not AI itself.

## Summary of what to look into next

The most important gaps are: giving a direct verdict on "always," tracing cost mechanisms for each method, using the paper-baseline detail, and removing the fact/claim contradiction. Since I haven't rewritten anything, tell me which concerns you agree with and I can help you work on them one at a time.
```

### B3 — Revision (Prompt C)

- **Tool:** Claude Free
- **Model:** Sonnet 5.5
- **Date:** 2026-10-21
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions:
1. Accepted: the draft never gave a direct verdict on whether AI code generation "always" lowers total cost. Revise to state clearly: not always — AI reduces only the cost of producing the first version, which course material shows is the smallest part of total system cost, while maintenance (2-4x development cost) is unaffected by how fast the code was written.
2. Accepted: engineering methods (requirements, testing, modularity) were listed without tracing which specific cost, in which phase, each one reduces. Revise each method to name the phase and the cost it affects.
3. Accepted: "defects cost more to fix the later they are found" was listed as both a Fact and a Claim to Verify — a contradiction. Revise using the verified evidence below: maintenance is 2-4x development cost over a system's life, and about 60% of maintenance effort is spent understanding code before changing it, not fixing it.
4. Accepted: the scenario's paper-baseline detail (the library currently tracks loans on paper) was never used to ground "total cost." Revise to compare the proposed system's cost against the paper process as the baseline.
5. Rejected: deepening the risk proportionality argument into a full cost-weighted comparison of both failure modes — my word budget for the scenario section does not support this; add only one sentence distinguishing their likely severity.
6. Accepted: the phrase "nobody understands AI-generated code" appeared as if certain, but was not listed as an assumption. Revise to mark it explicitly as an assumption, and reframe the argument as being about how AI-generated code is used (reviewed or not), not about AI itself.
7. Accepted: remove direct address to "you" ("your second constraint") — this is a submitted answer, not a conversation.

Verified evidence:
1. "AI-Driven Software Engineering, Lesson #01 — Professional software development, slide 'Software costs,' KBTU SITE, Fall 2026." The slide states: more than 50% of total system cost is software, not hardware; maintenance cost is 2-4x development cost over a long system life; about 60% of maintenance effort is spent understanding code before changing it. It also states explicitly: "AI tools reduce the cost of the first version — the smallest part of the total bill."
2. Use this to replace the vague "defects cost more later" claim with the specific 2-4x / ~60% figures, and to give the "not always" verdict a concrete, cited basis instead of an assertion.

Draft: Software Engineering and Cost: Library Book Checkout System
Explanation (approx. 460 words)
A common claim is that AI tools lower software cost because they generate code quickly. This confuses development cost with total cost of ownership. Software engineering treats cost across the whole system life: requirements, design, implementation, testing, deployment, maintenance and eventual replacement. Writing code is only one part of that, and in many systems maintenance and correction make up a large share of the total.
Consider a checkout and return system for university library staff. Imagine an AI tool produces a working prototype in an hour. The cost question is what happens afterwards.
Engineering methods and lifetime cost. Clear requirements prevent rework. For example, deciding early how due dates are calculated (calendar days, closing days, time zones) avoids rebuilding the date logic later. Modular design keeps the date and fine calculation separate from the user interface, so a policy change affects one place. Testing, especially of date and fine rules, finds defects while they are cheap to fix. Documentation and readable code serve your second constraint: an IT staff member who did not write the system must be able to maintain it. Code that nobody on the team understands is a hidden future cost, even if it was free to generate.
Applying your constraints. Because the library's computers are not being upgraded, you should favour a simple, lightweight design (for example, a small local database rather than a heavy framework). This is a design decision that avoids hardware costs. Because maintainability matters, choose a common language and standard tools that the IT staff can support, and keep the structure plain.
Risk. A wrong date or lost record can cause incorrect fines or unreturned books. That raises the value of validation, input checks, backups and an audit log of transactions. A failure here costs staff time, student complaints and possibly lost books, so spending effort on testing is justified.
Trade-offs. More up-front planning and testing slows initial delivery and costs more at the start. Fast generation saves time now but may produce code you do not fully understand, with subtle date bugs. Simpler designs run on old computers but may offer fewer features. There is no free option; the aim is to spend effort where failure is most expensive.
Facts (general, well-established ideas): Software cost includes the whole lifecycle, not just coding. Defects usually cost more to fix the later they are found. Maintainability and testing are standard software engineering concerns.
Assumptions (from your scenario, not confirmed): Maintenance will dominate cost for this system. The library's computers are old enough to constrain design. The IT staff member has limited programming experience. Fine rules and loan periods are simple and stable.

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```text
(paste here)# Revised Draft

## Software Engineering and Cost: Library Book Checkout System

**Explanation (approx. 470 words, please verify with a word counter)**

Does AI code generation always lower total system cost? No. AI tools reduce the cost of producing the first version, which the course material identifies as the smallest part of the total bill. Over a long system life, maintenance costs 2-4 times as much as development, and writing the code faster does not change that. Software engineering therefore treats cost across the whole life: requirements, design, implementation, testing, deployment, maintenance and replacement (Lesson #01, "Software costs" slide).

The library currently tracks loans on paper, so that process is the baseline. Paper has almost no development or hardware cost, but it offers no check on who borrowed which book and when it is due. A new system adds costs the paper process lacks: building it, entering existing paper loans, training staff and maintaining it. It is justified only if its lifetime cost, including these, is outweighed by better records and fewer errors. The sources supplied do not give figures for this library, so that comparison remains unquantified.

Each engineering method reduces a specific cost in a specific phase:

- **Requirements (early phase).** Fixing how due dates are calculated before coding reduces rework in implementation and testing.
- **Modular design (design and maintenance).** Keeping date and fine logic separate from the interface means a policy change touches one place, lowering later change cost.
- **Testing (testing phase).** Testing date and fine rules reduces the cost of incorrect fines and corrections after deployment.
- **Readable, documented code (maintenance).** About 60% of maintenance effort goes on understanding code before changing it, so this targets the largest part of that cost. It also serves the constraint that the IT staff member must be able to maintain the system after the developer leaves.

The argument concerns how AI-generated code is used, not AI itself. Assumption: AI-generated code that nobody reviews may not be understood by the IT staff member, raising the understanding cost above. If the developer reviews, tests and documents it, that cost may be no higher than for hand-written code.

Because the library computers will not be upgraded, a simple, lightweight design is preferable, since it avoids hardware cost. Plain structure and common tools also support maintainability.

A wrong date or lost record can cause incorrect fines or unreturned books. A lost record is probably the more serious failure, since it may be unrecoverable, while a wrong fine can likely be corrected by staff. Validation, backups and a transaction log address both.

**Trade-offs.** Planning and testing raise first-version cost but target the larger maintenance cost. Fast generation lowers first-version cost only. Simpler designs suit old computers but may offer fewer features.

**Facts (from the supplied course slide):** more than 50% of total system cost is software rather than hardware; maintenance costs 2-4 times development over a long life; about 60% of maintenance effort is spent understanding code; AI tools reduce the cost of the first version.

**Assumptions (not confirmed):** the 2-4x figure applies to this small system; the library's computers constrain design; the IT staff member has limited programming experience; fine rules and loan periods are simple and stable; unreviewed AI code would not be understood.

---

## What I changed and why

| # | Decision | Change |
|---|---|---|
| 1 | Verdict on "always" | Opens with "No," grounded in the slide's first-version point and the 2-4x maintenance figure. |
| 2 | Trace methods | Each method now names its phase and the cost it affects. |
| 3 | Fact/claim contradiction | Removed the "defects cost more later" claim; the Facts section now holds only slide-sourced statements. |
| 4 | Paper baseline | Added a paragraph comparing the system against the paper process. |
| 5 | Risk (rejected expansion) | One sentence on relative severity only. |
| 6 | AI-code assumption | Marked as an assumption and reframed around reviewed vs. unreviewed use. |
| 7 | Direct address | Removed all "you/your." |

## Remaining gaps

- **Possible overreach in point 1.** The slide says AI reduces first-version cost, "the smallest part of the total bill." I attributed the 2-4x and 60% figures to the same slide as you described, but I cannot see the slide myself. Please confirm the wording and that the figures apply to systems in general, not just large ones.
- **Maintenance vs. defect cost.** Replacing the "later defects cost more" claim means testing is now justified by risk and rework, not by that rule. The source does not directly support the rework claim for requirements, so treat it as reasoning, not evidence.
- **Paper baseline.** No cost data for the paper process or this library was supplied, so the comparison is qualitative.
- **Section 5 detail.** I kept the hardware reasoning brief; the sources say nothing about what would actually fail on the library's computers.
- **Citation.** I cited only the lesson and slide title you gave. Add any format your course requires.
- **Length.** I estimated the word count; check the final version.```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| "Defects usually cost more to fix the later they are found" | AI-Driven Software Engineering, Lesson #01, KBTU SITE, Fall 2026, slide 18, "Software costs" | The slide states maintenance cost is 2-4× development cost over a long system life, and about 60% of maintenance effort goes into understanding code before changing it — not into the fix itself | qualify |
| "AI-generated code is lower quality or harder to maintain" | AI-Driven Software Engineering, Lesson #01, KBTU SITE, Fall 2026, slide 18, "Software costs" | The slide states that AI tools reduce the cost of the first version — the smallest part of the total bill and >50% of total system cost is software, not hardware. It suports that generation speed affects only the smallest cost component, not maintenance, which is the larger one | keep |
### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| "Defects usually cost more to fix the later they are found" listed as a Fact, while also appearing under Claims to Verify | "Maintenance typically costs 2-4x development over a system's life, and most of that effort is spent understanding code before changing it — not writing the fix itself" | Lesson 01's "Software costs" slide gives a concrete figure that is more specific and defensible than the vague "later is costlier" claim, and resolves the fact contradiction the critique flagged |
| "An AI tool produces a working prototype in an hour... Cost question is what happens afterwards" | "AI tools shorten only the smallest part of the total bill — producing a first version — while maintenance, which is 2-4x the development cost, is unaffected by how fast the code was written" | Lesson 01 explicitly states generation speed affects "the smallest part of the total bill," giving a cited, specific basis for the draft's "not always" verdict instead of an unsupported assertion |git add -- sis-01/AI_USAGE.md sis-01/report.md sis-01/submission.yml
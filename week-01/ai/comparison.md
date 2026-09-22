# Week 01 — Manual vs AI: Comparison

**Name:Yernar Berenbay**
**Group:Monday 16:00-19:00**
**Date:22.09**

---

## 1. Facts

| | Manual (Part 1) | Rocket (Part 2) |
| --- | --- | --- |
| Language / stack used |English | |English
| Time to first version that ran |around 20-30 minutes | |15-20 minutes
| Time to all 4 test cases passing |45 minute | |25 minute
| Number of attempts / prompts needed | | |2 prompts
| Lines of code you actually wrote |60 | |0
| Did it handle invalid marks (case B)? |yes - range check | |Bulk Paste initially blocked the entire import on any invalid line, fixed via follow-up prompt to skip-and-report instead
| Did it handle an empty list (case D)? |yes — prints a message, does not crash | |yes — shows a clean "No student records yet"
| Did it use the ≥ 50 pass threshold? |yes, hardcoded | |yes, defaults to 50 but is also user-adjustable via a slider
| Output format matches the spec? |yes — Valid/Average/Highest/Lowest/Pass rate | |no — spec asked for a small program printing four values
| Can you explain every line of it? |Yes | |Not yet

## 2. Test results

| Case | Input | Manual output | Rocket output | Spec says | Match? |
| --- | --- | --- | --- | --- | --- |
| A | `85, 23, 45, 90, 92` |avg: 67.00 high: 92 low: 23 pass: 60.0% | avg 67.00 · high 92 · low 23 · pass 60.0%| avg 67.00 · high 92 · low 23 · pass 60.0% | |
| B | `88, 47, -5, 101, abc, 73, 50, , 100` |avg:71.60 high: 100 low: 47 pass: 80.0% |avg 71.60 · high 100 · low 47 · pass 80.0% | avg 71.60 · high 100 · low 47 · pass 80.0% | |
| C | `10, 20, 30` |avg:20.00 high:30 low: 10 pass: 0.0% | avg 20.00 · high 30 · low 10 · pass 0.0%| avg 20.00 · high 30 · low 10 · pass 0.0% | |
| D | `abc, , xyz` |"message, no crush" | Student name is required,Mark is required| clear message, no crash | |

## 3. What the AI added that I never asked for

A full Next.js + Tailwind web app instead of a minimal program (the spec said "a small program that prints" four values — Rocket built an interactive dashboard)
Grade distribution bar chart — not requested
An adjustable pass-mark slider  — the spec never mentioned a configurable threshold
Sortable/searchable results table with pagination
Bulk paste import, per-student delete, CSV export
A Name, Mark input format — not specified; the manual version only needed a list of numbers

## 4. What the AI got wrong or silently skipped

Bulk Paste import: if any single line in a pasted batch was invalid, the entire import was blocked — none of the valid entries got added. Input: mixed batch (Yernar, 85 / Akniyet, 101 / Miras, abc / Yersultan, 49). Expected: valid entries import, invalid ones are skipped . Actual: "No valid entries found. Please check your input" — nothing imported.
No clarifying questions were asked despite the prompt being intentionally vague — Rocket proceeded straight to a specific tech stack and feature set without checking assumptions with the user.

## 5. The defect I asked Rocket to fix

**Prompt I used:**
"In the Bulk Paste import, when some lines are invalid , don't block the entire import. Instead: import all valid lines normally, skip the invalid lines, and show a summary message listing which lines were skipped and why (e.g. 'Skipped line 2 (Akniyet): mark 101 is out of range 0-100. Skipped line 3 (Miras): 'abc' is not a valid number.'). The Import button should stay enabled and successfully add the valid students even if other lines have errors."
**Result:** (fixed / partly fixed / broke something else)
Fixed. Retested with the same mixed batch — Yernar and Yersultan were imported successfully (count went from 12 to 14 enrolled), and the app displayed: "2 lines skipped: Skipped line 2 (Akniyet): mark 101 is out of range 0–100. Skipped line 3 (Miras): 'abc' is not a valid number." No regressions observed — the existing 12 sample students, Single-entry validation, and dashboard stats all continued working correctly after the fix.
**What this tells me:**
Rocket's default error-handling was "reject-all-or-nothing," which is stricter and less useful than the manual C++ approach (skip bad entries, process the rest) — this had to be explicitly specified rather than being the tool's default assumption.
---

## 6. Reflection (200–300 words)

Answer all four, in your own words:

1. Which parts of the work did the AI genuinely speed up?
2. Where did the AI cost you time, or give you something that looked right but was not?
3. Which of these two artefacts would you be willing to put your name on, and why?
4. What must a human engineer still be responsible for after this experiment?

<!-- Write your reflection below this line -->
1.I did not write any code. The AI created a complete web page for me just from a prompt. Also, the AI worked much faster than I expected. I only needed to write a prompt and clarify a few things, and I got a fully working web page.
2.Yes, there were some moments when it took a lot of time. It especially took a long time to fix the page because it was difficult to explain exactly what the AI had misunderstood at the beginning. Even after making corrections, it might not give the result we wanted.
3.I would choose the manual method because you work on every detail yourself and get the program that you truly planned. AI might misunderstand you, or some parts of the result might not match your idea.
4.If a person uses AI, I think they should be responsible for the accuracy of their prompts because prompt accuracy plays an important role when working with AI.


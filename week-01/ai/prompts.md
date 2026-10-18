**First prompt**
Build a small program that processes a list of student marks and prints:
   average, highest, lowest, and pass rate.

**Clarifying questions**
No questions as you see in screen #1

**Rewritten/enhances prompt**
Building a student marks dashboard with Next.js — it'll accept a list of marks and instantly display the average, highest, lowest, and pass rate in a clean interface.

Rocket


Built MarksAnalyzer Web App
What I did

Built MarksAnalyzer with live stats: average, highest, lowest, and pass rate displayed as KPI cards
Added grade distribution bar chart, sortable/searchable student results table, and adjustable pass threshold control
Included bulk paste input, per-student delete, CSV export, and full pagination for the results table

**Fix prompt**

In the Bulk Paste import, when some lines are invalid (out of range or non-numeric mark), 
don't block the entire import. Instead: import all valid lines normally, skip the invalid 
lines, and show a summary message listing which lines were skipped and why...
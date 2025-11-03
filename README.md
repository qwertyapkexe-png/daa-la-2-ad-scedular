# Ad Slot Allocation (Greedy, Brute-force, DP)

This project demonstrates a hybrid approach for online ad slot allocation using:
- Greedy (bid/duration ratio)
- Brute-force (all subsets; exact on small inputs)
- Dynamic Programming (Weighted Interval Scheduling — maximizes profit without overlaps; ignores overall capacity)

Files created:
- `server.py` — Python/Flask server with `/api/allocate` endpoint (active)
- `public/index.html` — Frontend UI
- `public/style.css` — Styles
- `public/app.js` — Client logic
> Note: Node/Express files were removed; this project now runs with Python/Flask.

How to run (Windows, cmd.exe):
1. Open cmd and change to project folder:
   cd "d:\del code\colledge\DAA\LA2\222\websitee\main"
2. Install Python dependencies (recommended in a venv):
   pip install -r requirements.txt
3. Start the server (Windows cmd):
   python server.py
4. Open http://localhost:1893 in your browser.

Notes:
- Use small numbers of ads for the brute-force method (exponential).
- DP (Weighted Interval Scheduling) returns the best non-overlapping set but does not enforce a global time capacity; use brute-force to get exact solutions with capacity.

This implementation is intentionally small and easy to extend.

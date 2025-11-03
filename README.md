# 🖥️ Online Ad Slot Allocation
## 📘 Project Title
**Online Ad Slot Allocation**

**Team Members:**
- Purva Gattani (Roll No. 34, A6)  
- Jiya Vanjani (Roll No. 26, A6)  
- Diyansh Wasnik (Roll No. 23, A6)

**GitHub Repository:** (https://github.com/qwertyapkexe-png/daa-la-2.git)  
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


---

## 📘 Project Title
**Online Ad Slot Allocation**

---

## 🎯 Objective
The main goal of this project is to allocate online advertisement slots efficiently to maximize profit and prevent overlapping ads.  

### Key Objectives:
- To collect and organize ad requests with **start time**, **end time**, and **bid amount**.  
- To design an algorithm that allocates ads **without overlapping time slots**.  
- To use **Greedy** and **Knapsack (Dynamic Programming)** approaches for ad selection.  
- To compare algorithm performance and results.  
- To display inputs and outputs through a simple and interactive **Flask web interface**.  

---

## 🧠 Introduction
Online advertising platforms handle many ad requests, each with a start time, end time, and bid price.  
Efficient scheduling ensures that:
- No two ads run at the same time.
- The total profit from selected ads is maximized.

This project implements two algorithms:
1. **Greedy Algorithm (Activity Selection)** — for quick, efficient scheduling.
2. **Knapsack Algorithm (Dynamic Programming)** — for profit optimization under time constraints.

---

## ⚙️ Algorithm / Technique Used

### 🟢 Greedy Algorithm (Activity Selection)
**Steps:**
1. Sort all ad requests by **end time**.  
2. Start with an empty schedule.  
3. Select the first ad that doesn’t overlap with the previous one.  
4. Continue until all ads are processed.  
5. Output the selected ads and total profit.  

**Time Complexity:**  
- Sorting: `O(n log n)`  
- Checking Overlap: `O(n)`  
- **Total:** `O(n log n)`

---

### 🔵 Knapsack Algorithm (Dynamic Programming)
Used to select ads such that:
- The total duration ≤ maximum capacity (total available time).
- The total bid (profit) is maximized.

**Time Complexity:** `O(n × capacity)`  

---

## 🧩 Project Structure
```
.
├── app.py               # Flask backend with API routes
├── public/
│   ├── index.html       # Frontend UI
│   └── ...              # Other static files
├── requirements.txt     # Python dependencies
└── README.md            # Project documentation
```

---

## 🚀 How to Run the Project

### 1️⃣ Install Dependencies
Make sure Python and Flask are installed. Then run:
```bash
pip install flask
```

### 2️⃣ Run the Server
```bash
python app.py
```

The app will run on **http://localhost:1893/** (or your hosting port).

---

## 🔗 API Endpoints

### POST `/api/allocate`
Allocates ad slots using the selected method.

**Request Example:**
```json
{
  "method": "activity",
  "ads": [
    {"start": 1, "end": 3, "bid": 50},
    {"start": 2, "end": 5, "bid": 60},
    {"start": 4, "end": 6, "bid": 70}
  ],
  "capacity": 10
}
```

**Response Example:**
```json
{
  "schedule": [{"start": 1, "end": 3, "bid": 50}, {"start": 4, "end": 6, "bid": 70}],
  "totalProfit": 120,
  "totalTime": 4
}
```

**Methods Supported:**
- `"activity"` → Greedy Activity Selection  
- `"knapsack"` → Knapsack (Dynamic Programming)

---

## 🧾 Results
- The **Greedy algorithm** efficiently schedules non-overlapping ads.  
- The **Knapsack approach** achieves near-optimal profit for limited time slots.  
- Simple and interactive web UI displays both input and output clearly.

---

## 📈 Conclusion and Future Scope
**Conclusion:**  
- The Greedy and Knapsack algorithms help efficiently allocate ads without conflicts.  
- The system increases ad platform profit and ensures fair slot allocation.  

**Future Scope:**  
- Real-time ad request handling.  
- Integration with live bidding data.  
- Use of Machine Learning to predict optimal bid values.  

---

## 🧮 Example Input / Output

| Ad | Start | End | Bid | Selected |
|----|--------|-----|------|-----------|
| A1 | 1 | 3 | 50 | ✅ |
| A2 | 2 | 5 | 60 | ❌ |
| A3 | 4 | 6 | 70 | ✅ |

**Total Profit:** 120  
**Total Time:** 4  



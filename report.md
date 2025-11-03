# Online Ad Slot Allocation using Greedy, Kruskal’s, and Knapsack Techniques

## Team Members

- Purva Gattani – Roll No. 34 – Section A6
- Jiya Vanjani – Roll No. 26 – Section A6
- Diyansh Wasnik – Roll No. 23 – Section A6

## Abstract

Online advertising platforms must efficiently allocate limited ad display slots among many advertisers. Each ad has a start time, end time, and a bid amount, representing the advertiser’s willingness to pay. The goal is to maximize total revenue while ensuring that no two ads overlap in the same time period.

This project presents a hybrid approach combining Greedy Algorithm, Kruskal’s non-conflicting selection principle, and Knapsack optimization logic to achieve efficient ad allocation. The greedy strategy helps prioritize high-value bids, Kruskal’s principle ensures non-overlapping slot selection, and the Knapsack analogy maintains maximum profit within total time capacity.

## Objectives

- To collect and organize ad requests with start time, end time, and bid amount.
- To design an algorithm that schedules ads without overlap to maximize revenue.
- To apply Greedy selection inspired by Kruskal’s Algorithm for conflict-free allocation.
- To use Knapsack principles for optimal time and profit utilization.
- To compare results of greedy heuristic with brute-force and dynamic programming on small examples.
- To create a user-friendly display of input ads and allocated ad slots.

## Introduction

In modern online advertising, platforms like Google Ads handle thousands of ad requests per second. Each advertiser wants their ad displayed during specific time intervals. The system must ensure:

- No two ads occupy the same time slot.
- The selected ads yield maximum total profit.

The allocation process thus becomes an optimization problem. This project integrates Greedy, Kruskal’s, and Knapsack ideas to achieve:

- Efficiency: Fast ad selection using greedy heuristics.
- Non-overlap: Conflict avoidance inspired by Kruskal’s selection method.
- Profit maximization: Choosing the best combination of ads within time capacity (Knapsack analogy).

## Algorithm / Technique Used

### Name

Greedy Ad Slot Allocation (inspired by Kruskal’s and Knapsack Problem)

### Algorithm Concept

Each ad request is represented as:

Ad = { startTime, endTime, bidPrice }

We define:

duration = endTime – startTime

value = bidPrice

ratio = value / duration (value density like in fractional knapsack)

We then:

1. Sort ads in descending order of bid/duration ratio.
2. Iteratively select ads that:
	 - Do not overlap with already chosen ads (Kruskal’s non-conflict logic).
	 - Do not exceed total time capacity (Knapsack constraint).
3. Stop when no more ads can fit without overlap or exceeding capacity.
4. Return the final schedule and total profit.

### Stepwise Algorithm

1. Input all ad requests (ID, start time, end time, bid).
2. Compute duration = end - start.
3. Calculate bid/duration ratio for each ad.
4. Sort all ads by ratio in descending order.
5. Initialize empty list final_schedule and variables for total time and profit.
6. For each ad in sorted list:
	 - Check if it overlaps with already scheduled ads.
	 - If not overlapping and total duration ≤ capacity → select it.
7. Output final schedule of selected ads.

### Overlap Condition

Two ads overlap if and only if:

(ad1.start < ad2.end) and (ad2.start < ad1.end)

### Pseudocode

```
procedure AdAllocation(Ads[], Capacity)
	for each Ad in Ads:
		Ad.duration ← Ad.end - Ad.start
		Ad.ratio ← Ad.bid / Ad.duration

	sort Ads by ratio in descending order
	schedule ← empty list
	total_time ← 0
	total_profit ← 0

	for each Ad in Ads:
		if not overlaps(Ad, schedule) and total_time + Ad.duration ≤ Capacity:
				add Ad to schedule
				total_time ← total_time + Ad.duration
				total_profit ← total_profit + Ad.bid

	return schedule, total_profit
```

## Time Complexity

Step	Description	Complexity
Sorting	Sort ads by ratio	O(n log n)
Checking overlap	Compare each ad with existing schedule	O(n²)
Total		O(n²)

For large datasets, interval trees or binary search scheduling can reduce this to O(n log n).

## Implementation (JavaScript / Node.js + Frontend)

Below is a short summary of the implementation provided with this project. The repository includes a Node.js Express server exposing an `/api/allocate` endpoint and a minimal frontend at `public/index.html` that lets users add ads, choose an algorithm, and run allocation.

Key algorithms implemented on the server:
- Greedy by bid/duration ratio (respects capacity and non-overlap)
- Brute-force (checks all subsets; enforces capacity; exact for small n)
- DP (Weighted Interval Scheduling — maximizes profit with no overlaps; ignores global capacity)

Example JavaScript allocation (client-side example):

```html
<!-- Example snippet (see full files in project) -->
<script>
	function overlap(a,b){return !(a.end <= b.start || b.end <= a.start);} 
	function allocate(ads, capacity){
		ads.forEach(a => a.duration = a.end - a.start);
		ads.forEach(a => a.ratio = a.bid / a.duration);
		ads.sort((a,b) => b.ratio - a.ratio);
		const schedule = [];
		let totalTime = 0, profit = 0;
		for (const ad of ads) {
			let conflict = false;
			for (const s of schedule) if (overlap(ad,s)) { conflict = true; break; }
			if (!conflict && totalTime + ad.duration <= capacity) {
				schedule.push(ad);
				totalTime += ad.duration;
				profit += ad.bid;
			}
		}
		return {schedule, totalTime, profit};
	}
</script>
```

### Sample Data and Output

Sample ads:

- Ad 1: [1,3] → ₹50
- Ad 2: [2,5] → ₹60
- Ad 3: [4,6] → ₹70
- Ad 4: [6,9] → ₹90
- Ad 5: [8,10] → ₹40

Capacity: 10

Greedy selection (by ratio) example output:

- Selected Ads: Ad 4 [6-9], Ad 3 [4-6], Ad 1 [1-3]
- Total Profit: ₹210

## Brute Force Comparison

For verification, we check all possible ad combinations using brute force (only for small data) to confirm that the hybrid greedy algorithm gives near-optimal results.

Approach	Optimality	Time Complexity
Brute Force (All Subsets)	100% optimal	O(2ⁿ)
Dynamic Programming (Knapsack DP)	Optimal	O(nT)
Greedy + Kruskal Hybrid	Near-optimal	O(n²)

## Web-based Visualization

The project includes a small web UI (`public/index.html`, `public/app.js`, `public/style.css`) that displays a table of ads, allows adding/removing ads, selecting method (greedy / brute / dp), and shows the final allocation and total profit.

## Results

- Ads scheduled without overlaps.
- Highest bids selected efficiently by the greedy heuristic.
- Output verified using small brute-force tests.

## Conclusion

The hybrid approach efficiently combines:

- Greedy sorting (fast selection),
- Kruskal’s principle (no overlaps/conflicts), and
- Knapsack optimization (maximize profit within time limit).

It significantly improves both accuracy and efficiency over naive methods and can be extended to production-grade ad-serving systems.

## Future Scope

- Dynamic allocation for live ad bidding.
- Use of Machine Learning for predicting ad click-through success.
- Integration with cloud-based ad delivery systems.
- Transition to Weighted Interval Scheduling using DP for higher accuracy where capacity is not a constraint, and to capacity-aware DP for exact solutions when required.


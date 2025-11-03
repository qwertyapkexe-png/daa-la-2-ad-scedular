/*
  server.js (Node/Express) - DEPRECATED

  This file used to provide an Express-based API for /api/allocate.
  The project has been migrated to Python/Flask (server.py). Keep this
  file only for reference. It is not used by the app when the Flask
  server is running.

  If you want this file removed entirely, delete it from the repo.
*/

console.log('server.js is deprecated. Use server.py (Flask) instead.');
function bruteForceAllocation(ads, capacity){
  const n = ads.length;
  let bestProfit = 0, bestSchedule = [];
  for(let mask=0; mask < (1<<n); mask++){
    const chosen = [];
    let ok = true, timeSum = 0, profitSum = 0;
    for(let i=0;i<n;i++){
      if(mask & (1<<i)){
        const a = {...ads[i], duration: duration(ads[i])};
        // check overlap against chosen
        for(const c of chosen){ if(overlap(a,c)){ ok = false; break; } }
        if(!ok) break;
        timeSum += a.duration;
        if(timeSum > capacity){ ok = false; break; }
        profitSum += a.bid;
        chosen.push(a);
      }
    }
    if(ok && profitSum > bestProfit){ bestProfit = profitSum; bestSchedule = chosen.slice(); }
  }
  return {schedule: bestSchedule, totalProfit: bestProfit, totalTime: bestSchedule.reduce((s,a)=>s+(a.end-a.start),0)};
}

// Weighted Interval Scheduling (DP) - ignores capacity but finds max profit with no overlaps
function dpWeightedInterval(ads){
  // sort by end
  const sorted = ads.map((a,i)=>({...a, idx:i})).sort((a,b)=> a.end - b.end);
  const n = sorted.length;
  // compute p[j]: index of last job i < j that doesn't conflict with j
  const p = new Array(n).fill(-1);
  for(let j=0;j<n;j++){
    for(let i=j-1;i>=0;i--){ if(!overlap(sorted[i], sorted[j])){ p[j] = i; break; } }
  }
  const dp = new Array(n+1).fill(0);
  // dp[j+1] = max(dp[j], value[j] + dp[p[j]+1])
  for(let j=0;j<n;j++){
    const incl = sorted[j].bid + (p[j] !== -1 ? dp[p[j]+1] : 0);
    dp[j+1] = Math.max(dp[j], incl);
  }
  // reconstruct
  const schedule = [];
  let j = n-1;
  while(j >= 0){
    const incl = sorted[j].bid + (p[j] !== -1 ? dp[p[j]+1] : 0);
    if(incl >= dp[j]){ // included
      schedule.push(sorted[j]);
      j = p[j];
    } else {
      j = j-1;
    }
  }
  schedule.reverse();
  return {schedule, totalProfit: dp[n], totalTime: schedule.reduce((s,a)=>s+(a.end-a.start),0)};
}

app.post('/api/allocate', (req, res) =>{
  try{
    const {ads, capacity=Infinity, method='greedy'} = req.body;
    if(!Array.isArray(ads)) return res.status(400).json({error:'ads should be an array'});
    // simple validation
    for(const a of ads){ if(typeof a.start !== 'number' || typeof a.end !== 'number' || typeof a.bid !== 'number'){ return res.status(400).json({error:'ad entries must have numeric start,end,bid'}); } }

    let result;
    if(method === 'greedy') result = greedyAllocation(ads, capacity);
    else if(method === 'brute') result = bruteForceAllocation(ads, capacity);
    else if(method === 'dp') result = dpWeightedInterval(ads);
    else return res.status(400).json({error:'unknown method'});

    return res.json({method, result});
  }catch(err){
    console.error(err);
    res.status(500).json({error: 'server error'});
  }
});

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));

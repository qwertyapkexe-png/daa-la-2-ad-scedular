from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)

def activity_selection(activities):
    # Sort activities by finish time
    sorted_activities = sorted(activities, key=lambda x: x['end'])
    selected = []
    last_finish_time = 0
    
    # Select activities that don't overlap
    for activity in sorted_activities:
        if activity['start'] >= last_finish_time:
            selected.append(activity)
            last_finish_time = activity['end']
    
    return selected

def knapsack_allocation(ads, capacity):
    n = len(ads)
    # Create DP table
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    selected = []

    # Fill DP table
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            ad = ads[i-1]
            duration = ad['end'] - ad['start']
            if duration <= w:
                dp[i][w] = max(dp[i-1][w], dp[i-1][w-duration] + ad['bid'])
            else:
                dp[i][w] = dp[i-1][w]

    # Backtrack to find selected ads
    w = capacity
    for i in range(n, 0, -1):
        ad = ads[i-1]
        duration = ad['end'] - ad['start']
        if w >= duration and dp[i][w] != dp[i-1][w]:
            selected.append(ad)
            w -= duration

    return {
        'selected': selected,
        'total_profit': dp[n][capacity]
    }

@app.route('/')
def serve_static():
    return send_from_directory('public', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('public', path)

@app.route('/api/allocate', methods=['POST'])
def allocate():
    data = request.json
    method = data.get('method', 'activity')
    ads = data.get('ads', [])
    capacity = data.get('capacity', 10)

    if method == 'activity':
        result = activity_selection(ads)
        total_profit = sum(ad['bid'] for ad in result)
        return jsonify({
            'schedule': result,
            'totalProfit': total_profit,
            'totalTime': sum(ad['end'] - ad['start'] for ad in result)
        })
    elif method == 'knapsack':
        result = knapsack_allocation(ads, capacity)
        return jsonify({
            'schedule': result['selected'],
            'totalProfit': result['total_profit'],
            'totalTime': sum(ad['end'] - ad['start'] for ad in result['selected'])
        })
    else:
        return jsonify({'error': 'Invalid method'})

if __name__ == '__main__':
    app.run(port=1893)
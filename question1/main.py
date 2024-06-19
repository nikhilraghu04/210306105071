from flask import Flask, jsonify, request
import requests
import time

app = Flask(__name__)

window_size = 10
number_window = []

def fetch_numbers(number_type):
    url = f'http://20.244.56.144/test/{number_type}'
    try:
        response = requests.get(url, timeout=0.5)
        if response.status_code == 200:
            return response.json().get('numbers', [])
    except requests.Timeout:
        return []
    return []

@app.route('/numbers/<string:number_id>', methods=['GET'])
def get_numbers(number_id):
    global number_window
    new_numbers = fetch_numbers(number_id)
    unique_numbers = list(set(new_numbers) - set(number_window))
    
    prev_state = number_window[:]
    
    for num in unique_numbers:
        if len(number_window) >= window_size:
            number_window.pop(0)
        number_window.append(num)
    
    current_state = number_window[:]
    avg = sum(number_window) / len(number_window) if number_window else 0
    
    response = {
        "windowPrevState": prev_state,
        "windowCurrState": current_state,
        "numbers": new_numbers,
        "avg": round(avg, 2)
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=9876)

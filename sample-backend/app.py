from opentelemetry import trace
from random import randint
import json
from flask import Flask, request, Response

app = Flask(__name__)
tracer = trace.get_tracer(__name__)

@app.route("/test")
def roll():
    print(f"server received headers: {request.headers}", flush=True)
    result = roll_sum(6,2)
    response = Response(json.dumps({
        "response": result,
        "headers": dict(request.headers)
    }))
    response.headers['Content-Type'] = 'application/json'
    return response

def roll_sum(sides, rolls):
    sum = 0
    for r in range(0,rolls):
        result = randint(1,sides)
        sum += result
    return str(sum)

@app.route("/test-cors")
def test_cors():
    response = Response("Hello, world!")
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)
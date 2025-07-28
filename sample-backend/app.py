# from opentelemetry import trace
from ddtrace import tracer # Make sure this is imported at the top
from datadog import initialize, api
from ddtrace.debugging import DynamicInstrumentation
from random import randint
import json
from flask import Flask, request, Response
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()  # This loads variables from .env into the environment

app = Flask(__name__)
DynamicInstrumentation.enable()
# tracer = trace.get_tracer(__name__)

api_key = os.getenv("DD_API_KEY")
app_key = os.getenv("DD_APP_KEY")

options = {
    "api_key": api_key,
    "app_key": app_key,
}

initialize(**options)

title = "Something big happened!"
text = "And let me tell you all about it here!"
tags = ["version:1", "application:web"]

api.Event.create(title=title, text=text, tags=tags)

CORS(app, origins='*', allow_headers=[
    'Content-Type', 'Authorization', 'X-Requested-With', 'x-datadog-*', 'traceparent', 'tracestate', 'my-sample-header', 'my-sample-header-1'
])

@app.route("/test")
def roll():
    print(f"server received headers: {request.headers}", flush=True)
    result = "from python /test: " + roll_sum(6,2)
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
    response = Response(json.dumps({
        "response": "from python /test-cors: " + "Hello, world!",
        "headers": dict(request.headers)
    }))
    response.headers['Content-Type'] = 'application/json'
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)
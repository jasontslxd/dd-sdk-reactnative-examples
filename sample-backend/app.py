from opentelemetry import trace
from opentelemetry.trace.propagation.tracecontext import TraceContextTextMapPropagator
from random import randint
from flask import Flask, request, Response

app = Flask(__name__)
tracer = trace.get_tracer(__name__)

@app.route("/test")
def roll():
        sides = int(request.args.get('sides'))
        rolls = int(request.args.get('rolls'))
        response = Response(roll_sum(sides,rolls))
        return response

def roll_sum(sides, rolls):
    sum = 0
    for r in range(0,rolls):
        result = randint(1,sides)
        sum += result
    return str(sum)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)
from opentelemetry import trace
from opentelemetry.trace.propagation.tracecontext import TraceContextTextMapPropagator
from random import randint
from flask import Flask, request, Response

app = Flask(__name__)
tracer = trace.get_tracer(__name__)

@app.route("/test")
def roll():
    headers = dict(request.headers)
    print(f"Received headers: {headers}")
    carrier ={'traceparent': headers['Traceparent']}
    ctx = TraceContextTextMapPropagator().extract(carrier=carrier)
    print(f"Received context: {ctx}")

    with tracer.start_span(
        "server_request", 
        attributes={ "endpoint": "/test" },
        context=ctx
    ):
        sides = int(request.args.get('sides'))
        rolls = int(request.args.get('rolls'))
        response = Response(roll_sum(sides,rolls))
        response.headers['traceparent'] = headers['Traceparent']
        return response

def roll_sum(sides, rolls):
    span = trace.get_current_span()
    sum = 0
    for r in range(0,rolls):
        result = randint(1,sides)
        span.add_event( "log", {
            "roll.sides": sides,
            "roll.result": result,
        })
        sum += result
    return str(sum)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)
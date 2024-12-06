from opentelemetry import trace
from random import randint
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
tracer = trace.get_tracer(__name__)
CORS(app)

@app.route("/test")
@cross_origin(origins="*", methods=["GET"])
def roll():
        print(f"server received headers: {request.headers}")
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
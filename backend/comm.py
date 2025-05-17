from flask import Flask, request, jsonify
from flask_cors import CORS
from main import *

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route("/process-data", methods=["POST"])
def process_data():
    data = request.get_json()
    payoff, p1strat, p2strat = solve(data.grid)

    response = {
        "payoff_matrix":payoff,
        "p1strat": p1strat,
        "p2strat": p2strat,
    }

    return jsonify(response), 200


if __name__ == "__main__":
    app.run(debug=True)
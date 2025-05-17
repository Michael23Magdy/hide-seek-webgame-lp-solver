from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route("/process-data", methods=["POST"])
def process_data():
    data = request.get_json()


    #response = process_on(data)

    return jsonify(response), 200


if __name__ == "__main__":
    app.run(debug=True)
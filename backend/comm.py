from flask import Flask, request, jsonify
from flask_cors import CORS
from main import *  # Importing your solver function
import logging
import numpy as np

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create a custom JSON encoder that can handle NumPy arrays
class NumpyEncoder:
    @staticmethod
    def convert_to_serializable(obj):
        """Convert numpy arrays and other non-serializable objects to serializable types"""
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, (list, tuple)):
            return [NumpyEncoder.convert_to_serializable(item) for item in obj]
        elif isinstance(obj, dict):
            return {k: NumpyEncoder.convert_to_serializable(v) for k, v in obj.items()}
        else:
            return obj

app = Flask(__name__)

# Enable CORS for all routes with proper configuration
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})

@app.route("/process-data", methods=["POST"])
def process_data():
    logger.info("Received a request")
    
    # Validate that request contains JSON data
    if not request.is_json:
        logger.error("Request doesn't contain JSON data")
        return jsonify({"error": "Request must be JSON"}), 400
    
    try:
        data = request.get_json()
        
        # Validate the grid data
        grid = data.get("grid", [])
        if not grid:
            logger.error("No grid data provided")
            return jsonify({"error": "No grid data provided"}), 400
        
        logger.info(f"Processing grid: {grid}")
        
        # Call your solver function
        try:
            # Assuming the player sign should be 1 as in the solve function definition
            payoff, p1strat, p2strat = solve(grid, 1)
            logger.info("Solve completed successfully")
            
            # Convert NumPy arrays to Python lists for JSON serialization
            serializable_payoff = NumpyEncoder.convert_to_serializable(payoff)
            serializable_p1strat = NumpyEncoder.convert_to_serializable(p1strat)
            serializable_p2strat = NumpyEncoder.convert_to_serializable(p2strat)
            
            # Prepare response
            response = {
                "payoff_matrix": serializable_payoff,
                "p1strat": serializable_p1strat,
                "p2strat": serializable_p2strat,
            }
            
            return jsonify(response), 200
            
        except Exception as e:
            logger.error(f"Error in solve function: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())
            return jsonify({"error": f"Solver error: {str(e)}"}), 500
            
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Add a simple health check endpoint
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    logger.info("Starting Flask server on http://127.0.0.1:5000")
    app.run(debug=True, host="127.0.0.1", port=5000)
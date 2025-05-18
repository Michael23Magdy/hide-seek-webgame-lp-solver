from payoff_fn import *
from simplex import *
import numpy as np

def solve(matrix, player_sign=1):
    """
    Solves the zero-sum game based on the provided matrix.
    
    Args:
        matrix: The game grid
        player_sign: The player sign (defaults to 1)
        
    Returns:
        payoff: The payoff matrix
        p1strat: The optimal strategy for player 1 (hider)
        p2strat: The optimal strategy for player 2 (seeker)
    """
    try:
        # Convert input to numpy array if it's not already
        matrix_np = np.array(matrix)
        n, m = matrix_np.shape
        
        # Calculate payoff matrix
        payoff, normalized_payoff = payoff_matrix(matrix_np, player_sign)
        
        # Solve the zero-sum game
        p1strat, p2strat = solve_zero_sum_game(normalized_payoff)
        
        # Reshape the strategies to match the grid dimensions
        p1strat = reshape_strategy(p1strat, n, m)
        p2strat = reshape_strategy(p2strat, n, m)
        
        # Ensure they are numpy arrays (if they're not already)
        p1strat = np.array(p1strat)
        p2strat = np.array(p2strat)
        
        print("Hider strategy:")
        print(p1strat)
        print("\nSeeker strategy:")
        print(p2strat)
        
        return payoff, p1strat, p2strat
        
    except Exception as e:
        print(f"Error in solve function: {e}")
        # Re-raise the exception so it can be caught and handled by the caller
        raise
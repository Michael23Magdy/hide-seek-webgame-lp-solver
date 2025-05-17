import numpy as np
from scipy.optimize import linprog
from payoff_fn import *

def solve_zero_sum_game(payoff_matrix):
    A = np.array(payoff_matrix, dtype=np.float64)
    m, n = A.shape

    # ----- Solve for Player 1 -----
    # Minimize: c^T x = sum(x)
    c = np.ones(m)

    # Subject to: A^T x >= 1  <=>  -A^T x <= -1
    A_ub = -A.T
    b_ub = -np.ones(n)

    res1 = linprog(c, A_ub=A_ub, b_ub=b_ub)

    if not res1.success:
        raise ValueError("Simplex failed for Player 1")

    x = res1.x
    game_value1 = 1 / sum(x)
    p1_strategy = x * game_value1  # Normalize

    # ----- Solve for Player 2 -----
    # Minimize: c^T y = sum(y)
    c = np.ones(n)

    A_ub = -A
    b_ub = -np.ones(m)

    res2 = linprog(c, A_ub=A_ub, b_ub=b_ub)

    if not res2.success:
        raise ValueError("Simplex failed for Player 2")

    y = res2.x
    game_value2 = 1 / sum(y)
    p2_strategy = y * game_value2

    return p1_strategy, p2_strategy


def reshape_strategy(strategy, rows, cols):
    return np.array(strategy).reshape((rows, cols))
from payoff_fn import *
from simplex import *
import random

def solve(matrix, player_sign):
    n,m = np.array(matrix).shape

    payoff = payoff_matrix(matrix, 1)

    p1strat, p2strat = solve_zero_sum_game(payoff)

    p1strat = reshape_strategy(p1strat, n, m)
    p2strat = reshape_strategy(p2strat, n, m)
    print(p1strat)
    print()
    print(p2strat)
    return payoff, p1strat, p2strat


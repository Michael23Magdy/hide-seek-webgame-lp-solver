import math
import random
from payoff_fn import *
from simplex import *
from main import *

rows, cols = 2,2
matrix = [[random.randint(0, 2) for _ in range(cols)] for _ in range(rows)]
print('difficulty matrix')
print_2d_array(matrix)


payoff = payoff_matrix(matrix, 1)
solve_zero_sum_game(payoff)



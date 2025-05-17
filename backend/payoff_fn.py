HARD_WIN, HARD_LOSE = 10, -30
NEUTRAL_WIN, NEUTRAL_LOSE = 10, -10
EASY_WIN, EASY_LOSE = 20, -10

def print_2d_array(array):
    for row in array:
        print(' '.join(str(cell) for cell in row))
    print()


def payoff_normalize(matrix, rows, cols, minimum):
    for i in range(rows):
        for j in range(cols):
            matrix[i][j] = matrix[i][j] + minimum
    return matrix


def payoff_matrix(difficulties, player_sign):
    minimum = EASY_WIN
    rows = cols = len(difficulties)
    payoff = [[0 for _ in range(rows**2)] for _ in range(cols**2)]

    print('difficulty matrix') 
    print_2d_array(difficulties)   

    for i in range(rows):
        for j in range(cols):
            idx = i*cols+j
            diff = difficulties[i][j]

            match diff:
                case 2:  # Hard
                    win_score, lose_score = HARD_WIN, HARD_LOSE
                    minimum = min(minimum, HARD_LOSE)
                case 1:  # Neutral
                    win_score, lose_score = NEUTRAL_WIN, NEUTRAL_LOSE
                    minimum = min(minimum, NEUTRAL_LOSE)

                case 0:  # Easy
                    win_score, lose_score = EASY_WIN, EASY_LOSE
                    minimum = min(minimum, EASY_LOSE)


            payoff[idx] = [player_sign * win_score for _ in range(rows**2)]
            payoff[idx][idx] = player_sign * lose_score

    print('payoff matrix') 
    print_2d_array(payoff)   


    print('Normalized Matrix')    
    payoff = payoff_normalize(payoff, rows**2, cols**2, -minimum)
    print_2d_array(payoff)
    return payoff


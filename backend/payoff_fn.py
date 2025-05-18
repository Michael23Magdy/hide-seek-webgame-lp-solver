HARD_WIN, HARD_LOSE = 100, -500
NEUTRAL_WIN, NEUTRAL_LOSE = 150, -300
EASY_WIN, EASY_LOSE = 200, -100

def print_2d_array(array):
    for row in array:
        print(' '.join(str(cell) for cell in row))
    print()


def payoff_normalize(matrix, rows, cols, minimum):
    normalized = [[0 for _ in range(cols)] for _ in range(rows)]
    for i in range(rows):
        for j in range(cols):
            normalized[i][j] = matrix[i][j] + minimum

    return normalized


def payoff_matrix(difficulties, player_sign):
    minimum = HARD_LOSE
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
    normalized_payoff = payoff_normalize(payoff, rows**2, cols**2, -minimum)
    print_2d_array(payoff)
    return payoff, normalized_payoff


HARD_WIN, HARD_LOSE = 100, -300
NEUTRAL_WIN, NEUTRAL_LOSE = 100, -100
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
            idx = i * cols + j
            diff = difficulties[i][j]

            match diff:
                case 2:
                    win_score, lose_score = HARD_WIN, HARD_LOSE
                    minimum = min(minimum, HARD_LOSE)
                case 1:
                    win_score, lose_score = NEUTRAL_WIN, NEUTRAL_LOSE
                    minimum = min(minimum, NEUTRAL_LOSE)
                case 0:
                    win_score, lose_score = EASY_WIN, EASY_LOSE
                    minimum = min(minimum, EASY_LOSE)
    

            payoff[idx] = adjusted_win_matrix(rows, cols, win_score, i, j, player_sign)
            payoff[idx][idx] = player_sign * lose_score

    print('payoff matrix After') 
    print_2d_array(payoff)   

    print('Normalized Matrix')    
    normalized_payoff = payoff_normalize(payoff, rows**2, cols**2, -minimum)
    print_2d_array(normalized_payoff)
    return payoff, normalized_payoff


def chebyshev_distance(i1, j1, i2, j2):
    return max(abs(i1 - i2), abs(j1 - j2))


def adjusted_win_matrix(rows, cols, base_win, i, j, player_sign):
    win_row = [0 for _ in range(rows * cols)]
    for m in range(rows):
        for n in range(cols):
            seeker_idx = m * cols + n
            dist = chebyshev_distance(i, j, m, n)

            if dist == 1:
                multiplier = 0.5
            elif dist == 2:
                multiplier = 0.75
            else:
                multiplier = 1.0

            win_row[seeker_idx] = int(player_sign * base_win * multiplier)
    return win_row




export function generateRandomGrid(size){
    return Array.from({ length: size }, () => 
        Array.from({ length: size }, () => Math.floor(Math.random() * 3))
    );
}

export function chooseRandomCell(size){
    return {x: Math.floor(Math.random()*size),  y: Math.floor(Math.random()*size)};
}

export function chooseBasedOnProbability(probabilities, size){
    if (!probabilities || !Array.isArray(probabilities)) {
        console.log("No valid probability data, using random choice");
        return chooseRandomCell(size);
    }
    
    try {
        // Create a flat array of cell options with their probabilities
        let flatProbs = [];
        let totalProb = 0;
        
        for (let i = 0; i < probabilities.length; i++) {
            for (let j = 0; j < probabilities[i].length; j++) {
                const cellProb = parseFloat(probabilities[i][j]);
                if (!isNaN(cellProb) && cellProb > 0) {
                    flatProbs.push({
                        x: i,
                        y: j,
                        prob: cellProb
                    });
                    totalProb += cellProb;
                }
            }
        }
        
        // If we have valid probabilities
        if (flatProbs.length > 0 && totalProb > 0) {
            // Normalize probabilities if they don't sum to 1
            if (Math.abs(totalProb - 1.0) > 0.01) {
                flatProbs.forEach(cell => cell.prob /= totalProb);
            }
            
            // Sort by probability (highest first)
            flatProbs.sort((a, b) => b.prob - a.prob);
            
            // 70% of the time, pick based on the probability distribution
            if (Math.random() <= 1) {
                // Use roulette wheel selection
                const r = Math.random();
                let cumulativeProb = 0;
                
                for (const cell of flatProbs) {
                    cumulativeProb += cell.prob;
                    if (r <= cumulativeProb) {
                        return { x: cell.x, y: cell.y };
                    }
                }
                
                // Fallback to highest probability
                return { x: flatProbs[0].x, y: flatProbs[0].y };
            } else {
                // 30% of the time, choose randomly to add unpredictability
                return chooseRandomCell(size);
            }
        }
        
        // Fallback to random if something went wrong
        return chooseRandomCell(size);
    } catch (error) {
        console.error("Error in probability-based choice:", error);
        return chooseRandomCell(size);
    }
};

export function generateRandomGrid(size){
    return Array.from({ length: size }, () => 
        Array.from({ length: size }, () => Math.floor(Math.random() * 3))
    );
}

export function chooseRandomCell(size){
    return {x: Math.floor(Math.random()*size),  y: Math.floor(Math.random()*size)};
}

export function chooseBasedOnProbability(probabilities, size) {
    if (!Array.isArray(probabilities)) return chooseRandomCell(size);

    let flat = [], total = 0;
    for (let i = 0; i < probabilities.length; i++)
        for (let j = 0; j < probabilities[i].length; j++) {
            let p = parseFloat(probabilities[i][j]);
            if (p > 0) { flat.push({ x: i, y: j, p }); total += p; }
        }

    if (!flat.length || !total) return chooseRandomCell(size);

    flat.forEach(cell => cell.p /= total);

    let r = Math.random(), sum = 0;
    for (const cell of flat) {
        sum += cell.p;
        if (r <= sum) return { x: cell.x, y: cell.y };
    }
    return { x: flat[0].x, y: flat[0].y };
}

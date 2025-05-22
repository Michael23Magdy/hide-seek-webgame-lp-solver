
export function generateRandomGrid(sizeX, sizeY){
    return Array.from({ length: sizeX }, () => 
        Array.from({ length: sizeY }, () => Math.floor(Math.random() * 3))
    );
}

export function chooseRandomCell(sizeX, sizeY){
    return {x: Math.floor(Math.random()*sizeX),  y: Math.floor(Math.random()*sizeY)};
}

export function chooseBasedOnProbability(probabilities, sizeX, sizeY) {
    if (!Array.isArray(probabilities)) return chooseRandomCell(sizeX, sizeY);

    let flat = [], total = 0;
    for (let i = 0; i < probabilities.length; i++)
        for (let j = 0; j < probabilities[i].length; j++) {
            let p = parseFloat(probabilities[i][j]);
            if (p > 0) { flat.push({ x: i, y: j, p }); total += p; }
        }

    if (!flat.length || !total) return chooseRandomCell(sizeX, sizeY);

    flat.forEach(cell => cell.p /= total);

    let r = Math.random(), sum = 0;
    for (const cell of flat) {
        sum += cell.p;
        if (r <= sum) return { x: cell.x, y: cell.y };
    }
    return { x: flat[0].x, y: flat[0].y };
}

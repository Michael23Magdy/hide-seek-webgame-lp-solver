
export function generateRandomGrid(size){
    return Array.from({ length: size }, () => 
        Array.from({ length: size }, () => Math.floor(Math.random() * 3))
    );
}

export function chooseRandomCell(size){
    return {x: Math.floor(Math.random()*size),  y: Math.floor(Math.random()*size)};
}

export function generateRandomGrid(size){
    return Array.from({ length: size }, () => 
        Array.from({ length: size }, () => Math.floor(Math.random() * 3))
    );
}
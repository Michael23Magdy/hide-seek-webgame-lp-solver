import { useGame } from "../../context/GameContext";

const Colors = ['bg-red-200', 'bg-green-200', 'bg-gray-200'];
const Names = ['Hard', 'Medium', 'Neutral'];

const Cell= ({x,y,onClick})=>{
    const {state: gameState, actions} = useGame();
    const level = gameState.grid[x][y];
    const {hiderChoice, seekerChoice} = gameState;

    const isHider = hiderChoice.x === x && hiderChoice.y === y;
    const isSeeker = seekerChoice.x === x && seekerChoice.y === y;
    let name = Names[level];
    if(gameState.roundWinner != null){
        if(isHider && isSeeker){
            name = '✔️';
        } else if(isHider){
            name = '🙈';
        } else if(isSeeker){
            name = '🔍';
        }
    }
    const cellColor=Colors[level];
    return(
        <div
            onClick={() => onClick(x, y)}
            className={`
                ${cellColor} aspect-square p-6
                flex items-center justify-center 
                text-l font-medium text-gray-700 
                border border-gray-600 rounded-lg cursor-pointer 
                hover:scale-105 transition-transform select-none
            `}
        >
            {name}
        </div>
    );

};
export default Cell;
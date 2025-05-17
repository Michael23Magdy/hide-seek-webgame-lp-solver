import { useGame } from "../../context/GameContext";
import cought from "../../assets/cought.png"
import Tom from "../../assets/tomFace.webp"
import Jerry from "../../assets/jerryFace.png"

const Colors = ['bg-red-200', 'bg-green-200', 'bg-gray-200'];
const Names = ['Hard', 'easy', 'Neutral'];

const Cell= ({x,y,onClick})=>{
    const {state: gameState, actions} = useGame();
    const level = gameState.grid[x][y];
    const {hiderChoice, seekerChoice} = gameState;

    const isHider = hiderChoice.x === x && hiderChoice.y === y;
    const isSeeker = seekerChoice.x === x && seekerChoice.y === y;
    let name = Names[level];
    if(gameState.roundWinner != null){
        if(isHider && isSeeker){
            name = <img src={cought} className="w-20" alt="" />;
        } else if(isHider){
            name = <img src={Jerry} className="w-14" />;
        } else if(isSeeker){
            name = <img src={Tom} className="w-14" />;
        }
    }
    const cellColor=Colors[level];
    return(
        <div
            onClick={() => onClick(x, y)}
            className={`
                ${cellColor} aspect-square $ p-6
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
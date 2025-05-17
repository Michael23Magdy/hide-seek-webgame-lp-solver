import { useGame } from "../../context/GameContext";
import BoxContainer from "../ui/BoxContainer";

const ScoreBoard=()=>{
    const {state: gameState, actions} = useGame();
    
    return (
        <BoxContainer className="h-max">
            <div className=" text-xl text-center mb-3">Score Board 🚀</div>
            <div className="flex justify-evenly">

                <div className="text-2xl flex flex-col"> 
                    <span className="p-4 rounded-full bg-yellow-200 mb-2">🙈</span> 
                    <span className="w-full text-center">{gameState.hiderScore}</span>
                </div>
                <div className="text-2xl flex flex-col"> 
                    <span className="p-4 rounded-full bg-sky-200 mb-2">🔍</span> 
                    <span className="w-full text-center">{gameState.seekerScore}</span>
                </div>
            </div>
        </BoxContainer>
    );

};//bravoooooo MICKYYYYYYYYYYYYYYYYYY
// 1 2 3 Caroline Caroletaaaaaaaaa

export default ScoreBoard;
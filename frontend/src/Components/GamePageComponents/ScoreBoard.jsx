import { useGame } from "../../context/GameContext";
import BoxContainer from "../ui/BoxContainer";
import Tom from "../../assets/tomFace.webp"
import Jerry from "../../assets/jerryFace.png"
import { GameRole } from "../../constants/enums";

const ScoreBoard=()=>{
    const {state: gameState, actions} = useGame();
    
    return (
        <BoxContainer className="h-max">
            <div className=" text-xl text-center mb-3">Score Board 🚀</div>
            <div className="flex justify-evenly">
                <div className="text-2xl flex flex-col "> 
                    <img className={`p-2 rounded-full bg-sky-200 mb-2 w-16 ${gameState.turn == GameRole.Seeker? "border-green-500 border-2":""}`} src={Tom} /> 
                    <span className="w-full text-center">{gameState.seekerScore}</span>
                    <span className="w-full text-center text-sm text-gray-400">{gameState.seekerGamesWon}</span>
                </div>
                <div className="text-2xl flex flex-col"> 
                    <img className={`p-2 rounded-full bg-yellow-200 mb-2 w-16 ${gameState.turn == GameRole.Hider? "border-green-500 border-2":""}`} src={Jerry} /> 
                    <span className="w-full text-center">{gameState.hiderScore}</span>
                    <span className="w-full text-center text-sm text-gray-400">{gameState.hiderGamesWon}</span>
                </div>
            </div>
        </BoxContainer>
    );

};//bravoooooo MICKYYYYYYYYYYYYYYYYYY
// 1 2 3 Caroline Caroletaaaaaaaaa

export default ScoreBoard;
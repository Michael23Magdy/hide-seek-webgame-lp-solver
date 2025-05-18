import { GameRole } from "../../constants/enums";
import { useGame } from "../../context/GameContext";
import BoxContainer from "../ui/BoxContainer";

const GameStatusDisplay = ({ handleNextRound, handleGameReset }) => {
    const {state: gameState, actions} = useGame();

    const isNextRoundAvailable = gameState.turn == null;

    return (
        <BoxContainer className="flex flex-col justify-center items-center gap-1 w-full">
            <p className="text-xl text-gray-800">Round {gameState.roundCount}</p>
            <div className="text-red-300 p-2 rounded-2xl w-48 text-center">
                {
                    (gameState.roundWinner == GameRole.Hider)   ? <p>Jerry wins</p>  :
                    (gameState.roundWinner == GameRole.Seeker)  ? <p>Tom wins</p> :
                    (gameState.turn == GameRole.Hider)          ? <p>Jerry's turn</p> : 
                                                                <p>Topm's turn</p>
                }
            </div>
            <button
                className={` bg-blue-300 p-2 rounded-2xl w-full disabled:bg-gray-200 disabled:text-white `}
                onClick={handleNextRound}
                disabled={!isNextRoundAvailable}
            >
                {gameState.roundCount == 0?"Start Game":"Next Round"}
            </button>
            <button 
                className="bg-red-300 p-2 rounded-2xl w-full"
                onClick={handleGameReset}
            > 
                Reset Game
            </button>
        </BoxContainer>
    )
}

export default GameStatusDisplay;
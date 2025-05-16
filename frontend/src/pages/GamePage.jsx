import{ useEffect} from "react";
import { useGame } from "../context/GameContext";
import GameGrid from "../Components/GamePageComponents/GameGrid";

const GamePage = () => {
    const {state: gameState, actions} = useGame();
    useEffect(() => {
        actions.generateNewGrid(); 
    }, [gameState.size]);
    return (
        <div className="h-max ">
            <GameGrid />
            
        </div>
    );
}
export default GamePage;
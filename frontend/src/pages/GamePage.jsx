import { useGame } from "../context/GameContext";

const GamePage = () => {
    const {state: gameState, actions} = useGame();
    // Score board
    // turn (state, reset, next round)
    // Grid

    return (
        <div className="grid grid-cols-2">
            
        </div>
    );
}
export default GamePage;
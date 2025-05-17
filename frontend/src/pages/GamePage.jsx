import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import GameGrid from "../Components/GamePageComponents/GameGrid";
import GameStatusDisplay from "../Components/GamePageComponents/GameStatusDisplay";
import { GameRole, PlayerType } from "../constants/enums";
import { chooseRandomCell } from "../game/utils";

const GamePage = () => {
    const {state: gameState, actions} = useGame();
    useEffect(() => {
        actions.generateNewGrid(); 
    }, [gameState.size]);

    const play = (x, y)=>{
        if(gameState.roundWinner != null) return;
        if (gameState.turn == GameRole.Hider) {
            actions.setHiderChoice(x, y);
            actions.setTurn(GameRole.Seeker);
        } else {
            actions.setSeekerChoice(x, y);
            checkWinner();
        }
    }

    const checkWinner = () => {
        if(gameState.seekerChoice.x == null) return;
        console.log(
            `Checking winner: hider (${gameState.hiderChoice.x},${gameState.hiderChoice.y}) vs seeker (${gameState.seekerChoice.x},${gameState.seekerChoice.y})`
        );
        const winner = (gameState.hiderChoice.x === gameState.seekerChoice.x
                    && gameState.hiderChoice.y === gameState.seekerChoice.y) ? GameRole.Seeker : GameRole.Hider;
        actions.setRoundWinner(winner) ;
    }

    useEffect(()=>{
        checkWinner();
    }, [gameState.seekerChoice]);

    useEffect(()=>{
        if (
            (gameState.turn == GameRole.Hider && gameState.hiderType == PlayerType.Computer) ||
            (gameState.turn == GameRole.Seeker && gameState.seekerType == PlayerType.Computer)
        ) {
            let computerChoice = chooseRandomCell(gameState.size);
            play(computerChoice.x, computerChoice.y);
        }

        // Removed incomplete 'if(game)' statement
    }, [gameState.turn]);
    return (
        <div className="h-max grid grid-cols-2 gap-4">
            <GameGrid onCellClick={play} />
            <GameStatusDisplay />
            <pre>{JSON.stringify(gameState, null, 2)}</pre>
        </div>
    );
}
export default GamePage;
import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import GameGrid from "../Components/GamePageComponents/GameGrid";
import GameStatusDisplay from "../Components/GamePageComponents/GameStatusDisplay";
import { GameRole, PlayerType } from "../constants/enums";
import { chooseRandomCell } from "../game/utils";
import ScoreBoard from "../Components/GamePageComponents/ScoreBoard";

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
        if(winner == GameRole.Seeker)
            actions.increamentSeekerScore(100);
        else
            actions.increamentHiderScore(100);
        
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
        <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-4 h-max">
            <div className="row-span-2 col-span-2">
                <GameGrid onCellClick={play} />
            </div>
            <div className="row-span-1 col-span-1 h-max">
                <ScoreBoard />
            </div>
            <div className="row-span-1 col-span-1">
                <GameStatusDisplay />
            </div>
            {/* Optionally, show gameState for debugging in a hidden cell or below */}
            {/* <div className="col-span-3">
                <pre>{JSON.stringify(gameState, null, 2)}</pre>
            </div> */}
        </div>
    );
}
export default GamePage;
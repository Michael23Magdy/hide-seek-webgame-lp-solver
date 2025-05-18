import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import GameGrid from "../Components/GamePageComponents/GameGrid";
import GameStatusDisplay from "../Components/GamePageComponents/GameStatusDisplay";
import { GameRole, PlayerType } from "../constants/enums";
import { chooseBasedOnProbability, chooseRandomCell } from "../game/utils";
import ScoreBoard from "../Components/GamePageComponents/ScoreBoard";
import { sendDataToServer } from "../API/simplex";

const GamePage = () => {
    const {state: gameState, actions} = useGame();
    const [aiData, setAiData] = useState({
        payoff: null,
        hiderProbability: null,
        seekerProbability: null
    });
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        actions.generateNewGrid(); 
    }, [gameState.size]);

    useEffect(() => {
        const fetchData = async () => {
            // Only make the API call if grid has data
            if (!gameState.grid || gameState.grid.length === 0) {
                return;
            }
            
            setIsLoading(true);
            try {
                console.log("Sending grid to server:", gameState.grid);
                const data = await sendDataToServer(gameState.grid);
                if (data) {
                    console.log("Received data from server:", data);
                    setAiData({
                        payoff: data.payoff_matrix,
                        hiderProbability: data.p1strat,
                        seekerProbability: data.p2strat
                    });
                    
                    // If computer players are active, we can use the AI strategy here
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [gameState.grid]);



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
        let i = gameState.hiderChoice.x * gameState.size + gameState.hiderChoice.y;
        let j = gameState.seekerChoice.x * gameState.size + gameState.seekerChoice.y;
        actions.increamentHiderScore(aiData.payoff[i][j]);        
        actions.increamentSeekerScore(-aiData.payoff[i][j]);
    }

    useEffect(()=>{
        checkWinner();
    }, [gameState.seekerChoice]);

    useEffect(() => {
        if (gameState.roundWinner != null) return;
        
        if (
            (gameState.turn === GameRole.Hider && gameState.hiderType === PlayerType.Computer) ||
            (gameState.turn === GameRole.Seeker && gameState.seekerType === PlayerType.Computer)
        ) {
            // Wait a bit before making the computer move (for better UX)
            const timeoutId = setTimeout(() => {
                let computerChoice;
                
                // Use AI strategy if available, otherwise use random
                if (aiData.hiderProbability && gameState.turn === GameRole.Hider) {
                    // Use hider probabilities from AI
                    computerChoice = chooseBasedOnProbability(aiData.hiderProbability, gameState.size);
                } else if (aiData.seekerProbability && gameState.turn === GameRole.Seeker) {
                    // Use seeker probabilities from AI
                    computerChoice = chooseBasedOnProbability(aiData.seekerProbability, gameState.size);
                } else {
                    // Fallback to random choice
                    computerChoice = chooseRandomCell(gameState.size);
                }
                
                play(computerChoice.x, computerChoice.y);
            }, 800); // Delay computer's move by 800ms
            
            return () => clearTimeout(timeoutId);
        }
    }, [gameState.turn, aiData]);

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
import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import GameGrid from "../Components/GamePageComponents/GameGrid";
import GameStatusDisplay from "../Components/GamePageComponents/GameStatusDisplay";
import { GameRole, PlayerType } from "../constants/enums";
import { chooseBasedOnProbability, chooseRandomCell } from "../game/utils";
import ScoreBoard from "../Components/GamePageComponents/ScoreBoard";
import { sendDataToServer } from "../API/simplex";
import loader from "../assets/200w.gif";

const GamePage = () => {
    const {state: gameState, actions} = useGame();
    const [aiData, setAiData] = useState({
        payoff: null,
        hiderProbability: null,
        seekerProbability: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const simulationCountRef = useRef(100);

    useEffect(() => {
        const fetchData = async () => {
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
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setTimeout(() => setIsLoading(false), 2000);
            }
        };

        fetchData();
    }, [gameState.grid]);

    useEffect(() => {
        actions.generateNewGrid(); 
    }, [gameState.size]);

    useEffect(() => {
        if(isLoading) return;
        if(gameState.turn == null){
            let winner = checkWinner();
            if(winner == null) return;
            let points = calculateScore();
            actions.setRoundWinner(winner);
            actions.increamentHiderScore(points);        
            actions.increamentSeekerScore(-points);
            if(gameState.seekerType == PlayerType.Computer && gameState.hiderType == PlayerType.Computer){
                // next roound
                if(simulationCountRef.current){
                    simulationCountRef.current--;
                    handleNextRound();
                }else{
                    console.log("finished 20 rounds");
                }
            }
        } else if(gameState.turn == GameRole.Hider){
            if(gameState.hiderType === PlayerType.Computer){
                let computerChoice = chooseBasedOnProbability(aiData.hiderProbability, gameState.size);;
                play(computerChoice.x, computerChoice.y);
            }
        } else if(gameState.turn == GameRole.Seeker){
            if(gameState.seekerType === PlayerType.Computer){
                let computerChoice = chooseBasedOnProbability(aiData.seekerProbability, gameState.size);;
                play(computerChoice.x, computerChoice.y);
            }
        }
    }, [gameState.turn]);

    const play = (x, y)=>{
        if(gameState.roundWinner != null) return;
        if (gameState.turn == GameRole.Hider) {
            actions.setHiderChoice(x, y);
            actions.setTurn(GameRole.Seeker);
        } else {
            actions.setSeekerChoice(x, y);
            actions.setTurn(null);
        }
    }

    const checkWinner = () => {
        if (
            gameState.seekerChoice?.x == null ||
            gameState.seekerChoice?.y == null ||
            gameState.hiderChoice?.x == null ||
            gameState.hiderChoice?.y == null
        ) return null;
        const winner = (gameState.hiderChoice.x === gameState.seekerChoice.x
                    && gameState.hiderChoice.y === gameState.seekerChoice.y) ? GameRole.Seeker : GameRole.Hider;
        return winner;
    }

    const handleNextRound = () => {
        actions.setHiderChoice(null, null);
        actions.setSeekerChoice(null, null);
        actions.setTurn(GameRole.Hider);
        actions.setRoundWinner(null);
        actions.increamentRoundCount();
    }
    const handleGameReset = () => {
        actions.generateNewGrid();
        actions.resetHiderScore();
        actions.resetSeekerScore();
        actions.resetRoundCount();
        actions.setHiderChoice(null, null);
        actions.setSeekerChoice(null, null);
        actions.setTurn(null);
        actions.setRoundWinner(null);
    } 

    const calculateScore = ()=>{
        let i = gameState.hiderChoice.x * gameState.size + gameState.hiderChoice.y;
        let j = gameState.seekerChoice.x * gameState.size + gameState.seekerChoice.y;
        return aiData.payoff[i][j];
    }

    return (
        <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-4 h-max">
            <div className="row-span-2 col-span-2 flex justify-center items-center">
                {isLoading?<img className="m-auto" src={loader} />: <GameGrid onCellClick={play} />}
            </div>
            <div className="row-span-1 col-span-1 h-max">
                <ScoreBoard />
            </div>
            <div className="row-span-1 col-span-1">
                <GameStatusDisplay handleGameReset={handleGameReset} handleNextRound={handleNextRound} />
            </div>
            {/* Optionally, show gameState for debugging in a hidden cell or below */}
            {/* <div className="col-span-3">
                <pre>{JSON.stringify(gameState, null, 2)}</pre>
            </div> */}
        </div>
    );
}
export default GamePage;
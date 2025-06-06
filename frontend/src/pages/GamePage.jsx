import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import GameGrid from "../Components/GamePageComponents/GameGrid";
import GameStatusDisplay from "../Components/GamePageComponents/GameStatusDisplay";
import { GameRole, PlayerType } from "../constants/enums";
import { chooseBasedOnProbability, chooseRandomCell } from "../game/utils";
import ScoreBoard from "../Components/GamePageComponents/ScoreBoard";
import { sendDataToServer } from "../API/simplex";
import loader from "../assets/200w.gif";
import Table from "../Components/GamePageComponents/Table";
import PopupWindow from "../Components/ui/PopupWindows";
import HistoryTable from "../Components/GamePageComponents/HistoryTable";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
    const {state: gameState, actions} = useGame();
    const [aiData, setAiData] = useState({
        payoff: null,
        hiderProbability: null,
        seekerProbability: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const simulationCountRef = useRef(99);
    const [isWindowOpen, setIsWindowOpen] = useState([false, false, false, false]);
    const [gameHistory, setGameHistory] = useState([]);
    const navigate = useNavigate();

    
    useEffect(()=>{
        if (gameState.grid == null || gameState.grid.length == 0){
            handleBackToHome();
        }
    },[]);

    const addHistoryRecord = (winner)=>{
        setGameHistory(prev => [
            ...prev,
            {
                round: gameState.roundCount,
                hiderChoice: { ...gameState.hiderChoice },
                seekerChoice: { ...gameState.seekerChoice },
                winner: winner,
                score: calculateScore()
            }
        ]);
    };
    
    const setPopupOpen = (index, value) => {
        setIsWindowOpen(prev => prev.map((open, i) => i === index ? value : open));
    };

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
                        hiderProbability: data.hiderStrat,
                        seekerProbability: data.seekerStrat
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
        if(isLoading) return;
        if(gameState.turn == null){
            let winner = checkWinner();
            if(winner == null) return;
            let points = calculateScore();
            if(winner==GameRole.Hider) actions.increamentHiderGamesWon(); else actions.increamentSeekerGamesWon()
            actions.setRoundWinner(winner);
            actions.increamentHiderScore(points);     
            actions.increamentSeekerScore(-points);
            addHistoryRecord(winner);
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
                let computerChoice = chooseBasedOnProbability(aiData.hiderProbability, gameState.noRows, gameState.noCols);;
                play(computerChoice.x, computerChoice.y);
            }
        } else if(gameState.turn == GameRole.Seeker){
            if(gameState.seekerType === PlayerType.Computer){
                let computerChoice = chooseBasedOnProbability(aiData.seekerProbability, gameState.npRows, gameState.noCols);;
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
        simulationCountRef.current = 99;
        setGameHistory([]);
        actions.generateNewGrid();
        actions.resetHiderScore();
        actions.resetSeekerScore();
        actions.resetHiderGamesWon();
        actions.resetSeekerGamesWon();
        actions.resetRoundCount();
        actions.setHiderChoice(null, null);
        actions.setSeekerChoice(null, null);
        actions.setTurn(null);
        actions.setRoundWinner(null);
    }

    const handleBackToHome = ()=>{
        handleGameReset();
        navigate("/");
    }

    

    const calculateScore = ()=>{
        let i = gameState.hiderChoice.x * gameState.noRows + gameState.hiderChoice.y;
        let j = gameState.seekerChoice.x * gameState.noRows + gameState.seekerChoice.y;
        return aiData.payoff[i][j];
    }

    return (
        <>
            <PopupWindow isOpen={isWindowOpen[0]} onClose={()=>setPopupOpen(0, false)}>
                <Table Data={aiData.payoff} size={gameState.noRows*gameState.noCols} title="PayOff matrix" />
            </PopupWindow>
            <PopupWindow isOpen={isWindowOpen[1]} onClose={()=>setPopupOpen(1, false)}>
                <Table Data={aiData.hiderProbability} size={gameState.noCols} title="Hider Probability" round={4} />
            </PopupWindow>
            <PopupWindow isOpen={isWindowOpen[2]} onClose={()=>setPopupOpen(2, false)}>
                <Table Data={aiData.seekerProbability} size={gameState.noCols} title="Seeker Probability" round={4} />
            </PopupWindow>
            <PopupWindow isOpen={isWindowOpen[3]} onClose={()=>setPopupOpen(3, false)}>
                <HistoryTable gameHistory={gameHistory} />
            </PopupWindow>
            <button className="fixed left-4 top-4 bg-white opacity-70 hover:opacity-100 rounded-2xl py-2 px-3" onClick={handleBackToHome}>
                🏠 Home
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 auto-rows-max gap-4 h-max">
                <div className="sm:col-span-2 row-span-3  flex justify-center items-center">
                    {isLoading ? <img className="m-auto" src={loader} /> : <GameGrid onCellClick={play} />}
                </div>

                <div className="h-max">
                    <ScoreBoard />
                </div>

                <div className="flex justify-between items-center">
                    <button className="p-2 rounded-full bg-white text-2xl" title="Show" onClick={()=>setPopupOpen(0, true)}>🧮</button>
                    <button className="p-2 rounded-full bg-white text-2xl" title="Show" onClick={()=>setPopupOpen(1, true)}>🙈</button>
                    <button className="p-2 rounded-full bg-white text-2xl" title="Show" onClick={()=>setPopupOpen(2, true)}>🔍</button>
                    <button className="p-2 rounded-full bg-white text-2xl" title="Show" onClick={()=>setPopupOpen(3, true)}>📜</button>
                </div>

                <div className="flex items-end">
                    <GameStatusDisplay handleGameReset={handleGameReset} handleNextRound={handleNextRound} />
                </div>
            </div>
        </>
    );
}
export default GamePage;
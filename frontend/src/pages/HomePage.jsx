import { useState } from "react";
import RadioButton from "../Components/ui/RadioButton";
import { GameMode, PlayerType } from "../constants/enums";
import { GameRole } from "../constants/enums";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import TomJerry from "../assets/tomJerry.png";
import Title from "../assets/title.png";
import JerryFace from "../assets/jerryFace.png";
import TomFace from "../assets/tomFace.webp";


const HomePage = ()=>{
    const {state: gameState, actions} = useGame();
    const [gameMode, setGameMode] = useState(null);
    const [gameRole, setGameRole] = useState(null);
    const navigate = useNavigate();

    const handleGameStart = () => {
        if (!gameMode) {
            alert("Choose game mode");
            return;
        }
        if (gameMode === GameMode.HumanVsComputer && !gameRole) {
            alert("Choose game role");
            return;
        }

        switch (gameMode) {
            case GameMode.HumanVsHuman:
                actions.setHiderType(PlayerType.Human);
                actions.setSeekerType(PlayerType.Human);
                break;
            case GameMode.ComputerVsComputer:
                actions.setHiderType(PlayerType.Computer);
                actions.setSeekerType(PlayerType.Computer);
                break;
            case GameMode.HumanVsComputer:
                actions.setHiderType(gameRole === GameRole.Hider ? PlayerType.Human : PlayerType.Computer);
                actions.setSeekerType(gameRole === GameRole.Seeker ? PlayerType.Human : PlayerType.Computer);
                break;
            default:
                break;
        }

        actions.generateNewGrid();
        navigate("/game");
    };
    
    return (
        <div className="h-max flex flex-col items-center justify-center gap-y-4">
            <div className="w-full flex flex-col items-center justify-center gap-y-4 bg-white bg-opacity-20 backdrop-blur-3xl p-8 rounded-4xl shadow-lg">
                <div className="w-full">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Game setup</h2>
                    <p className="text-l font-medium mb-4 text-gray-700">Choose your game options to begin</p>

                </div>
                <div className="w-full">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Select Game mode:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <RadioButton
                            icon="🧠"
                            value={GameMode.HumanVsComputer}
                            checked={gameMode === GameMode.HumanVsComputer}
                            onChange={() => setGameMode(GameMode.HumanVsComputer)}
                            label="Human vs AI"
                        />
                        <RadioButton
                            icon="👥"
                            value={GameMode.HumanVsHuman}
                            checked={gameMode === GameMode.HumanVsHuman}
                            onChange={() => setGameMode(GameMode.HumanVsHuman)}
                            label="Human vs Human"
                        />
                        <RadioButton
                            icon="🤖"
                            value={GameMode.ComputerVsComputer}
                            checked={gameMode === GameMode.ComputerVsComputer}
                            onChange={() => setGameMode(GameMode.ComputerVsComputer)}
                            label="AI vs AI"
                        />
                    </div>
                </div>
                {gameMode === GameMode.HumanVsComputer && (
                    <div className="w-full">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">Select Your Role:</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <RadioButton
                                icon={TomFace}
                                value={GameRole.Hider}
                                checked={gameRole === GameRole.Seeker}
                                onChange={() => setGameRole(GameRole.Seeker)}
                                label="Seeker"
                            />
                            <RadioButton
                                icon={JerryFace}
                                value={GameRole.Hider}
                                checked={gameRole === GameRole.Hider}
                                onChange={() => setGameRole(GameRole.Hider)}
                                label="Hider"
                            />
                        </div>
                    </div>)}

                <div className="w-full p-4">
                    <label htmlFor="rangeInput" className="block text-lg font-bold mb-2">
                        Grid Size:
                        <span aria-live="polite" className="ml-1">
                        {gameState.size}×{gameState.size}
                        </span>
                    </label>

                    <input
                        id="rangeInput"
                        type="range"
                        min={3}
                        max={6}
                        step={1}
                        value={gameState.size}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-sky-200 accent-green-400 hover:accent-green-600 "
                        onChange={e => actions.setSize(parseInt(e.target.value, 10))}
                        aria-valuemin={3}
                        aria-valuemax={6}
                        aria-valuenow={gameState.size}
                    />

                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>3×3</span>
                        <span>4×4</span>
                        <span>5×5</span>
                        <span>6×6</span>
                    </div>
                </div>
                <div className="w-full">
                    <button
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                        onClick={handleGameStart}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
import Cell from "./Cell";
import {useGame} from "../../context/GameContext";
import { GameRole } from "../../constants/enums";

const GameGrid = () => {
    const {state: gameState, actions} = useGame();
    const {grid, size, hiderChoice, seekerChoice} = gameState;

    const columnClass = {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
    }[size] || "grid-cols-1";


    const handleCellClick = (x, y) => {
        if (gameState.gameRole === GameRole.Hider) {
            actions.setHiderChoice({ x, y });
        } else {
            actions.setSeekerChoice({ x, y });
        }
    };
    return (
        <div className={`
            grid gap-2 ${columnClass} max-h-screen w-full
            bg-white rounded-2xl p-4
        `} >
            {grid.map((row, i) =>
                row.map((cell, j) => (
                    <Cell
                        key={`${i}-${j}`}
                        x={i}
                        y={j}
                        level={cell}
                        hiderChoice={hiderChoice}
                        seekerChoice={seekerChoice}
                        onClick={handleCellClick}
                    />
                ))
            )}
        </div>
    );
};
export default GameGrid;

import Cell from "./Cell";
import {useGame} from "../../context/GameContext";
import { GameRole } from "../../constants/enums";
import BoxContainer from "../ui/BoxContainer";

const GameGrid = ({onCellClick}) => {
    const {state: gameState, actions} = useGame();
    const {grid, size, hiderChoice, seekerChoice} = gameState;

    const columnClass = {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
    }[size] || "grid-cols-1";

    return (
        <BoxContainer className={`
            grid gap-2 ${columnClass} max-h-screen w-full
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
                        onClick={onCellClick}
                    />
                ))
            )}
        </BoxContainer>
    );
};
export default GameGrid;

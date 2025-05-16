import { createContext, useContext, useReducer } from "react";
import { gameReducer, initialGameState } from "../game/gameReducer";
import { GameActions } from "../game/GameActions";
import { generateRandomGrid } from "../game/utils";
import { GameRole } from "../constants/enums";

const GameContext = createContext();

export function GameProvider({ children }){
    const [state, dispatch] = useReducer(gameReducer, initialGameState);

    const actions = {
        setSize: size => dispatch({type: GameActions.setSize, payload: size}),
        generateNewGrid: ()=> dispatch({type: GameActions.generateNewGrid, payload: generateRandomGrid(state.size)}),
        increamentHiderScore: increase => dispatch({type: GameActions.setHiderScore, payload: (state.hiderScore + increase)}),
        setHiderChoice: (x, y) => dispatch({type: GameActions.setHiderChoice, payload: {x, y}}),
        setHiderType: type => dispatch({type: GameActions.setHiderType, payload: type}),
        increamentSeekerScore: increase => dispatch({type: GameActions.setSeekerScore, payload: (state.seekerScore + increase)}),
        setSeekerChoice: (x, y) => dispatch({type: GameActions.setSeekerChoice, payload: {x, y}}),
        setSeekerType: type => dispatch({type: GameActions.setSeekerType, payload: type}),
        switchTurn: ()=> dispatch({type: GameActions.setTurn, payload: (state.turn == GameRole.Hider?GameRole.Seeker:GameRole.Hider)}),
        setRoundWinner: winner => dispatch({type: GameActions.setRoundWinner, payload: winner}),
        increamentRoundCount: ()=> dispatch({type: GameActions.setRoundCount, payload: (state.roundCount + 1)}),
    }

    return (
        <GameContext.Provider value={{state, actions}}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used inside GameProvider');
    return context;
}
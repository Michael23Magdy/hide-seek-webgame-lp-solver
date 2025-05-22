import { createContext, useContext, useReducer } from "react";
import { gameReducer, initialGameState } from "../game/gameReducer";
import { GameActions } from "../game/GameActions";
import { generateRandomGrid } from "../game/utils";
import { GameRole } from "../constants/enums";

const GameContext = createContext();

export function GameProvider({ children }){
    const [state, dispatch] = useReducer(gameReducer, initialGameState);

    const actions = {
        setNoRows: size => dispatch({type: GameActions.setNoRows, payload: size}),
        setNoCols: size => dispatch({type: GameActions.setNoCols, payload: size}),
        generateNewGrid: ()=> dispatch({type: GameActions.generateNewGrid, payload: generateRandomGrid(state.noRows, state.noCols)}),

        increamentHiderScore: increase => dispatch({type: GameActions.setHiderScore, payload: (state.hiderScore + increase)}),
        increamentHiderGamesWon: () => dispatch({type: GameActions.setHiderGamesWon, payload: (state.hiderGamesWon + 1)}),
        setHiderChoice: (x, y) => dispatch({type: GameActions.setHiderChoice, payload: {x, y}}),
        setHiderType: type => dispatch({type: GameActions.setHiderType, payload: type}),

        increamentSeekerScore: increase => dispatch({type: GameActions.setSeekerScore, payload: (state.seekerScore + increase)}),
        increamentSeekerGamesWon: () => dispatch({type: GameActions.setSeekerGamesWon, payload: (state.seekerGamesWon + 1)}),
        setSeekerChoice: (x, y) => dispatch({type: GameActions.setSeekerChoice, payload: {x, y}}),
        setSeekerType: type => dispatch({type: GameActions.setSeekerType, payload: type}),

        setTurn: player => dispatch({type: GameActions.setTurn, payload: player}),
        setRoundWinner: winner => dispatch({type: GameActions.setRoundWinner, payload: winner}),
        increamentRoundCount: ()=> dispatch({type: GameActions.setRoundCount, payload: (state.roundCount + 1)}),

        resetHiderScore: () => dispatch({type: GameActions.setHiderScore, payload: 0}),
        resetSeekerScore: () => dispatch({type: GameActions.setSeekerScore, payload: 0}),
        resetHiderGamesWon: () => dispatch({type: GameActions.setHiderGamesWon, payload: 0}),
        resetSeekerGamesWon: () => dispatch({type: GameActions.setSeekerGamesWon, payload: 0}),
        resetRoundCount: ()=> dispatch({type: GameActions.setRoundCount, payload: 0}),
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
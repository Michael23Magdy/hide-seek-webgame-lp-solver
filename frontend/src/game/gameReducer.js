import { GameRole, PlayerType } from "../constants/enums";
import { GameActions } from "./GameActions";

export const initialGameState = {
    size: 3,
    grid: [],
    hiderScore: 0,
    hiderType: PlayerType.Human,
    hiderChoice: {
        x: null,
        y: null,
    },
    
    seekerScore: 0,
    seekerType: PlayerType.Computer,
    seekerChoice: {
        x: null,
        y: null,
    },
    turn: GameRole.Hider,
    roundWinner: null,
    roundCount: 0,
}

export function gameReducer(state, action){
    switch(action.type){
        case GameActions.setSize:
            return {...state, size: action.payload};

        case GameActions.generateNewGrid:
            return {...state, grid: action.payload};

        case GameActions.setHiderScore:
            return {...state, hiderScore: action.payload};

        case GameActions.setHiderChoice:
            return {...state, hiderChoice: action.payload};

        case GameActions.setHiderType:
            return {...state, hiderType: action.payload};
        
        case GameActions.setSeekerScore:
            return {...state, seekerScore: action.payload};

        case GameActions.setSeekerChoice:
            return {...state, seekerChoice: action.payload};

        case GameActions.setSeekerType:
            return {...state, seekerType: action.payload};

        case GameActions.setTurn:
            return {...state, turn: action.payload}

        case GameActions.setRoundWinner:
            return {...state, roundWinner: action.payload}

        case GameActions.setRoundCount:
            return {...state, roundCount: action.payload}

        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}
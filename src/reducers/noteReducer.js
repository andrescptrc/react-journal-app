import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const noteReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.notesAddNew:
            return {
                ...state,
                notes: [ ...state.notes, action.payload ]
            }

        case types.notesActive:
            return {
                ...state,
                active: action.payload
            }

        case types.notesLoad:
            return {
                ...state,
                notes: action.payload
            }

        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map( note => note.id === action.payload.id ? action.payload : note  )
            }

        case types.notesDeleted:
            return {
                ...state,
                notes: state.notes.filter( note => note.id !== action.payload )
            }

        case types.notesLogoutCleaning:
            return initialState;
    
        default:
            return state;
    }

}
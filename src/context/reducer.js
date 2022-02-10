import React from "react";
export const ContextApp = React.createContext();

export const initialState = {
    notes: [],
    activeNote: {},
    isActiveForm: true,
};

export const  notesReducer = (state, action) => {
    switch (action.type) {
      case "toogleNoteForm":
        return {
          ...state,
          isActiveForm: action.payload.isActive,
          activeNote: action.payload.activeNote || {},
        };
      case "removeNote":
        return {
          ...state,
          notes: state.notes.filter(el => el.id !== action.payload.id),
          activeNote: {}
        };
        case "createNote":
          return {
            ...state,
            notes: [...state.notes, action.payload.note],
          };
          case "saveNote":
            return {
              ...state,
              notes: state.notes.map(el => el.id === action.payload.note.id ? action.payload.note : el),
            };
      default: {
        return state;
      }
    }
  }
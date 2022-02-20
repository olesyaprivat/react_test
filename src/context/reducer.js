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
          isActiveForm: action.isActiveForm,
          activeNote: action.activeNote || {},
        }
      case "removeNote":
        
        return {
          ...state,
          notes: state.notes.filter(el => el.id !== action.noteId),
          activeNote: {}
        };
        case "createNote":
          return {
            ...state,
            notes: [...state.notes, action.note],
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
  export const toogleNoteForm = (dispatch) => (isActiveForm, activeNote) =>
  {
    return dispatch({
      type: "toogleNoteForm",
      isActiveForm,
      activeNote
    });
  }
  export const removeNote = (dispatch) => (noteId) =>
  {
    return dispatch({
      type: "removeNote",
      noteId
    });
  }
  export const createNote = (dispatch) => (note) =>
  {
    return dispatch({
      type: "createNote",
      note
    });
  }
  export const saveNote = (dispatch) => (isActiveForm, note) =>
  {
    return dispatch({
      type: "saveNote",
      isActiveForm,
      note
    });
  }


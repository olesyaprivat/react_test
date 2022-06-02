import React, {useContext, useState} from 'react';
import { initialState, toogleNoteForm, removeNote, createNote, saveNote} from './reducer';


export const NoteListContext = React.createContext([initialState, () => undefined]);

export const useListState = () => {
    const [state, dispatch] = useContext(NoteListContext)
    const [actions] = useState(() => ({
        toogleNoteForm: toogleNoteForm(dispatch),
        removeNote: removeNote(dispatch),
        createNote: createNote(dispatch),
        saveNote: saveNote(dispatch),
    }))

    return [state, actions];
}
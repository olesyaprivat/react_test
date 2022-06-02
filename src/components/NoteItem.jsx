import React, { useMemo } from "react";
import {useListState} from "../context/context.js";
import { isEmpty } from "lodash";

const NoteItemView  = ({note, index, activeNote, notes, toogleNoteForm, removeNote}) => {

    const indexActive = useMemo(()=> { 
        return !isEmpty(activeNote) && notes.findIndex(el => el.id === activeNote.id)
      }, [activeNote, notes])

    const isActiveBlock =  useMemo(()=> { 
        return indexActive === index
      }, [indexActive, index])

    function edit(event) {
        event.stopPropagation();
        toogleNoteForm( true, note )
    }
    function remove(event) {
        event.stopPropagation();
        removeNote(note.id)
    }
    return (
        <div className={`post-wrapper p-3 mb-3 cursor-pointer ${isActiveBlock  ? "active" : ""}`} 
             onClick={() => toogleNoteForm(false, note)}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="d-flex">
                <button className="btn btn-primary" onClick={edit}>Edit</button>
                <button className="btn btn-danger ms-3" onClick={remove}>Delete</button>
            </div>
        </div>
    );
}

const NoteItem = ({note, index}) => {
    const [state, actions] = useListState();
    return <NoteItemView note={note} 
                         index={index}
                         notes={state.notes} 
                         activeNote={state.activeNote}
                         toogleNoteForm={actions.toogleNoteForm} 
                         removeNote={actions.removeNote} />
  }; 

export default NoteItem;
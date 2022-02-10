import React, {useContext} from "react";
import NoteItem from "./NoteItem";
import {ContextApp} from "../context/reducer.js";
const NotesList = () => {
  const {state, dispatch} = useContext(ContextApp);
    return (
        <div className="post-list w-50">
        <div className="d-flex justify-content-between mb-2">
          <h2>Note list</h2>
          <button className="btn btn-primary" onClick={() => dispatch({ type: "toogleNoteForm", payload: { isActive: true} },)}>
            Create note
          </button>
        </div>
        {state.notes.map((note, index) => 
          <NoteItem index={index} note={note} key={note.id} />
        )}  
       </div>
    );
}
export default NotesList;
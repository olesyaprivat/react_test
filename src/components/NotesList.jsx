import React  from "react";
import NoteItem from "./NoteItem";
import {useListState} from "../context/context.js";

const NotesListView = ({ notes, toogleNoteForm }) => {
  // debugger;
    return (
        <div className="post-list w-50">
        <div className="d-flex justify-content-between mb-2">
          <h2>Note list</h2>
          <button className="btn btn-primary" onClick={() => toogleNoteForm(true)}>
            Create note
          </button>
        </div>
        {notes.map((note, index) => 
          <NoteItem index={index} note={note} key={note.id} />
        )}  
       </div>
    );
}

const NotesList = () => {
  const [state, actions] = useListState();
  return <NotesListView notes={state.notes} toogleNoteForm={actions.toogleNoteForm} />
};

export default NotesList; 
import React from 'react';
import {useListState} from "../context/context.js";

const NoteBlockView = function ({activeNote}) {
    return (
        <div>
            <h2>{activeNote.title}</h2>
            <p>{activeNote.content}</p>
        </div>
    )
}


const NoteBlock = () => {
    const [state, actions] = useListState();
    return <NoteBlockView activeNote={state.activeNote} />
  };
  
  export default NoteBlock; 
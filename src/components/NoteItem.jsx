import React, { useContext, useMemo } from "react";
import ReactHtmlParser from "react-html-parser";
import {ContextApp} from "../context/reducer.js";
import { isEmpty } from "lodash";

const NoteItem = ({note, index}) => {

    const {state, dispatch} = useContext(ContextApp);

    const indexActive = useMemo(()=> { 
        return !isEmpty(state.activeNote) && state.notes.findIndex(el => el.id === state.activeNote.id)
      }, [state.activeNote, state.notes])

    function edit(event) {
        event.stopPropagation();
        dispatch({ type: "toogleNoteForm", 
        payload: {
            isActive: true, 
            activeNote: note} 
        },)
    }
    function remove(event) {
        event.stopPropagation();
        dispatch({ type: "toogleNoteForm", 
        payload: {
            isActive: true} 
        },)
    }

    function transform(node) {
        if (node.type === "tag" && (node.name === "script" || node.name === "iframe")) {
          return null;
        }
    }
    return (
        <div className={`post-wrapper p-3 mb-3 cursor-pointer ${indexActive === index  ? "active" : ""}`} onClick={() => dispatch({ type: "toogleNoteForm", 
            payload: {
                isActive: true, 
                activeNote: note} 
            },)}>
            <h3>{note.title}</h3>
            <p>{ReactHtmlParser(note.content, [transform])}</p>
            <div className="d-flex">
                <button className="btn btn-primary" onClick={edit}>Edit</button>
                <button className="btn btn-danger ms-3" onClick={remove}>Delete</button>
            </div>
        </div>
    );
}
export default NoteItem;
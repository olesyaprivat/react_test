import React, {useContext}  from 'react';
import ReactHtmlParser from "react-html-parser";
import {ContextApp} from "../context/reducer.js";

const NoteBlock = function () {
    const {state} = useContext(ContextApp);
    
    function transform(node) {
        if (node.type === "tag" && (node.name === "script" || node.name === "iframe")) {
          return null;
        }
    }
    return (
        <div>
            <h2>{state.activeNote.title}</h2>
            <p>{ReactHtmlParser(state.activeNote.content, [transform])}</p>
        </div>
    )
}
export default NoteBlock;
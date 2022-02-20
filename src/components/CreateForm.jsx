import React, {useState, useEffect, useMemo} from 'react';
import {  uniqueId, isEmpty  } from 'lodash';
import {useListState} from "../context/context.js";
import ReactHtmlParser from "react-html-parser";
const CreateFormView = function ({activeNote, createNote, saveNote, toogleNoteForm}) {

    const [title, setTitle] = useState ('');
    const [content, setContent] = useState ('');
    const [isEdit, setIsEdit] = useState (false);
    const maxLengthTitle = 100;
    const maxLengthContent = 1000;

    const transform =  (node) => {
        if (node.type === "tag" && (node.name === "script" || node.name === "iframe")) {
          return null;
        }
    }

    const resetForm = () => {setTitle(''); setContent('');}

    useEffect(()=> {
        if(!isEmpty(activeNote)) {
            setIsEdit(true);
            setContent(ReactHtmlParser(activeNote.content, [transform]));
            setTitle(activeNote.title);
        }else {
            setIsEdit(false);
            resetForm();
        }
    }, [activeNote])

    const isValidText = useMemo(()=> { 
        return maxLengthTitle >= title.length;
    }, [maxLengthTitle, title])

    const isValidContent = useMemo(()=> { 
        return maxLengthContent >= content.length;
    }, [maxLengthContent, content])

    const addNote = (event) => {
        event.preventDefault();
        const newNote = {
            id: uniqueId('note_'),
            title,
            content
        }
        createNote(newNote)
        resetForm();
    };
    const save = (event) => {
        event.preventDefault();  
        saveNote({activeNote, title, content})   
        resetForm();
        setIsEdit(false);
    }   
    const cancel =(event) => {
        event.preventDefault()
        toogleNoteForm(false)
    }
    const handleKeyPress = (event) => {
        if(event.key === '<' || event.key === '>') {
            event.preventDefault();
        }
    }
    return (
        <div>
            <h2>Create new note</h2>
            <form>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        type="text" 
                        className='form-control'/>
                    {!isValidText &&
                        <span className="text-danger">Maximum field length exceeded</span>
                    }
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Content</label>
                    <textarea  
                        value={content} 
                        onChange={e => setContent(e.target.value)} 
                        type="text" 
                        onKeyPress={handleKeyPress} 
                        className='form-control'>
                    </textarea>
                    {!isValidContent &&
                        <span className="text-danger">Note text exceeded by {content.length - maxLengthContent} characters</span>
                    }
                </div>
                <div className='d-flex'>
                <button 
                    disabled={!isValidText || !isValidContent || !title || !content} 
                    className='btn btn-primary' 
                    onClick={isEdit ? save : addNote}>{isEdit ? 'Save' : 'Create'}
                </button>
                <button  className='btn btn-outline-primary ms-3' onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

const CreateForm = () => {
    const [state, actions] = useListState();
    return <CreateFormView activeNote={state.activeNote} 
                            toogleNoteForm={actions.toogleNoteForm} 
                            saveNote={actions.saveNote} 
                            createNote={actions.createNote} />
  }; 

export default CreateForm;
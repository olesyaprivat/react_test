import React, {useState, useEffect, useMemo, useContext} from 'react';
import {  uniqueId, isEmpty  } from 'lodash';
import {ContextApp} from "../context/reducer.js";

const CreateForm = function () {

    const {state, dispatch} = useContext(ContextApp);

    const [title, setTitle] = useState ('');
    const [content, setContent] = useState ('');
    const [isEdit, setIsEdit] = useState (false);
    const maxLengthTitle = 100;
    const maxLengthContent = 1000;

    useEffect(()=> {
        if(!isEmpty(state.activeNote)) {
            setIsEdit(true);
            setContent(state.activeNote.content);
            setTitle(state.activeNote.title);
        }else {
            setIsEdit(false);
            setContent('');
            setTitle('');
        }
    }, [state.activeNote])

    const isValidText = useMemo(()=> { 
        return maxLengthTitle <= title.length
    }, [maxLengthTitle, title])

    const isValidContent = useMemo(()=> { 
        return maxLengthContent <= content.length
    }, [maxLengthContent, content])

    const addPost = (event) => {
        event.preventDefault();
        const newNote = {
            id: uniqueId('note_'),
            title,
            content
        }
        dispatch({ type: "createNote", payload: {note: newNote} },)
        setTitle('');
        setContent('');
    };
    const save = (event) => {
        event.preventDefault();     
        dispatch({ type: "saveNote", payload: {note: {...state.activeNote, title, content}} },)  
        setTitle('');
        setContent('');
        setIsEdit(false);
    }   
    const cancel =(event) => {
        event.preventDefault()
        dispatch({ type: "toogleNoteForm", payload: {isActive: false} },)
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
                        maxLength={maxLengthTitle} 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        type="text" 
                        className='form-control'/>
                    {isValidText &&
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
                    {isValidContent &&
                        <span className="text-danger">Note text exceeded by {content.length - maxLengthContent} characters</span>
                    }
                </div>
                <div className='d-flex'>
                <button 
                    disabled={!isValidText || !isValidContent} 
                    className='btn btn-primary' 
                    onClick={isEdit ? save : addPost}>{isEdit ? 'Save' : 'Create'}
                </button>
                <button  className='btn btn-outline-primary ms-3' onClick={cancel}>Cancel</button>
                </div>
            </form>
            
        </div>

    )
}
export default CreateForm;
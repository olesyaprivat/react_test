import React, {useState, useEffect, useMemo} from 'react';
import {  uniqueId, isEmpty  } from 'lodash';

const CreateForm = function ({createPost, savePost, post, maxLengthTitle, cancelForm}) {
    const [title, setTitle] = useState ('');
    const [content, setContent] = useState ('');
    const [isEdit, setIsEdit] = useState (false);

    useEffect(()=> {
        if(!isEmpty(post)) {
            setTitle(post.title);
            setContent(post.content);
            setIsEdit(true);
        }else {
            setTitle('');
            setContent('');
            setIsEdit(false);
        }
    }, [post])

    const isShowError = useMemo(()=> { 
        return maxLengthTitle <= (title && title.length) ? true : false;
    }, [maxLengthTitle, title])

    const addPost = (event) => {
        event.preventDefault();
        const newPost = {
            id: uniqueId('post_'),
            title,
            content
        }
        createPost(newPost);
        setTitle('');
        setContent('');
    };
    const save = (event) => {
        event.preventDefault();       
        savePost({...post, title, content});
        setTitle('');
        setContent('');
        setIsEdit(false);
    }   
    const cancel =(event) => {
        event.preventDefault()
        cancelForm();
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
                    <input maxLength={maxLengthTitle} value={title || ''} onChange={e => setTitle(e.target.value)} type="text" className='form-control'/>
                    {isShowError ? <span className="text-danger">Maximum field length exceeded</span> : ''}
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Content</label>
                    <textarea  value={content} onChange={e => setContent(e.target.value)} type="text" onKeyPress={handleKeyPress} className='form-control'></textarea>
                </div>
                <div className='d-flex'>
                    {
                        !isEdit ? <button className='btn btn-primary' onClick={addPost}>Create</button>
                        : <button className='btn btn-primary' onClick={save}>Save</button>
                    }
                <button className='btn btn-outline-primary ms-3' onClick={cancel}>Cancel</button>
                </div>
            </form>
            
        </div>

    )
}
export default CreateForm;
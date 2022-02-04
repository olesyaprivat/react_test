
import { isEmpty } from "lodash";
import { useState, useMemo, useEffect } from "react";
import CreateForm from "./components/CreateForm";
import PostList from "./components/PostList";
import PostBlock from "./components/PostBlock";
function App() {
  const [posts, setPosts] = useState([]);
  const [isActiveForm, setIsActiveForm] = useState(true);
  const [activePost, setActivePost] = useState({});
  useEffect(()=> {
    document.querySelectorAll('a').length && document.querySelectorAll('a').forEach(el => {
      el.addEventListener('click', () => {
        alert('Do you really want to follow the link?')
      })
    })
  }, [posts, isActiveForm])
  const indexActive = useMemo(()=> { 
    return !isEmpty(activePost) && posts.findIndex(el => el.id === activePost.id)
  }, [activePost, posts])

  const createPost = (item) => {
    setPosts([...posts, item]);
  }
  const removePost = (item) => {
    setActivePost({});
    setPosts(posts.filter(el => el.id !== item.id));
  }
  const savePost = (item) => {
    setPosts(posts.map(el => el.id === item.id ? item : el));
  }
  const openForm = () => {
    setIsActiveForm (true);
    setActivePost({});
  }
  const cancelForm = () => {
    setIsActiveForm (false);
    setActivePost({});
  }
  const editPost = (item) => {
    setActivePost(item);
    setIsActiveForm (true);
  }
  const openPost = (item) => {
    setActivePost(item);
    setIsActiveForm (false);
  }
  
  return (
 <div className="d-flex w-100 p-3">
   <div className="w-50 pe-5">
    {
      isActiveForm ? <CreateForm createPost={createPost} savePost={savePost} post={activePost} cancelForm={cancelForm}/>
      : <PostBlock post={activePost} />
    }
    </div>
      <PostList posts={posts} openForm={openForm} removePost={removePost} editPost={editPost} openPost={openPost} indexActive={indexActive} />
 </div>
  );
}

export default App;

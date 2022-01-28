import React from "react";
import PostItem from "./PostItem";

const PostList = ({posts, removePost, editPost, openPost, openForm, indexActive}) => {

    return (
        <div className="post-list w-50">
        <div className="d-flex justify-content-between mb-2">
          <h2>Note list</h2>
          <button className="btn btn-primary" onClick={openForm}>Create note</button>
        </div>
        {posts.map((post, index) => 
          <PostItem removePost={removePost} index={index} indexActive={indexActive} editPost={editPost} post={post} openPost={openPost} key={post.id} />
        )}  
       </div>
    );
}
export default PostList;
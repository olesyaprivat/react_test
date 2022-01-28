import React from "react";
import ReactHtmlParser from "react-html-parser";

const PostItem = ({post, editPost, removePost, openPost, indexActive, index}) => {
    function edit(event) {
        event.stopPropagation();
        editPost(post);
    }
    function remove(event) {
        event.stopPropagation();
        removePost(post);
    }

    function transform(node) {
        if (node.type === "tag" && (node.name === "script" || node.name === "iframe")) {
          return null;
        }
    }
    return (
        <div className={`post-wrapper p-3 mb-3 cursor-pointer ${indexActive === index  ? "active" : ""}`} onClick={() => openPost(post)}>
            <h3>{post.title}</h3>
            <p>{ReactHtmlParser(post.content, [transform])}</p>
            <div className="d-flex">
                <button className="btn btn-primary" onClick={edit}>Edit</button>
                <button className="btn btn-danger ms-3" onClick={remove}>Delete</button>
            </div>
        </div>
    );
}
export default PostItem;
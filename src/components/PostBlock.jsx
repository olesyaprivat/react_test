import React  from 'react';
import ReactHtmlParser from "react-html-parser";

const PostBlock = function ({post}) {
    function transform(node) {
        if (node.type === "tag" && (node.name === "script" || node.name === "iframe")) {
          return null;
        }
    }
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{ReactHtmlParser(post.content, [transform])}</p>
        </div>
    )
}
export default PostBlock;
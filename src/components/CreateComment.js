import React from "react";
import { Button, Comment, Form, Image } from "semantic-ui-react";

function CreateComment(props) {
  console.log(props.data.userRefId)
  return (
    
    <div>
      <Comment.Group>
        <Comment className="comment-container">
          {/* <img src={props.data.userRefId.userImage}/> */}
          <Image
            size="mini"
            as='a'
            src={props.data.userRefId.userImage}
          />
          <Comment.Author as="a">{props.data.userRefId.username}</Comment.Author>
            <Comment.Text>{props.data.commentBody}</Comment.Text>
            
        </Comment>
      </Comment.Group>
    </div>
  );
}

export default CreateComment;

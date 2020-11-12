import React from "react";
import { Button, Comment, Form, Image } from "semantic-ui-react";
import "./styles/CreateComments.css";

function CreateComment(props) {
  console.log(props.data.userRefId);
  console.log(props.data);

  return (
    <div className="comment-grouping">
      <Comment.Group className="comment-container">
        <Comment className="comment-container">
          <Image size="mini" as="a" src={props.data.userRefId.userImage} />

          <Comment.Author as="a">
            {props.data.userRefId.username}
          </Comment.Author>
          <Comment.Metadata>Flag: {props.data.commentFlag}</Comment.Metadata>
          <Comment.Text>{props.data.commentBody}</Comment.Text>
        </Comment>
      </Comment.Group>
    </div>
  );
}

export default CreateComment;

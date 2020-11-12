import React from "react";
import { Link } from "react-router-dom";
import { Button, Comment, Form, Image } from "semantic-ui-react";
import "./styles/CreateComments.css";

function CreateComment(props) {
  console.log(props.data.userRefId);
  console.log(props.data);

  

  return (
    <div className="comment-grouping">
      <Comment.Group className="comment-container">
        <Comment className="comment-container">
          <Image size="tiny" as="a" src={props.data.userRefId.userImage} />

          <Comment.Author as="a">
          <Link to={`/profile/${props.data.userRefId._id}`}>
            {props.data.userRefId.username}
            </Link>
          </Comment.Author>
          <Comment.Metadata>
          <div>Flag: {props.data.commentFlag}</div>
          <div>App Version: v.{props.data.projectVersion}</div>
          <div>Posted: </div>
          </Comment.Metadata>
          <Comment.Text>{props.data.commentBody}</Comment.Text>
        </Comment>
      </Comment.Group>
    </div>
  );
}

export default CreateComment;

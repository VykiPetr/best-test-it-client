import React from "react";
import { Button, Comment, Form, Image } from "semantic-ui-react";

function CreateComment(props) {
  return (
    <div>
      <Comment.Group >
        <Comment className="comment-container">
          <Image
            size="mini"
            as='a'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrwrCagQl7yLi6VRkar9jw9e2gEfFKTECi5g&usqp=CAU"
          />
          <Comment.Author as="a">{props.data.userRefId.username}</Comment.Author>
            <Comment.Text>{props.data.commentBody}</Comment.Text>
        </Comment>
      </Comment.Group>
    </div>
  );
}

export default CreateComment;

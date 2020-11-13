import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { Button, Form } from "semantic-ui-react";
import Select from "react-select";
import CreateComment from "./CreateComment";
import "./styles/AllComments.css";

let flagList = [
  { value: "Bug", label: "Bug" },
  { value: "Good feature", label: "Good feature" },
  { value: "Bad feature", label: "Bad feature" },
];

function AllComments(props) {
  const [comments, setComments] = useState([]);
  const [ProjectVersion, setProjectVersion] = useState("");
  const [commentBox, setCommentBox] = useState('')
  //doing these 2 axios requests to make sure we have the project id and the comments on load
  useEffect(() => {
    axios
      .get(`${API_URL}/project/${props.match.params.projectId}`, {
        withCredentials: true,
      })
      .then((response1) => {
        setProjectVersion(response1.data.projectVersion);
        axios
          .get(`${API_URL}/comments/${props.match.params.projectId}`, {
            withCredentials: true,
          })
          .then((response2) => {
            console.log(response2.data);
            setComments(response2.data.comments);
          });
      });
    return () => {};
  }, []);

  const handleCommentCreation = (e) => {
    e.preventDefault();
    const { flag } = e.target;
    let commentStructure = {
      commentBody: commentBox,
      commentFlag: flag.value,
      creatorCheck: false,
      projectVersion: ProjectVersion,
    };
    axios
      .post(
        `${API_URL}/comment/${props.match.params.projectId}`,
        commentStructure,
        { withCredentials: true }
      )
      .then(() => {
        axios
          .get(`${API_URL}/comments/${props.match.params.projectId}`, {
            withCredentials: true,
          })
          .then((response2) => {
            setComments(response2.data.comments);
            console.log(props)
            setCommentBox('')
          });
      });
  };

  const handleCommentBox = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setCommentBox(e.target.value)
  }
 
  return (
    <div className="all-comments-section">
      <Form className="comment-form" reply onSubmit={handleCommentCreation}>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="flag"
          options={flagList}
          labelPosition="right"
          placeholder="What category is your comment?"
        />

        <Form.TextArea
          name="commentBody"
          placeholder="Enter your comment here"
          onChange={ (e) => { handleCommentBox(e) }}
          value={commentBox}
        />
        <Button
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
      <div className="comments-row">
        {comments.map((commentData, i) => {
          return (
            <div className="comment-group">
              <CreateComment data={commentData} key={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(AllComments);

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { Button, Form } from "semantic-ui-react";
import Select from "react-select";
import CreateComment from "./CreateComment";

let flagList = [
  { value: "bug", label: "Bug" },
  { value: "goodFeature", label: "Good Feature" },
  { value: "badFeature", label: "badFeature" },
];

function AllComments(props) {
  const [comments, setComments] = useState([]);
  const [ProjectVersion, setProjectVersion] = useState("");
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
    const { commentBody, flag } = e.target;
    let commentStructure = {
      commentBody: commentBody.value,
      flag: flag.value,
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
          console.log(response2.data);
          setComments(response2.data.comments);
        });
      });
  };

  return (
    <div>
      <Form reply onSubmit={handleCommentCreation}>
        <Form.TextArea name="commentBody" />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="flag"
          options={flagList}
          labelPosition="right"
        />
      </Form>
      {comments.map((commentData, i) => {
        return (
          <div>
            <CreateComment data={commentData} key={i} />
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(AllComments);

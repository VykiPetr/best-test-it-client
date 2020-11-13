import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import AllComments from "./AllComments";
import "./styles/ProjectView.css";

function ProjectView(props) {
  const [ProjectData, setProjectData] = useState({});
  const [LoggedInUser, setLoggedInUser] = useState(null);
  const [ProjectOwner, setProjectOwner] = useState(false);
  const [Likes, setLikes] = useState([]);
  const [tools, setTools] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/project/${props.match.params.projectId}`)
      .then((response) => {
        axios
          .get(`${API_URL}/user`, { withCredentials: true })
          .then((response2) => {
            setLoggedInUser(response2.data);
            setProjectData(response.data);
            setLoggedInUser(props.loggedIn);
            setTools(makeTools(response.data.appTools));
            setLikes(response.data.likes);
            if (response2.data._id === response.data.userRefId) {
              setProjectOwner(true);
            } else {
              setProjectOwner(false);
            }
          });
      });
  }, []);

  const makeTools = (tools) => {
    let toolsString = "";
    for (let i = 0; i < tools.length; i++) {
      toolsString += tools[i] + " ";
    }
    return toolsString;
  };

  const onLikeClick = (e) => {
    e.preventDefault();
    console.log("like button clicked");
    let data = {
      userId: LoggedInUser,
      projectId: ProjectData._id,
    };
    axios
      .post(`${API_URL}/projectLike`, data, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setLikes(response.data.likes);
      });
  };

  const onDeleteClick = (e) => {
    e.preventDefault();
    console.log("delete button clicked");
  };

  return (
    <div className="main-project-cont">
      <div className="description-comment-cont">
        <div className="main-description-header">
          <div className="descrciption-header">
            <div className="like-delete-buttons">
              {ProjectOwner ? (
                <Link to={`/edit-project/${ProjectData._id}`}>Edit</Link>
              ) : null}
              {ProjectOwner ? (
                <Link onClick={onDeleteClick}>Delete</Link>
              ) : null}
            </div>
            <div className="image-container">
              <img style={{ width: "150px" }} src={ProjectData.appLogo} />
            </div>
            <div className="like-version-container">
              <Link onClick={onLikeClick}>{Likes.length} Likes</Link>
              <p>{ProjectData.projectVersion}</p>
            </div>
          </div>
          <h1 className="header">{ProjectData.appName}</h1>
          <div className="tools-made-by-desc-container">
            <div>
              tools used
              {tools}
            </div>
            <div>
              <p>
                made by{" "}
                <Link to={`/profile/${ProjectData.userRefId}`}>User name</Link>
              </p>
              <p className="description-box">{ProjectData.appDescription}</p>
            </div>
          </div>
        </div>
        <div className="iframe-cont">
          <h2>
            Check it out{" "}
            <a target="_blank" href={`${ProjectData.deploymentLink}`}>
              {" "}
              Here!{" "}
            </a>
          </h2>

          <iframe
            className="iframe"
            src={ProjectData.deploymentLink}
            title="Iframe Example"></iframe>
        </div>
      </div>

      <div className="comment-cont">
        <div className="all-comment-cont">
          <AllComments project={ProjectData} />
        </div>
      </div>
    </div>
  );
}

export default ProjectView;

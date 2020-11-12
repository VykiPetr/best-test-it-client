import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import AllComments from "./AllComments";
import './styles/ProjectView.css'

function ProjectView(props) {
  const [ProjectData, setProjectData] = useState({});
  const [LoggedInUser, setLoggedInUser] = useState(null);
  const [ProjectOwner, setProjectOwner] = useState(false);
  const [Likes, setLikes] = useState([]);

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
            setLikes(response.data.likes);
            if (response2.data._id === response.data.userRefId) {
              setProjectOwner(true);
            } else {
              setProjectOwner(false);
            }
          });
      });
  }, []);

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
    <div>
      <div>
        <div>
          <div>
            <Link onClick={onLikeClick}>{Likes.length} Likes</Link>
            <p>{ProjectData.projectVersion}</p>
          </div>
          <div>
            <img
              style={{ width: "50px", height: "50px" }}
              src={ProjectData.appLogo}
            />
          </div>
          <div>
            {ProjectOwner ? (
              <Link to={`/edit-project/${ProjectData._id}`}>Edit</Link>
            ) : null}
            {ProjectOwner ? <Link onClick={onDeleteClick}>Delete</Link> : null}
          </div>
        </div>
        <h1>{ProjectData.appName}</h1>
        <div>
          <div>
            tools used
            {ProjectData.appTools}
          </div>
          <div>
            <p>
              made by{" "}
              <Link to={`/profile/${ProjectData.userRefId}`}>User name</Link>
            </p>
            <p>{ProjectData.appDescription}</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <iframe
            src={ProjectData.deploymentLink}
            title="Iframe Example"></iframe>
        </div>
        <div>
          <AllComments project={ProjectData} />
        </div>
      </div>
    </div>
  );
}

export default ProjectView;

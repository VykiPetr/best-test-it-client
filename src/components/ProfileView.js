import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectHeader from "./ProjectHeader";
import { API_URL } from "../config";
import "./styles/ProfileView.css";

function ProfileView(props) {
  const [profile, setProfile] = useState({});
  const [userProjects, setUserProjects] = useState([]);
  const [LoggedInUser, setLoggedInUser] = useState(null);

  const getProfileInfo = (response) => {
    axios
      .get(`${API_URL}/profile/${props.match.params.profileId}`, {
        withCredentials: true,
      })
      .then((response2) => {
        setProfile(response2.data);
        axios
          .get(`${API_URL}/userProjects/${props.match.params.profileId}`, {
            withCredentials: true,
          })
          .then((response3) => {
            setUserProjects(response3.data);
            if (response2.data._id === response._id) {
              setLoggedInUser(true);
            } else {
              setLoggedInUser(null);
            }
          });
      });
  };

  //component did mount does work/
  useEffect(() => {
    if (!props.loggedIn) {
      axios
        .get(`${API_URL}/user`, { withCredentials: true })
        .then((response) => {
          setLoggedInUser(response.data);
          getProfileInfo(response.data);
        });
    } else {
      getProfileInfo(props.loggedIn);
    }

    return () => {};
  }, []);

  if (!props.loggedIn) {
    return null;
  }
  return (
    <div className="main-profile-cont">
      <div className="top-cont">
        <div className="image-and-name-cont">
          <img
            src={profile.userImage}
            className="profile-image"
            alt="profile avatar"
          />
          <div className="username-edit-button-cont">
            <h2>{profile.username}</h2>
            {/* <button>Send Message</button> */}
            {LoggedInUser ? (
              <Link to={`/edit-profile/${props.loggedIn._id}`}>
                Edit profile
              </Link>
            ) : null}
          </div>
        </div>
        <div>
          <div className="profile-desc">{profile.mySkills}</div>
          <article>
            <p className="profile-desc">{profile.aboutMe}</p>
          </article>
        </div>
      </div>
      <h2>{profile.username} Projects</h2>
      <div className="projects-div">
        {userProjects.map((project, i) => {
          return <ProjectHeader project={project} key={i} />;
        })}
      </div>
      {LoggedInUser ? (
        <Link className="textStyle" to="/add-project">
          Add a project{" "}
        </Link>
      ) : null}
    </div>
  );
}

export default ProfileView;

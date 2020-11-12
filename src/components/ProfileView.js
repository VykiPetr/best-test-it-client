import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectHeader from "./ProjectHeader";
import { API_URL } from "../config";

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
        console.log("profile view loaded this", profile);
        axios
          .get(`${API_URL}/userProjects/${props.match.params.profileId}`, {
            withCredentials: true,
          })
          .then((response3) => {
            setUserProjects(response3.data);
            console.log("we got these projects", response3);
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
          console.log("not else");
          setLoggedInUser(response.data);
          getProfileInfo(response.data);
        });
    } else {
      console.log("else");
      getProfileInfo(props.loggedIn);
    }
    console.log(props.match.params);

    return () => {};
  }, []);

  if (!props.loggedIn) {
    return null;
  }
  return (
    <div>
      <div>
        <img
          src={profile.userImage}
          style={{ width: "50px", height: "50px" }}
          alt="profile avatar"
        />
        <div>
          <h2>{profile.username}</h2>
          {/* <button>Send Message</button> */}
          {LoggedInUser ? (
            <Link to={`/edit-profile/${props.loggedIn._id}`}>Edit profile</Link>
          ) : null}
        </div>
      </div>
      <div>
        <div>{profile.skills}</div>
        <article>
          <p>{profile.aboutMe}</p>
        </article>
      </div>
      <h2>{profile.username} Projects</h2>
      {userProjects.map((project, i) => {
        return <ProjectHeader project={project} key={i} />;
      })}
      {LoggedInUser ? <Link to="/add-project">Add a project </Link> : null}
    </div>
  );
}

export default ProfileView;

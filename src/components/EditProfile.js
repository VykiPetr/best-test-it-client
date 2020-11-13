import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Input } from "semantic-ui-react";
import "./styles/EditProfile.css";

function EditProfile(props) {
  const [profile, setProfile] = useState({});
  const [LoggedInUser, setLoggedInUser] = useState(null);
  const [LinkButton, setLinkButton] = useState(false);
  const [AboutMe, setAboutMe] = useState("");
  const [MySkills, setMySkills] = useState("");
  const [ProfileImage, setProfileImage] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/profile/${props.match.params.profileId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data);
        setAboutMe(response.data.aboutMe);
        setMySkills(response.data.mySkills);
        setProfileImage(response.data.userImage);
      });
    return () => {};
  }, []);

  const handleLinkButton = (e) => {
    e.preventDefault();
    if (LinkButton) {
      setLinkButton(false);
    } else {
      setLinkButton(true);
    }
  };

  const handleInputChange = (e, stateFn) => {
    stateFn(e.target.value);
  };

  return (
    <div className="main-cont">
      <div className="form-cont">
        <form
          className="form"
          onSubmit={(e) => {
            props.onProfileEdit(e, ProfileImage);
          }}>
          <h3>Anything you would like to tell about yourself?</h3>
          <div class="ui input">
            <Input
              name="aboutMe"
              type="text"
              onChange={(e) => {
                handleInputChange(e, setAboutMe);
              }}
              value={AboutMe}></Input>
          </div>
          <h3>What are your skills?</h3>
          <div class="ui input">
            <Input
              name="mySkills"
              type="text"
              onChange={(e) => {
                handleInputChange(e, setMySkills);
              }}
              value={MySkills}></Input>
          </div>
          <div className='image-handler-cont'>
            <div>
              <img
                src={ProfileImage}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div className="upload-link-handler-cont">
              {LinkButton ? (
                <div>
                  <h3>Paste it here!</h3>
                  <div class="ui input input-for-upload">
                    <Input
                      onChange={(e) => {
                        handleInputChange(e, setProfileImage);
                      }}
                      value={ProfileImage}
                      name="userImageLink"
                      type="text"></Input>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>Upload your profile picture</h3>
                  <input
                    type="file"
                    className="form-control"
                    name="uploadedUserImage"
                    id="image"
                  />
                </div>
              )}
              {LinkButton ? (
                <button className="textStyle" onClick={handleLinkButton}>
                  Or actually I want to upload
                </button>
              ) : (
                <button className="textStyle" onClick={handleLinkButton}>
                  I have a link!
                </button>
              )}
            </div>
          </div>
          <button className="textStyle" type="submit">
            Edit your profile!
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;

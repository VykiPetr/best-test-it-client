import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function EditProjectForm(props) {
  const [AppName, setAppName] = useState("");
  const [AppDescription, setAppDescription] = useState("");
  const [AppTools, setAppTools] = useState([]);
  const [DeploymentLink, setDeploymentLink] = useState("");
  const [RepoLink, setRepoLink] = useState("");
  const [ProjectVersion, setProjectVersion] = "";
  const [LinkButton, setLinkButton] = useState(false);
  const [Project, setProject] = useState({});

  //component mount
  useEffect(() => {
    axios
      .get(`${API_URL}/project/${props.match.params.projectId}`)
      .then((response) => {
        setProject(response.data);
        setAppName(response.data.appName)
        setAppDescription(response.data.appDescription);
        setAppTools(response.data.appTools);
        setDeploymentLink(response.data.deploymentLink);
        setRepoLink(response.data.repoLink);
        setProjectVersion(response.data.projectVersion);
      });

    return () => {};
  }, []);

  const handleLinkButton = () => {
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
        <form onSubmit={(e) => {props.onProjectEdit(e , Project._id)} }>
            <h3>Change the name here!</h3>
            <input name='appName' type='text' value={Project.appName}></input>
            
            <h3>The description</h3>
            <input name='appDescription' type='text' value={Project.appDescription}></input>
            
            <h3>What are you using to create/develop this</h3>
            <input name='appTools' type='text' value={Project.appTools}></input>
            
            <h3>Deployment link</h3>
            <input name='deploymentLink' type='text' value={Project.deploymentLink}></input>
            
            <h3>Repository link</h3>
            <input name='repoLink' type='text' value={Project.repoLink}></input>
            

      <h3>The description</h3>
      <input name="appDescription" onChange={ (e) => { handleInputChange(e, setAppDescription) } } type="text" value={Project.appDescription}></input>

      <h3>What are you using to create/develop this</h3>
      <input name="appTools" onChange={ (e) => { handleInputChange(e, setAppTools) } } type="text" value={Project.appTools}></input>

      <h3>Deployment link</h3>
      <input name="deploymentLink" onChange={ (e) => { handleInputChange(e, setDeploymentLink) } } type="text" value={Project.deploymentLink}></input>

      <h3>Repository link</h3>
      <input name="repoLink" onChange={ (e) => { handleInputChange(e, setRepoLink) } } type="text" value={Project.repoLink}></input>

      {LinkButton ? (
        <div>
          <h3>Upload your logo</h3>
          <input
            type="file"
            className="form-control"
            name="appLogo"
            id="image"
            value={Project.appLogo}
          />
        </div>
      ) : (
        <div>
          <h3>Paste it here!</h3>
          <input name="appLogo" type="text" value={Project.appLogo}></input>
        </div>
      )}
      {LinkButton ? (
        <button onClick={handleLinkButton}>Or actually I want to upload</button>
      ) : (
        <button onClick={handleLinkButton}>I have a link!</button>
      )}

      <h3>What version is it right now?</h3>
      <input
        name="projectVersion"
        type="text"
        value={Project.projectVersion}
      ></input>

      <button type="submit">Edit this project!</button>
    </form>
  );
}

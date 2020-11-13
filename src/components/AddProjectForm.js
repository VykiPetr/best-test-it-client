import React, { useState } from "react";
import Select from "react-select";
import { Input } from "semantic-ui-react";
import "./styles/AddProjectForm.css";

// import {appToolOptions} from '../toolsOptions.json'
const appToolOptions = [
  { value: "Javascript", label: "Javascript" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Beer", label: "Beer" },
  { value: "Express.js", label: "Express.js" },
  { value: "React", label: "React" },
  { value: "HTML", label: "HTML" },
  { value: "Angular", label: "Angular" },
  { value: "Ruby", label: "Ruby" },
  { value: "Yii", label: "Yii" },
  { value: "MeteorJS", label: "MeteorJS" },
  { value: "Zend", label: "Zend" },
  { value: "Django", label: "Django" },
  { value: "Laravel", label: "Laravel" },
  { value: "CoffeeScript", label: "CoffeeScript" },
  { value: "Python", label: "Python" },
  { value: "Ruby", label: "Ruby" },
  { value: "PHP", label: "PHP" },
  { value: "Go", label: "Go" },
  { value: "Java", label: "Java" },
  { value: "DDP", label: "DDP" },
  { value: "REST", label: "REST" },
  { value: "JSON", label: "JSON" },
  { value: "XML", label: "XML" },
  { value: "CSV", label: "CSV" },
  { value: "Backbone", label: "Backbone" },
  { value: "Ember", label: "Ember" },
];

function AddProjectForm(props) {
  const [LinkButton, setLinkButton] = useState(false);

  const handleLinkButton = (e) => {
    e.preventDefault();
    if (LinkButton) {
      setLinkButton(false);
    } else {
      setLinkButton(true);
    }
  };

  return (
    <div className="main-cont">
      <div className="form-cont">
        <form className="form" onSubmit={props.onProjectAdd}>
          <h3>What is the name of your project?</h3>
          <div class="ui input">
            <Input
              name="appName"
              type="text"
              placeholder="Awesome Project"></Input>
          </div>
          <h3>Anything you would like to tell about it?</h3>
          <div class="ui input">
            <Input
              name="appDescription"
              type="text"
              placeholder="It is Awesome!"></Input>
          </div>
          <h3>What are you using to create/develop this</h3>
          <div class="ui input">
            <Select
              isMulti
              name="appToolsData"
              options={appToolOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <h3>What is the link of the deployed project?</h3>
          <div class="ui input">
            <Input
              name="deploymentLink"
              type="text"
              placeholder="awesome-project.herokuapp.com"></Input>
          </div>
          <h3>Where is the repository?</h3>
          <div class="ui input">
            <Input
              name="repoLink"
              type="text"
              placeholder="github.com/john/doeProject"></Input>
          </div>
          <div className="upload-link-handler-cont">
            {LinkButton ? (
              <div>
                <h3>Paste it here!</h3>
                <div class="ui input input-for-upload">
                  <Input name="appLogoLink" type="text"></Input>
                </div>
              </div>
            ) : (
              <div>
                <h3>Upload your logo</h3>
                <input
                  type="file"
                  className="form-control"
                  name="uploadedAppLogo"
                  id="image"
                />
              </div>
            )}
          </div>
          {LinkButton ? (
            <button className="textStyle" onClick={handleLinkButton}>
              I have a link!
            </button>
          ) : (
            <button className="textStyle" onClick={handleLinkButton}>
              Or actually I want to upload
            </button>
          )}

          <h3>What version is it right now?</h3>
          <Input
            name="projectVersion"
            type="text"
            placeholder="0.0.0.0.0.0.1b"></Input>

          <button className="textStyle" type="submit">
            Add this project!
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProjectForm;

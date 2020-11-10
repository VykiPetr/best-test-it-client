import React, {useState} from 'react'
import Select from 'react-select';
// import {appToolOptions} from '../toolsOptions.json'
const appToolOptions =
    [
        { value: "Javascript", label: "Javascript"}, 
        { value: "MongoDB", label: "MongoDB"}, 
        { value: "Beer", label: "Beer"},
        { value: "Express", label: "Express"},
        { value: "React", label: "React"},
        { value: "HTML", label: "HTML"},
        { value: "CSS", label: "CSS"},
        { value: "CSS", label: "CSS"},
        { value: "CSS", label: "CSS"},
        { value: "CSS", label: "CSS"},
        { value: "CSS", label: "CSS"},
    ]

function AddProjectForm(props) {

    const [LinkButton, setLinkButton] = useState(false)

    const handleLinkButton = (e) => {
        e.preventDefault()
        if (LinkButton) {
            setLinkButton(false)
        } else {
            setLinkButton(true)
        }
    }

    return (
        
        <form onSubmit={props.onProjectAdd}>
        
            <h3>What is the name of your project?</h3>
            <input name='appName' type='text' placeholder='Awesome Project'></input>
            
            <h3>Anything you would like to tell about it?</h3>
            <input name='appDescription' type='text' placeholder='It is Awesome!'></input>
            
            <h3>What are you using to create/develop this</h3>
            <Select
                isMulti
                name="appToolsData"
                options={appToolOptions}
                className="basic-multi-select"
                classNamePrefix="select"
            />
            
            <h3>What is the link of the deployed project?</h3>
            <input name='deploymentLink' type='text' placeholder='awesome-project.herokuapp.com'></input>
            
            <h3>Where is the repository?</h3>
            <input name='repoLink' type='text' placeholder='github.com/john/doeProject'></input>
            

            {
                LinkButton 
                ?
                <div>
                    <h3>Upload your logo</h3>
                    <input type="file" className="form-control" name="uploadedAppLogo" id="image" />
                </div>
                :
                <div>
                    <h3>Paste it here!</h3>
                    <input name='appLogoLink' type='text'></input>
                </div>
            }
            {
                LinkButton ? <button onClick={handleLinkButton}>I have a link!</button> :  <button onClick={handleLinkButton}>Or actually I want to upload</button>
            }
            

            
            
            <h3>What version is it right now?</h3>
            <input name='projectVersion' type='text' placeholder='0.0.0.0.0.0.1b'></input>
            

            <button type='submit'>Add this project!</button>
        </form>
    )
}


export default AddProjectForm
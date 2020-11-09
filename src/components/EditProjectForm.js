import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function EditProjectForm(props) {

        const [LinkButton, setLinkButton] = useState(false)
        const [Project, setProject] = useState(null)
    
        const handleLinkButton = () => {
            if (LinkButton) {
                setLinkButton(false)
            } else {
                setLinkButton(true)
            }}


        //component mount
        useEffect(() => {
            axios.get(`http://localhost:5000/api/project/${props.match.params.projectId}`)
                .then((response)=>{
                    setProject(response.data)
                })

            return () => {
            }
        }, [])   

    return (
        <form onSubmit={props.onProjectEdit}>
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
            

            {/* {
               
                if (LinkButton){
                return (
                <div>
                <h3>Upload your logo</h3>
                <input type="file" className="form-control" name="appLogo" id="image" value={Project.appLogo}/>
                </div>
                )
                } else {
                return (
                <div>
                <h3>Paste it here!</h3>
                <input name='appLogo' type='text' value={Project.appLogo}></input>
                </div>
                )
                }
            } */}
            {
                LinkButton ? <button onClick={handleLinkButton}>Or actually I want to upload</button> : <button onClick={handleLinkButton}>I have a link!</button>
            }
            

            
            
            <h3>What version is it right now?</h3>
            <input name='projectVersion' type='text' value={Project.projectVersion}></input>
            

            <button type='submit'>Edit this project!</button>
        </form>
    )
}

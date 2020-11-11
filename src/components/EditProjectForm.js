import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import Select from 'react-select';

const appToolOptions =
    [
        { value: "Javascript", label: "Javascript"}, 
        { value: "MongoDB", label: "MongoDB"}, 
        { value: "Beer", label: "Beer"},
        { value: "Express.js", label: "Express.js"},
        { value: "React", label: "React"},
        { value: "HTML", label: "HTML"},
        { value: "Angular", label: "Angular"},
        { value: "Ruby", label: "Ruby"},
        { value: "Yii", label: "Yii"},
        { value: "MeteorJS", label: "MeteorJS"},
        { value: "Zend", label: "Zend"},
        { value: "Django", label: "Django"},
        { value: "Laravel", label: "Laravel"},
        { value: "CoffeeScript", label: "CoffeeScript"},
        { value: "Python", label: "Python"},
        { value: "Ruby", label: "Ruby"},
        { value: "PHP", label: "PHP"},
        { value: "Go", label: "Go"},
        { value: "Java", label: "Java"},
        { value: "DDP", label: "DDP"},
        { value: "REST", label: "REST"},
        { value: "JSON", label: "JSON"},
        { value: "XML", label: "XML"},
        { value: "CSV", label: "CSV"},
        { value: "Backbone", label: "Backbone"},
        { value: "Ember", label: "Ember"},
    ]

export default function EditProjectForm(props) {

        const [LinkButton, setLinkButton] = useState(false)
        const [ProjectId, setProjectId] = useState('')
        const [ProjectName, setProjectName] = useState('')
        const [ProjectDescription, setProjectDescription] = useState('')
        const [ProjectLogo, setProjectLogo] = useState('')
        const [DeployLink, setDeployLink] = useState('')
        const [RepoLink, setRepoLink] = useState('')
        const [Tools, setTools] = useState('')
        const [ProjectVersion, setProjectVersion] = useState('')
    
        

        //component mount
        useEffect(() => {
            axios.get(`${API_URL}/project/${props.match.params.projectId}`)
                .then((response)=>{
                    console.log(response.data)
                    const {_id, appLogo, appDescription, appName, appTools, deploymentLink, projectVersion, repoLink} = response.data
                    setProjectId(_id)
                    setProjectName(appName)
                    setProjectVersion(projectVersion)
                    setTools(makeDefaultToolValues(appTools))
                    setRepoLink(repoLink)
                    setDeployLink(deploymentLink)
                    setProjectDescription(appDescription)
                    setProjectLogo(appLogo)
                })

            return () => {
            }
        }, [])
        
        const makeDefaultToolValues = (tools) => {
            let defaulted = []
            if (tools.length) {  
                for (let i = 0; i < tools.length; i++){
                    defaulted.push({value: tools[i], label: tools[i]})
                    return defaulted
            }
            } else {
                return defaulted
            }
        }

       
        const handleLinkButton = (e) => {
            e.preventDefault()
            if (LinkButton) {
                setLinkButton(false)
            } else {
                setLinkButton(true)
            }}

        if (!Tools) {
            return null
        }

    return (
        <form onSubmit={(e) => {props.onProjectEdit(e , ProjectId)} }>
            <h3>Change the name here!</h3>
            <input name='appName' type='text' ></input>
            
            <h3>The description</h3>
            <input name='appDescription' type='text' ></input>
            
            <h3>What are you using to create/develop this</h3>
            <Select
                isMulti
                defaultValue={Tools}
                name="appToolsData"
                options={appToolOptions}
                className="basic-multi-select"
                classNamePrefix="select"
            />
            
            <h3>Deployment link</h3>
            <input name='deploymentLink' type='text' ></input>
            
            <h3>Repository link</h3>
            <input name='repoLink' type='text' ></input>
            

            {
               
                LinkButton ?
                <div>
                <h3>Paste it here!</h3>
                <input name='appLogo' type='text' ></input>
                </div>
                :
                <div>
                <h3>Upload your logo</h3>
                <input type="file" className="form-control" name="appLogo" id="image" />
                </div>
                
                
            }
            {
                LinkButton ? <button onClick={handleLinkButton}>I have a link!</button> : <button onClick={handleLinkButton}>Or actually I want to upload</button>
            }
            

            
            
            <h3>What version is it right now?</h3>
            <input name='projectVersion' type='text' ></input>
            

            <button type='submit'>Edit this project!</button>
        </form>
    )
}

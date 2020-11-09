import React, {useState} from 'react'

function AddProjectForm(props) {

    const [LinkButton, setLinkButton] = useState(false)

    const handleLinkButton = () => {
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
            <input name='appTools' type='text' placeholder='React, MongoDB, NodeJs'></input>
            
            <h3>What is the link of the deployed project?</h3>
            <input name='deploymentLink' type='text' placeholder='awesome-project.herokuapp.com'></input>
            
            <h3>Where is the repository?</h3>
            <input name='repoLink' type='text' placeholder='github.com/john/doeProject'></input>
            

            {/* {
            
                if (LinkButton){
                return (
                <div>
                <h3>Upload your logo</h3>
                <input type="file" className="form-control" name="appLogo" id="image" />
                </div>
                )
                } else {
                return (
                <div>
                <h3>Paste it here!</h3>
                <input name='appLogo' type='text'></input>
                </div>
                )
                }
            } */}
            {
                LinkButton ? <button onClick={handleLinkButton}>Or actually I want to upload</button> : <button onClick={handleLinkButton}>I have a link!</button>
            }
            

            
            
            <h3>What version is it right now?</h3>
            <input name='projectVersion' type='text' placeholder='0.0.0.0.0.0.1b'></input>
            

            <button type='submit'>Add this project!</button>
        </form>
    )
}


export default AddProjectForm
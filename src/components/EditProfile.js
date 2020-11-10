import React, {useState, useEffect} from 'react'
import axios from 'axios'

function EditProfile(props) {

    const [profile, setProfile] = useState({})
    const [userProjects, setUserProjects] = useState([])
    const [LoggedInUser, setLoggedInUser] = useState(null)
    const [LinkButton, setLinkButton] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/profile/${props.match.params.profileId}`, {withCredentials: true})
        .then((response)=> {
            setProfile(response.data)
        })  
        return () => {
        }
    }, [])
      
    const handleLinkButton = (e) => {
        e.preventDefault()
        if (LinkButton) {
            setLinkButton(false)
        } else {
            setLinkButton(true)
        }
    }


    return (
        <form onSubmit={props.onProfileEdit}>
            
            <h3>Anything you would like to tell about yourself?</h3>
            <input name='aboutMe' type='text' value={profile.aboutMe}></input>
            
            <h3>What are your skills?</h3>
            <input name='mySkills' type='text' value={profile.mySkills}></input>

            {
                LinkButton 
                ?
                <div>
                    <h3>Paste it here!</h3>
                    <input name='userImageLink' type='text'></input>
                </div>
                :
                <div>
                    <h3>Upload your logo</h3>
                    <input type="file" className="form-control" name="uploadedUserImage" id="image" />
                </div>
            }
            {
                LinkButton ?  <button onClick={handleLinkButton}>Or actually I want to upload</button> :  <button onClick={handleLinkButton}>I have a link!</button>
            }
            
            <button type='submit'>Edit your profile!</button>
        </form>
    )
}

export default EditProfile
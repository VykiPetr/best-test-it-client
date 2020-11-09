import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import ProjectHeader from './ProjectHeader'

function ProfileView(props) {

    const [profile, setProfile] = useState({})
    const [userProjects, setUserProjects] = useState([])
    const [LoggedInUser, setLoggedInUser] = useState(null)
    
    const getProfileInfo = (response) => {

        axios.get(`http://localhost:5000/api/profile/${props.match.params.profileId}`, {withCredentials: true})
            .then((response2)=>{
                setProfile(response2.data)
                console.log('profile view loaded this', profile)
                axios.get(`http://localhost:5000/api/userProjects/${props.match.params.profileId}`, {withCredentials: true})
                    .then((response3) => {
                        setUserProjects(response3.data)
                        console.log('we got these projects', response)
                        if (response2.data._id === response._id){
                            setLoggedInUser(true)
                        }
                    })
            })

    }

    //component did mount does work/
    useEffect(() => {
        if (!props.loggedIn) {
            axios.get(`http://localhost:5000/api/user`, {withCredentials: true})
              .then((response)=>{
                console.log('not else')
                setLoggedInUser(response.data)
                getProfileInfo(response.data)
              })
        } else {
            console.log('else')
          getProfileInfo(props.loggedIn)
        }
        console.log(props.match.params)
        
        return () => {
        }
    }, [])


    return (
        <div>
            {
                props.loggedIn._id ? <Link to={`/edit-profile/${props.loggedIn._id}`}>Edit profile</Link> : null
            }
            <div>
                <img src={profile.userImage} alt='profile avatar'/>
                <div>
                    <h2>{profile.username}</h2>
                    {/* <button>Send Message</button> */}
                </div>
            </div>
            <div>
                <div>
                    {profile.skills}
                </div>
                <article>
                    <p>{profile.aboutMe}</p>
                </article>
            </div>
            <h2>{profile.username} Projects</h2>
            {
                userProjects.map((project, i)=>{
                    return <ProjectHeader project={project} key={i} />
                })
            }
            {
                LoggedInUser ? <Link to='/add-project'>Add a project </Link> : null 
            }
        </div>
    )
}

export default ProfileView
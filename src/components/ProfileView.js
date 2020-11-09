import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import ProjectHeader from './ProjectHeader'

function ProfileView(props) {

    const [profile, setProfile] = useState(null)
    const [userProjects, setUserProjects] = useState(null)

    //component did mount doesnt work
    useEffect(() => {
        axios.get(`http://localhost:5000/api/profile/${props.match.params.profileId}`)
            .then((response)=>{
                
                setProfile(response.data)
                console.log('profile view loaded this', profile)
            axios.get(`http://localhost:5000/api/userProjects/${props.match.params.profileId}`)
                .then((response) => {
                    setUserProjects(response.data)
                    console.log('we got these projects', userProjects)
                })
        })
        
        return () => {
        }
    }, [])


    return (
        <div>
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
            <Link to='/add-project'>Add a project </Link>
        </div>
    )
}

export default ProfileView
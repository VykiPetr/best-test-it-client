import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function ProjectView(props) {

    const [ProjectData, setProjectData] = useState({})
    const [LoggedInUser, setLoggedInUser] = useState(null)
    const [ProjectOwner, setProjectOwner] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/project/${props.match.params.projectId}`)
            .then((response) => {
                axios.get(`http://localhost:5000/api/user`, {withCredentials: true})
                    .then((response2)=>{
                        setLoggedInUser(response2.data)
                        console.log('logged in user is', response.data)
                        setProjectData(response.data)
                        setLoggedInUser(props.loggedIn)
                        if (response2.data._id === response.data.userRefId){
                            setProjectOwner(true)
                        } else {
                            setProjectOwner(false)
                        }
                    })
            })
    }, [])

    const onLikeClick = (e) => {
        e.preventDefault()
        console.log('like button clicked')
    }

    const onDeleteClick = (e) => {
        e.preventDefault()
        console.log('delete button clicked')
    }

    return (
        <div>
            <div>
                <div>
                <div>
                    <Link onClick={onLikeClick}>{ProjectData.likes} Likes</Link>
                    <p>{ProjectData.projectVersion}</p>
                </div>
                <div>
                    <img style={{width:"50px", height:"50px"}} src={ProjectData.appLogo}/>
                </div>
                <div>
                    {
                        ProjectOwner ? <Link to={`/edit-project/${ProjectData._id}`}>Edit</Link> : null
                    }
                    {
                        ProjectOwner ? <Link onClick={onDeleteClick}>Delete</Link> : null
                    }
                </div>
            </div>
            <h1>{ProjectData.appName}</h1>
            <div>
                <div>
                    tools used
                    {ProjectData.appTools}
                </div>
                <div>
                    <p>made by <Link to={`/profile/${ProjectData.userRefId}`}>User name</Link></p>
                    <p>{ProjectData.appDescription}</p>
                </div>
            </div>
            </div>
            <div>
                <iframe src={ProjectData.deploymentLink} title="Iframe Example"></iframe>
            </div>
        </div>
    )
}


export default ProjectView
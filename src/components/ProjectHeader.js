import React from 'react'
import {Link} from 'react-router-dom'


function ProjectHeader(props) {

    const {appName, appLogo, likes, _id} = props.project

    const handleProjectClick = () => {

    }

    return (
        <div>
            <Link to={`/project/${_id}`}>
                <div>
                    <img style={{width:"50px", height:"50px"}} src={appLogo}/>
                </div>
                <div>
                    <h3>{appName}</h3>
                    <p>{likes.length} likes</p>
                </div>
            </Link>
        </div>
    )
}

export default ProjectHeader
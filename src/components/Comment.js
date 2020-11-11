import React from 'react'

function Comment(props) {
    return (
        <div>
            {props.data.commentBody}
        </div>
    )
}

export default Comment
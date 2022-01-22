import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {UPDATE_COMMENT, DELETE_COMMENT} from '../../apollo/mutation/comment';

function EditComment() {
    const [updatedComment, setUpdatedComment] = useState({
        id: comment.id,
        comment: comment.comment
    })

    const [editing, setEditing] = useState(false)

    const [updateComment] = useMutation(UPDATE_COMMENT)

    const onChangeHandler = (e) => {
        setUpdatedComment({...updatedComment, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = () => {
        updateComment({
            variables: updatedComment
        })
    }

    const [deleteComment] = useMutation(DELETE_COMMENT)

    const deleteHandler = id => {
        if(window.confirm("Are you sure you want to delete this comment?")) {
            deleteComment({
                variables: {id}
            })
        }
    }

    return(
        <div style={style}>
            {
                editing ? 
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label>Comment</label>
                        <input type="text" name="title" onChange={onChangeHandler} value={updatedComment.comment}/>
                    </div>
                    <button>Submit</button>
                </form> 
                :
                <div> 
                    <a href={`/${comment.id}`}>
                        <h2>{commet.title}</h2>
                    </a>    
                    <p>{comment.description}</p>
                </div>
            }
            <button onClick={() => setEditing(!editing)}>
                {editing ? "Cancel" : "Edit"}
            </button>
            <button onClick={() => deleteHandler(comment.id)}>Delete</button>
        </div>    
    )
}

export default EditComment;
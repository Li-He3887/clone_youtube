import { useState } from 'react';
import {ADD_COMMENT} from '../apollo/mutation/comment';
import {useMutation} from '@apollo/client';

function Comment() {
    const [comment, setComment] = useState({
		comment: ""
	});

	const onChangeHandler = e => {
		setComment({ ...comment, [e.target.name]: e.target.value });
	};

	const [addComment] = useMutation(ADD_COMMENT);

    const onSubmitHandler = e => {
        e.preventDefault()
        addComment({
            variables: comment
        })
    }

    return(
        <form onSubmit={onSubmitHandler}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Leave a comment" onChange={onChangeHandler}/>
                <button className="btn btn-outline-dark text-light">Send</button>
            </div>
        </form>
    )
}

export default Comment;
import {useState} from 'react';
import {useMutation} from '@apollo/client';
import { UPDATE_VIDEO } from '../../apollo/mutation/video';

function EditVideo() {
    let [updatedVideo, setUpdatedVideo] = useState({
        id: post.id,
        title: post.title,
    })

    let [updateVideo] = useMutation(UPDATE_VIDEO)

    let onChangeHandler = (e) => {
        setUpdatedVideo({...updatedVideo, [e.target.name]: e.target.value})
    }

    let onSubmitHandler = () => {
        updateVideo({
            variables: updatedVideo
        })
    }

    return(
        <form onSubmit={onSubmitHandler}>
            <div>
                <label>Title</label>
                <input type="text" name="title" onChange={onChangeHandler} value={updatedVideo.title}/>
            </div>
            <button>Submit</button>
        </form>
    )
}

export default EditVideo;
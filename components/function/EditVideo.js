import {useState} from 'react';
import {useMutation} from '@apollo/client';
import { UPDATE_VIDEO } from '../../apollo/mutation/video';

function EditVideo() {
    const [updatedVideo, setUpdatedVideo] = useState({
        id: video.id,
        title: video.title,
    })

    const [updateVideo] = useMutation(UPDATE_VIDEO)

    const onChangeHandler = (e) => {
        setUpdatedVideo({...updatedVideo, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = () => {
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
import {useState} from 'react';
import {useMutation} from "@apollo/client";
import EditVideo from './function/EditVideo';
import { DELETE_VIDEO } from '../apollo/mutation/video';

function Video({video}) {
    const [editing, setEditing] = useState(false)

    const [deleteVideo] = useMutation(DELETE_VIDEO)

    const deleteHandler = id => {
        if(window.confirm("Are you sure you want to delete this video?")) {
            deleteVideo({
                variables: {id}
            })
        }
    }

    let style = {
        border: '2px solid black',
        padding: 20,
        margin:"10px 15px",
        borderRadius: 5
    }

    return(
        <div style={style}>
            {
                editing ? 
                <EditVideo /> : 
                <div> 
                    <a href={`/${video.id}`}>
                        <h2>{video.title}</h2>
                    </a>    
                    <p>{video.description}</p>
                </div>
            }
            <button onClick={() => setEditing(!editing)}>
                {editing ? "Cancel" : "Edit"}
            </button>
            <button onClick={() => deleteHandler(video.id)}>Delete</button>
        </div>    
    )
}

export default Video;
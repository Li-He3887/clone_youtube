import {useState, useEffect} from 'react';
import {useMutation} from "@apollo/client";
import {CREATE_VIDEO} from "../../apollo/mutation/video";
import {TOKEN_NAME} from "../../vars/token";

import {Form, Button} from 'react-bootstrap'; 

function Upload() {
    const [video, setVideo] = useState({})
    const [loading, setLoading] = useState(false)

    const onChangeHandler = (e) => {
        setVideo({...video, [e.target.name]: e.target.value})
    }

    const [addVideo] = useMutation(CREATE_VIDEO)

    const onSubmitHandler = e => {
        e.preventDefault()
        addVideo({
            variables: video
        })
    }

    useEffect(() => {
        const initializeGsi= _=> {
            if(!window.google || loading) return
            setLoading(true)
        }

        const script = document.createElement('script')
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js"
        script.onload = initializeGsi
        script.async = true;
        script.id = "cloudinary-script"
        document.querySelector('head')?.appendChild(script)
    }, [loading])


    
    return(
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-8">
                <Form.Label>Video Name</Form.Label>
                <Form.Control type="name" placeholder="Enter a name for your video" onChange={onChangeHandler} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="description" placeholder="Enter description for your video" onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Video</Form.Label>
                <Button 
                // onClick={showWidget}
                >
                    Upload files
                </Button>
            </Form.Group>
            <Button variant="primary" type="submit">
                Upload
            </Button>
        </Form>
    )
    
}

export default Upload
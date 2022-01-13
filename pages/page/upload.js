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

    // const checkUploadeResults = (resultEvent) => {
    //     if(resultEvent.event === 'success') {
    //         console.log(TOKEN_NAME)
    //         this.props.postPhoto({user_id: this.props.TOKEN_NAME,
    //         caption: '',
    //         url: resultEvent.info.secure_url
    //     })
    //         .then(this.props.history.push(`/profile`))
    //     }
    // }

    // const showWidget = (widget) => {
    //     widget.open()
    // }

    // render() 
    //     let widget = window.cloudinary.createUploadWidget({
    //         cloudName: "dxbi9mcea",
    //         uploadPresent: "user_id/"},
    //         (error, result) => {checkUploadeResults(result)})
    if(typeof window !== 'undefined'){
        let myWidget = window.cloudinary.createUploadWidget(
            {
              cloudName: "dxbi9mcea",
              uploadPreset: "user_id"
            },
            (error, result) => {
              if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
              }
            }
          );
          document.getElementById("upload_widget").addEventListener(
            "click",
            function () {
              myWidget.open();
            },
            false
          );
    }
    
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
        </Form>)
    
}

export default Upload
import {useRouter} from 'next/router';

function VideoDetails() {
    const router = useRouter()
    const { id } = router.query

    return(
        <h1>Video</h1>
    )
}

export default VideoDetails;
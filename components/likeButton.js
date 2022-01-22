import {useMutation} from '@apollo/client';
import { LIKE_VIDEO } from '../apollo/mutation/video';
import {BiLike, BiDislike, BiCommentDetail} from 'react-icons/bi';

function LikeButton() {
    const [likeVideo] = useMutation(LIKE_VIDEO)

    const onClickHandler = async () => {
        
        // console.log('hello + 1')
    }

    const handleOnClick = async () => {
        
        // console.log("hello - 1")
    }

    return(
        <div className="d-flex flex-row-reverse fs-3">
            <i>
                <BiCommentDetail />
                <span>3</span>
            </i>
            <i onClick={handleOnClick}>
                <BiDislike />
                <span>0</span>
            </i>
            <i onClick={onClickHandler}>
                <BiLike />
                <span>12</span>
            </i>
        </div>
    )
}

export default LikeButton
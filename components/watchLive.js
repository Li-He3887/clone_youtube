import LikeButton from './likeButton';
import Comment from './comment';

function Live() {
    return(
        <div className="container">
            <div className="row">

                <div className="col-md-8">
                    <img 
                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22242%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20242%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17e47c9e268%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A12pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17e47c9e268%22%3E%3Crect%20width%3D%22242%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2291.453125%22%20y%3D%2286.45%22%3E242x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                        alt="for video" 
                    />
                    <div>
                        <p>Video Title</p>
                        <p>upload date</p> 
                        <LikeButton />
                    </div>

                    <hr />
                        
                    <div className="">
                        <img />
                        <h3>Channel Name</h3>
                        <div className="d-flex flex-row-reverse">
                            <button className="btn btn-danger">subscribe</button>
                        </div>
                        <p>video description</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-secondary d-flex justify-content-center" style={{ height: "30rem"}}>
                        <div className="card-body">
                            <Comment />
                            <h5 className="card-title">
                                <img src="" alt="username"/>
                            </h5>
                            <h6 className="card-subtitle mb-2">comment</h6>
                        </div>
                    </div>

                    <div className="row g-0">
                        <div className="col-md-4">
							<video
								id="doc-player"
								controls
								className="cld-video-player cld-fluid"></video>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Video title</h5>
                                <p className="card-text">username</p>
                                <p className="card-text"><small className="text-muted">date</small></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Live;
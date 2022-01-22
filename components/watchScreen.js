import Comment from "./comment";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";

function WatchScreen({ video }) {
	const { url, title, createdAt, author, description } = video;
	const date = new Date(Number(createdAt)).toLocaleDateString();

	useEffect(() => {
		const cld = window.cloudinary.Cloudinary.new({
			cloud_name: process.env.NEXT_PUBLIC_CLD_CLOUD_NAME,
		});
		const player = cld.videoPlayer("doc-player", {
			autoplay: true,
		});
		player.source(url);
	}, [url]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8">
					<div style={{ maxWidth: "100%" }}>
						<video
							id="doc-player"
							controls
							className="cld-video-player cld-fluid"></video>
					</div>
					<div>
						<p>{title}</p>
						<p>{date}</p>
						<div className="d-flex flex-row-reverse fs-3">
							<BiCommentDetail />
							<BiDislike />
							<BiLike />
						</div>
					</div>

					<hr />

					<div>
						<img src={author.profilePic} alt={author.username} />
						<h3>{author.username}</h3>
						<div className="d-flex flex-row-reverse">
							<button className="btn btn-danger">
								subscribe
							</button>
						</div>
						<p>{description}</p>
					</div>

					<hr />

					<Comment />

					<div>
						<img src={author.profilePic} alt={author.username} />
						<p>{author.username}</p>
						<p>Comment</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WatchScreen;

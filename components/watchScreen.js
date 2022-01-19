import { useRef, useEffect } from "react";

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
		<>
			<div style={{ maxWidth: "100%" }}>
				<video
					id="doc-player"
					controls
					className="cld-video-player cld-fluid"></video>
			</div>
			<div>
				<h1>Watch Screen</h1>
				<p>{title}</p>
				<p>{description}</p>
				<p>{date}</p>
			</div>

			<hr />

			<div>
				<img src={author.profilePic} alt={author.username} />
				<h3>{author.username}</h3>
				<button>subscribe</button>
			</div>

			<div>
				<img />
				<p>name</p>
				<p>Commentm</p>
			</div>
		</>
	);
}

export default WatchScreen;

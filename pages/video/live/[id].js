import { useEffect, useRef, useState } from "react";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { useQuery } from "@apollo/client";

import { GET_USER } from "../../../apollo/query/user";
import { GET_VIDEO } from "../../../apollo/query/video";

import { TOKEN_NAME } from "../../../vars/token";

function Live() {
	const router = useRouter();
	const { id, videoId } = router.query;
	const [initiator, setInitiator] = useState(false);
	const videoRef = useRef();
	const { data, loading, error } = useQuery(GET_USER, {
		variables: {
			id,
		},
	});
	const { data: videoData } = useQuery(GET_VIDEO, {
		variables: {
			id: videoId,
		},
	});

	useEffect(() => {
		const user = jwtDecode(localStorage.getItem(TOKEN_NAME));
		if (!id || !data?.getUser?.isLive) return;
		const isInitiating = user.id === id;
		// const isInitiating = localStorage.getItem("initiator");
		const buffers = [];
		const ws = new WebSocket(
			`ws://localhost:5000/${
				user.id
			}?initiator=${isInitiating}&token=${localStorage.getItem(
				TOKEN_NAME
			)}`
		);
		const video = videoRef.current;
		const source = new MediaSource();
		let recorder;
		let sourceBuffer;
		let initiatedUpdate = false;
		// for initiator
		ws.onopen = e => {
			/**
			 *   video: {
						cursor: "always"
					},
			 */
			// MediaSource.isTypeSupported('video/webm; codecs="vp9"')
			console.log(e);
			if (isInitiating) {
				setInitiator(true);
				navigator.mediaDevices
					.getUserMedia({
						video: true,
						audio: true,
					})
					.then(stream => {
						video.srcObject = stream;
						recorder = new MediaRecorder(stream, {
							mimeType: 'video/webm; codecs="vp9"',
						});
						recorder.ondataavailable = e => {
							ws.send(e.data);
						};
						recorder.start(1000);
					});
			} else {
				source.addEventListener("sourceopen", _ => {
					console.log("sourceOpened");
					sourceBuffer = source.addSourceBuffer(
						'video/webm; codecs="vp9"'
					);
					// have to wait for updateend before appending another buffer
					sourceBuffer.addEventListener("updateend", _ => {
						console.log("ended sourceBuffer update");
						if (buffers.length === 0) {
							initiatedUpdate = false;
						} else {
							sourceBuffer.appendBuffer(buffers.shift());
						}
					});
				});
				video.src = URL.createObjectURL(source);
			}
		};

		// for viewer
		ws.onmessage = async e => {
			initiatedUpdate
				? buffers.push(await e.data.arrayBuffer())
				: sourceBuffer.appendBuffer(await e.data.arrayBuffer());
			initiatedUpdate = true;
		};

		return _ => {
			ws.close();
			recorder?.stop();
			URL.revokeObjectURL(video.src);
		};
	}, [id, data]);
	if (data) {
		if (!data.getUser.isLive) return <p>User is not live</p>;
	}
	const video = videoData.getVideo;
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8">
					<div>
						<video ref={videoRef} autoPlay></video>
						<p>{video.title}</p>
						<p>{video.description}</p>
						<p>
							{new Date(Number(createdAt)).toLocaleDateString()}
						</p>
						<div className="d-flex flex-row-reverse fs-3">
							<BiCommentDetail />
							<BiLike />
						</div>
					</div>

					<hr />

					<div>
						<img
							src={video.author.profilePic}
							alt={video.author.username}
						/>
						<h3>{video.author.username}</h3>
						<div className="d-flex flex-row-reverse">
							<button className="btn btn-danger">
								subscribe
							</button>
						</div>
					</div>

					<hr />

					<div>
						<img />
						<p>name</p>
						<p>Comment</p>
					</div>
				</div>

				<div className="col-md-4">
					<div className="row g-0">
						<div className="col-md-4">
							<img
								src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22242%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20242%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17e47c9e268%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A12pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17e47c9e268%22%3E%3Crect%20width%3D%22242%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2291.453125%22%20y%3D%2286.45%22%3E242x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
								className="img-fluid rounded-start"
								alt=""
							/>
						</div>
						<div className="col-md-8">
							<div className="card" style={{ width: "18rem" }}>
								<div className="card-body">
									<h5 className="card-title">
										<img />
										Card title
									</h5>
									<p className="card-text">comment</p>
								</div>
							</div>

							<div className="card-body">
								<h5 className="card-title">Card title</h5>
								<p className="card-text">Channel Name</p>
								<p className="card-text">
									<small className="text-muted">
										Last updated 3 mins ago
									</small>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Live;

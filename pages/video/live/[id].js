import { useEffect, useRef, useState } from "react";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { useQuery } from "@apollo/client";

import { GET_USER } from "../../../apollo/query/user";
import { GET_VIDEO } from "../../../apollo/query/video";

import WatchLive from "../../../components/watchLive";
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
	const { data: videoData, loading: videoDataLoading } = useQuery(GET_VIDEO, {
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
	if (videoDataLoading || loading) return <p>Loading...</p>;
	const video = videoData.getVideo;

	return <WatchLive ref={videoRef} video={video} roomId={id} />;
}

export default Live;

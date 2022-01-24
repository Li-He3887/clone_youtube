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
	const [vid, setVid] = useState();
	const { data, loading, error } = useQuery(GET_USER, {
		variables: {
			id,
		},
		fetchPolicy: "network-only",
	});
	const { data: videoData, loading: videoDataLoading } = useQuery(GET_VIDEO, {
		variables: {
			id: videoId,
		},
	});

	useEffect(() => {
		const token = localStorage.getItem(TOKEN_NAME);
		const user = token
			? jwtDecode(token)
			: {
					id: Date.now(),
			  };
		if (!id || !data?.getUser?.isLive || !vid) return;
		const isInitiating = user.id === id;
		// const isInitiating = localStorage.getItem("initiator");
		const buffers = [];
		const ws = new WebSocket(
			`ws://localhost:5000/${id}?initiator=${isInitiating}&token=${localStorage.getItem(
				TOKEN_NAME
			)}`
		);
		const video = vid;
		const source = new MediaSource();
		let recorder;
		let sourceBuffer;
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
							mimeType: "video/webm",
						});
						recorder.ondataavailable = e => {
							console.log("data available");
							ws.send(e.data);
						};
						recorder.start(1000);
					});
			} else {
				source.addEventListener("sourceopen", _ => {
					console.log("sourceOpened");
					sourceBuffer = source.addSourceBuffer(
						'video/webm; codecs="vp8"'
					);
					// have to wait for updateend before appending another buffer
					sourceBuffer.addEventListener("updateend", _ => {
						console.log("ended sourceBuffer update");
						if (buffers.length !== 0) {
							sourceBuffer.appendBuffer(buffers.shift());
						}
					});
				});
				video.src = URL.createObjectURL(source);
				video.play();
			}
		};

		// for viewer
		ws.onmessage = async e => {
			if (typeof e.data === "string") {
				return;
			}
			const buffer = await e.data.arrayBuffer();
			if (
				!sourceBuffer.updating &&
				buffers.length === 0 &&
				source.readyState === "open"
			) {
				sourceBuffer.appendBuffer(buffer);
			} else {
				buffers.push(buffer);
			}
		};

		return _ => {
			ws.close();
			recorder?.stop();
			URL.revokeObjectURL(video.src);
		};
	}, [id, data, vid]);
	if (data) {
		if (!data.getUser.isLive) return <p>User is not live</p>;
	}
	if (videoDataLoading || loading) return <p>Loading...</p>;
	const video = videoData?.getVideo;

	return (
		<WatchLive
			ref={ref => {
				setVid(ref);
			}}
			video={video}
			roomId={id}
		/>
	);
}

export default Live;

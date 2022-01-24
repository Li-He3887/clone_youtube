import { forwardRef, useEffect, useState } from "react";
import { useSubscription, useMutation } from "@apollo/client";

import LikeButton from "./likeButton";
import { CHAT_SUBSCRIPTION } from "../apollo/subscription";
import { ADD_MESSAGE } from "../apollo/mutation/message";
import { TOKEN_NAME } from "../vars/token";

const WatchLive = forwardRef(function WatchLive({ video, roomId }, ref) {
	const { data } = useSubscription(CHAT_SUBSCRIPTION, {
		variables: {
			roomId,
		},
	});
	const [addMessage] = useMutation(ADD_MESSAGE);

	const [message, setMessage] = useState("");
	const [chat, setChat] = useState([]);
	const { title, createdAt, author, description } = video;
	const date = new Date(Number(createdAt)).toLocaleDateString();

	const handleOnChange = e => {
		setMessage(e.target.value);
	};

	const handleSendMessage = async _ => {
		if (message.trim().length === 0 || !localStorage.getItem(TOKEN_NAME))
			return;
		try {
			await addMessage({
				variables: {
					message: {
						roomId,
						message,
					},
				},
			});
			setMessage("");
		} catch (err) {}
	};

	useEffect(() => {
		if (data?.messageCreated) {
			setChat(prev => [...prev, data?.messageCreated]);
		}
	}, [data]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8">
					<div>
						<video ref={ref} autoPlay controls></video>
						<p>{title}</p>
						<p>{date}</p>
						<p>{description}</p>
						<LikeButton />
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
					</div>
				</div>

				<div className="col-md-4">
					<div
						className="card bg-secondary d-flex justify-content-center"
						style={{ height: "30rem" }}>
						<div className="card-body">
							{/* send message */}
							<div className="input-group mb-3">
								<input
									value={message}
									className="form-control"
									placeholder="Send Message"
									onChange={handleOnChange}
								/>
								<button
									className="btn btn-outline-dark text-light"
									onClick={handleSendMessage}>
									Send
								</button>
							</div>
							{chat.map((m, i) => (
								<div key={i} className="mb-3">
									<div className="card-title d-flex align-items-center gap-2">
										<img
											style={{
												width: "1.5rem",
												height: "1.5rem",
											}}
											src={m.sender.profilePic}
											alt={m.sender.username}
										/>
										<p className="mb-0">
											{m.sender.username}
										</p>
									</div>
									<h6 className="card-subtitle mb-2">
										{m.message}
									</h6>
								</div>
							))}
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
								<p className="card-text">
									<small className="text-muted">date</small>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default WatchLive;

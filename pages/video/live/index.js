import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

import { UPDATE_LIVE_STATUS } from "../../../apollo/mutation/user";
import { CREATE_VIDEO } from "../../../apollo/mutation/video";
import { TOKEN_NAME } from "../../../vars/token";

function Live() {
	const router = useRouter();
	const [form, setForm] = useState({
		title: "",
		description: "",
		type: "live",
	});
	const [updateStatus] = useMutation(UPDATE_LIVE_STATUS, {
		variables: {
			isLive: true,
		},
	});
	const [createVideo] = useMutation(CREATE_VIDEO);

	const handleOnChange = e =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleOnSubmit = async e => {
		e.preventDefault();
		if (form.title.trim().length === 0 || form.title.trim().length === 0)
			return;

		const token = localStorage.getItem(TOKEN_NAME);
		const user = jwtDecode(token);

		try {
			await updateStatus();
			const created = await createVideo({
				variables: {
					video: form,
				},
			});
			router.push(
				`/video/live/${user.id}?videoId=${created.data.addVideo.id}`
			);
		} catch (err) {}
	};
	return (
		<Form
			className="col-md-6 col-lg-4 col-xl-3 mx-auto mt-5"
			onSubmit={handleOnSubmit}>
			<Form.Group className="mb-3">
				<Form.Label>Live Title</Form.Label>
				<Form.Control
					onChange={handleOnChange}
					name="title"
					placeholder="Enter a title for your live stream"
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Live Description</Form.Label>
				<Form.Control
					onChange={handleOnChange}
					name="description"
					placeholder="Enter a description for your live stream"
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}

export default Live;

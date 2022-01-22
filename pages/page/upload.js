import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_VIDEO } from "../../apollo/mutation/video";
import Script from "next/script";

import { Form, Button } from "react-bootstrap";

function Upload() {
	const [form, setForm] = useState({
		title: "",
		description: "",
	});

	const widgetRef = useRef(null);

	const onChangeHandler = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const [addVideo] = useMutation(CREATE_VIDEO);

	const onSubmitHandler = async e => {
		e.preventDefault();
		try {
			console.log(form);
			const result = await addVideo({
				variables: { video: form },
			});
			console.log(result);
		} catch (err) {
			console.log(err?.networkError?.result?.errors?.[0]?.message);
			console.log(err.message);
			// TODO: some error handling
		}
	};

	const handleOnClick = _ => {
		widgetRef?.current?.open();
	};
	console.log(form);
	useEffect(() => {
		widgetRef.current = window.cloudinary.createUploadWidget(
			{
				cloudName: process.env.NEXT_PUBLIC_CLD_CLOUD_NAME,
				folder: "test",
				uploadPreset: "viddle",
				clientAllowedFormats: "video",
				sources: ["local"],
			},
			(error, result) => {
				if (!error && result && result.event === "success") {
					console.log("Done! Here is the image info: ", result.info);
					setForm(prev => ({ ...prev, url: result.info.url }));
				}
			}
		);
	}, []);

	return (
		<>
			<Script
				src="https://widget.cloudinary.com/v2.0/global/all.js"
				strategy="beforeInteractive"></Script>
			<Form onSubmit={onSubmitHandler}>
				<Form.Group className="mb-8">
					<Form.Label>Video Name</Form.Label>
					<Form.Control
						name="title"
						placeholder="Enter a name for your video"
						onChange={onChangeHandler}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Description</Form.Label>
					<Form.Control
						name="description"
						placeholder="Enter description for your video"
						onChange={onChangeHandler}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Video</Form.Label>
					<Button onClick={handleOnClick}>Upload Video</Button>
				</Form.Group>
				<Button variant="primary" type="submit">
					Upload
				</Button>
			</Form>
		</>
	);
}

export default Upload;

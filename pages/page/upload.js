import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import Script from "next/script";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

import { TOKEN_NAME } from "../../vars/token";
import jwtDecode from "jwt-decode";
import { CREATE_VIDEO } from "../../apollo/mutation/video";

function Upload() {
	const router = useRouter();
	const [form, setForm] = useState({
		title: "",
		description: "",
	});
	const [scriptLoaded, setScriptLoaded] = useState(false);

	const widgetRef = useRef(null);

	const onChangeHandler = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const [addVideo] = useMutation(CREATE_VIDEO);

	const onSubmitHandler = async e => {
		e.preventDefault();
		try {
			console.log(form);
			if (
				form.title.trim().length === 0 ||
				form.description.trim().length === 0 ||
				!form.url
			)
				return;
			const result = await addVideo({
				variables: { video: form },
			});
			router.push("/");
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

	useEffect(() => {
		if (!scriptLoaded) return;
		const user = jwtDecode(localStorage.getItem(TOKEN_NAME));
		widgetRef.current = window.cloudinary.createUploadWidget(
			{
				cloudName: process.env.NEXT_PUBLIC_CLD_CLOUD_NAME,
				folder: user,
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
	}, [scriptLoaded]);

	return (
		<>
			<Script
				onLoad={_ => setScriptLoaded(true)}
				src="https://widget.cloudinary.com/v2.0/global/all.js"></Script>

			<div className="mx-auto col-md-6 col-lg-4 col-xl-3">
				<Form onSubmit={onSubmitHandler}>
					<Form.Group className="mb-3">
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
						<div className="d-flex flex-column mb-2">
							<Form.Label>Video</Form.Label>
							{form.url && (
								<img
									src={
										form.url
											.split(".")
											.slice(0, -1)
											.join(".") + ".jpg"
									}
									alt="img"
								/>
							)}
						</div>
						<Button onClick={handleOnClick}>Upload Video</Button>
					</Form.Group>
					<Button variant="primary" type="submit">
						Upload
					</Button>
				</Form>
			</div>
		</>
	);
}

export default Upload;

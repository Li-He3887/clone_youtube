import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../apollo/mutation/login";
import {TOKEN_NAME} from '../vars/token'

const clientId = "9103764666-2bkf8s7mjntcrmnka1h757t0c864i1c6.apps.googleusercontent.com";

function Login() {
	const [gsiLoaded, setGsiLoaded] = useState(false);
	const btnDivRef = useRef();
	const [login, { data }] = useMutation(LOGIN);

	useEffect(() => {
		const handelGoogleletSignIn = res => {
			login({
				variables: { token: res.credential },
			});
		};

		const initializeGsi = _ => {
			if (!window.google || gsiLoaded) return;
			setGsiLoaded(true);

			window.google.accounts.id.initialize({
				client_id: clientId,
				callback: handelGoogleletSignIn,
			});

			window.google.accounts.id.renderButton(btnDivRef.current, {
				theme: "outline",
				size: "large",
			});
		};

		const script = document.createElement("script");
		script.src = "http://accounts.google.com/gsi/client";
		script.onload = initializeGsi;
		script.async = true;
		script.id = "google-script";
		document.querySelector("head")?.appendChild(script);

		return () => {
			document.getElementById("google-script")?.remove();
			window.google?.accounts.id.cancel();
		};
	}, [gsiLoaded]);

	useEffect(() => {
		if(data) {
			window.localStorage.setItem(TOKEN_NAME, data.login)
		}
		// console.log(TOKEN_NAME)
	},[data])

	return (
		<div>
			<div id="buttonDiv" ref={btnDivRef}></div>
		</div>
	);
}

export default Login;
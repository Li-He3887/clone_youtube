import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Script from "next/script";
import Head from "next/head";
import { TOKEN_NAME } from "../vars/token";
import Topnav from "../components/form/Topnav";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

const httpLink = createHttpLink({
	uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(TOKEN_NAME);
	return {
		headers: {
			...headers,
			authorization: token ? `${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
<<<<<<< HEAD
=======
	// const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	const cloudinaryOnLoad = _ => {
	// 		if (!window.google || !loading) return;
	// 		setLoading(false);
	// 		console.log("loaded");
	// 	};

	// 	const script = document.createElement("script");
	// 	script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
	// 	script.onload = cloudinaryOnLoad;
	// 	script.async = true;
	// 	script.id = "cloudinary-script";
	// 	document.querySelector("head")?.appendChild(script);
	// }, [loading]);

>>>>>>> a3a948727c07c7f051b319b04c2da5d49f6b2ea0
	// TODO: put a loader
	return (
		<ApolloProvider client={client}>
			<Head>
				<link
					href="https://unpkg.com/cloudinary-video-player@1.5.9/dist/cld-video-player.min.css"
					rel="stylesheet"
				/>
			</Head>
<<<<<<< HEAD
=======

>>>>>>> a3a948727c07c7f051b319b04c2da5d49f6b2ea0
			<Script
				src="https://unpkg.com/cloudinary-core@latest/cloudinary-core-shrinkwrap.min.js"
				strategy="beforeInteractive"
				type="text/javascript"></Script>
			<Script
				src="https://unpkg.com/cloudinary-video-player@1.5.9/dist/cld-video-player.min.js"
				strategy="beforeInteractive"
				type="text/javascript"></Script>
			<Topnav />
			<hr />
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;

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
	// TODO: put a loader
	return (
		<ApolloProvider client={client}>
			<Head>
				<link
					href="https://unpkg.com/cloudinary-video-player@1.5.9/dist/cld-video-player.min.css"
					rel="stylesheet"
				/>
			</Head>
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

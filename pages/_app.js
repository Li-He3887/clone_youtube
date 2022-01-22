import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import Script from "next/script";
import Head from "next/head";
import { TOKEN_NAME } from "../vars/token";
import Topnav from "../components/form/Topnav";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { getMainDefinition } from "@apollo/client/utilities";
// fix https://github.com/apollographql/subscriptions-transport-ws/issues/333

const httpLink = createHttpLink({
	uri: "http://localhost:4000/graphql",
});

const wsLink =
	process.browser &&
	new WebSocketLink({
		uri: "ws://localhost:4000/graphql",
		options: {
			reconnect: true,
			connectionParams: {
				authorization: localStorage.getItem(TOKEN_NAME),
			},
		},
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

const splitLink =
	process.browser &&
	split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === "OperationDefinition" &&
				definition.operation === "subscription"
			);
		},
		wsLink,
		authLink.concat(httpLink)
	);

const client = new ApolloClient({
	link: process.browser ? splitLink : authLink.concat(httpLink),
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

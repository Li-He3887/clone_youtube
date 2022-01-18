import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import {setContext} from '@apollo/client/link/context';
import {TOKEN_NAME} from '../vars/token';
import Topnav from "../components/form/Topnav";

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN_NAME);
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return(
    <ApolloProvider client={client}>
      <Topnav />
      <Component {...pageProps} />
      </ApolloProvider>
  ) 
    
}

export default MyApp
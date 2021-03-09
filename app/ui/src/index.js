import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

client.query({
  query: gql`
    query languageQuery {
      langs {
        id
        lang
        liked
      }
    }
  `
}).then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.querySelector('#root')
);


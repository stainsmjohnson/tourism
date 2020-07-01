import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import withSession from './WithSession';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4567/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers:{
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if(networkError){
      console.log('network Error from App.js')
    }
    if(networkError && networkError.statusCode === 401){
      localStorage.removeItem('token');
      console.log('You need to signin again!')
    }
  }
})

const WithSessionRoot = withSession(App)

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <WithSessionRoot />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
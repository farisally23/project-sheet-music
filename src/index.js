import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
//import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {createUploadLink} from 'apollo-upload-client';

import("./bootstrap.js")
  .catch(e => console.error("Error importing `bootstrap.js`:", e));

// 2 - CREATE UPLOAD LINK
const uploadLink = createUploadLink({
  uri: 'http://localhost:4000'
})

// 3
const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache()
})

// 4
ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
  )
serviceWorker.unregister();
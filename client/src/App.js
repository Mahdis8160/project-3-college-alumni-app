// import dependencies and components
import React from 'react'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Footer from './components/Footer'

// TODO: import other pages if need
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'




//import Apollo hooks and modules
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"

import { setContext } from "@apollo/client/link/context"


// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
        {/* V2 */}
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Navigation />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
  );
}

export default App;
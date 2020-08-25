import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost'
import { Route, Switch } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'

import Home from './screens/Home'
import Cart from './screens/Cart'
import ProductForm from './screens/ProductForm'
import Finished from './screens/Finished'
import Login from './Login'

const client = new ApolloClient({
  uri: '/graphql',  
  request: operation =>
    operation.setContext(() => ({
      headers: {
        authorization: Accounts._storedLoginToken()
      }
    }))
});

export const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Awesome Store</h1>
          <Login />
        </header>

        <div className="AppCurrentScreen">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={ProductForm} />
            <Route path="/cart" component={Cart} />
            <Route path="/finished" component={Finished} />
          </Switch>
        </div>

        <nav>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/cart">cart</Link></li>
            <li><Link to="/add">insert</Link></li>
          </ul>
        </nav>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

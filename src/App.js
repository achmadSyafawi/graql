import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import gql from "graphql-tag";
import { ApolloProvider, graphql } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeView from "./view/HomeView";
import CreateView from "./view/CreateView";
import DetailView from "./view/DetailView";

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: "https://w5xlvm3vzz.lp.gql.zone/graphql",
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path="/" component={HomeView} />
            <Switch>
              <Route exact path="/message/create" component={CreateView} />
              <Route exact path="/message/:id" component={DetailView} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

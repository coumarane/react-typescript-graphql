import * as React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from "history";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./styles/dashboard.css";
import { AppRoutes } from "./AppRoutes";
import apolloClient from "./graphql/apollo.client";




const history = createBrowserHistory();

class App extends React.Component<{}, {}> {

  render() {
    console.log(`process.env.GRAPH_URI : ${process.env.REACT_APP_GRAPH_URI}`)
    return (
      <>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <Router history={history}>
              <AppRoutes />
            </Router>
          </BrowserRouter>
        </ApolloProvider>
      </>
    );
  }
}

export default App;

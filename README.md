This project is a CRUD app which has two parts:
- Server
- Client

## Server
This is a back-end with expressjs [https://expressjs.com/] and graphql.
The package node-localstorage [https://www.npmjs.com/package/node-localstorage] is used to store data into file.

## Client
The front-side with reactjs, typescript, graphql, apolloclient, etc...


## GraphQL Front-End
- $ npm install --save graphql
- $ npm install --save graphql-tag
- $ npm install --save apollo-boost
- $ npm install --save react-apollo
- $ npm install --save react-apollo-hooks
- $ npm install --save-dev  @types/graphql

**How to use ApolloProvider in Front-End :**
Create .env file in the same level as package.json and and this variable: 
REACT_APP_GRAPH_URI: http://localhost:5000
The port is 500 because the server expressjs is launched on the port 5000 (see the .env file in server folder)

```
import * as React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router";
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from "history";

const cache = new InMemoryCache({ freezeResults: true });
const client = new ApolloClient({
  cache,
  uri: process.env.REACT_APP_GRAPH_URI,
  assumeImmutableResults: true,
});

const history = createBrowserHistory();

class App extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Router history={history}>
              <Switch>
                <Redirect exact={true} from={`/`} to={"/"} />
                <Route exact={true} path={"/home"} component={HomePage} />
              </Switch>
            </Router>
          </BrowserRouter>
        </ApolloProvider>
      </>
    );
  }
}
```

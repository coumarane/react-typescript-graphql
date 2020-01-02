This project is a CRUD app which has two parts:
- Server
- Client

## Server
This is a back-end with expressjs [https://expressjs.com/] and graphql.
The package node-localstorage [https://www.npmjs.com/package/node-localstorage] is used to store data into file.

## Client
The front-side with reactjs, typescript, graphql, apolloclient, etc...


## Run back-end:
- $ git clone https://github.com/coumarane/react-typescript-graphql.git
- $ cd server
- $ npm install
- $ npm start
- open your favorite web browser and in the url type this http://localhost:5000/graphql

**Test Graph:**
To add a new entry (you can add several entries):
```
mutation {
  addContact(name: "Coumarane COUPPANE", email: "c.coumarane@gmail.com", dateOfBirth: "24/07/1975")
  {
    id
  }
}
```

To get all entries:

```
query {
  contacts {
    id
    name
    email
    dateOfBirth
  }
}
```

To get an entry by its id:

```
query {
  contact(id: 1) {
    id
    name
    email
    dateOfBirth
  }
}
```

## Run front-end:
Open a new terminal and goto to the "react-typescript-graphql" and follows the instructions below:
$ cd client
$ npm install
$ npm start

## Note:

**GraphQL Front-End**
- $ npm install --save graphql
- $ npm install --save graphql-tag
- $ npm install --save apollo-boost
- $ npm install --save react-apollo
- $ npm install --save react-apollo-hooks
- $ npm install --save-dev  @types/graphql

**How to use ApolloProvider in Front-End :**
Create .env file in the same level as package.json and and this variable: 
REACT_APP_GRAPH_URI: http://localhost:5000
The port is 5000 because the server expressjs is launched on this port (see the .env file in server folder).
Add the following code in App.tsx.

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
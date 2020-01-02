import * as graphqlHTTP from "express-graphql";
import * as cors from 'cors';

import { schema } from "./graphql/shema";
import Server from "./server";

const server = Server;
const app = server.app;


//options for cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false
  };
app.use(cors.default(options))

app.use('/graphql', graphqlHTTP.default({
    schema,
    graphiql: true
}));

server.run();


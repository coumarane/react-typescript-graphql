const express = require("express");
const graphqlHTTP = require('express-graphql');
const rootSchema = require('./schema/schema')

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Server express is running on port ${port}`);
});

app.use('/graphql', graphqlHTTP({
   schema: rootSchema,
   graphiql: true 
}));

app.listen(port, () => {
  console.log(`Server express is running on port ${port}`);
  console.log('Press Ctrl+C to quit.');
});

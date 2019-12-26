const express = require("express");
const graphqlHTTP = require('express-graphql');
const rootSchema = require('./schema/schema')

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send(`Server express is running on port ${PORT}`);
});

app.use('/graphql', graphqlHTTP({
   schema: rootSchema,
   graphiql: true 
}));

app.listen(PORT, () => {
  console.log(`Server express is running on port ${PORT}`);
});

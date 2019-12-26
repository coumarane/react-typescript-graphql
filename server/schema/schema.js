const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const contactDatas = [
  {
    firstName: "Coumarane",
    lastName: "COUPPANE"
  },
  {
    firstName: "Helios",
    lastName: "Kumar"
  }
];

const contactType = new GraphQLObjectType({
  name: "Contact",
  fields: {
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    }
  }
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    // contact: {
    //     type: contactType,
    //     args: {
    //         id: { type: GraphQLInt}
    //     }
    // },
    contacts: {
      type: new GraphQLList(contactType),
      resolve: () => {
        return contactDatas;
      }
    }
  }
});

const rootSchema = new GraphQLSchema({
  query: queryType
});

module.exports = rootSchema;

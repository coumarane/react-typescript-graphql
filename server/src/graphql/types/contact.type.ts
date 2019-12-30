import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from "graphql";

export const ContactType = new GraphQLObjectType({
  name: "Contact",
  description: "Contact description",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString } 
  })
});


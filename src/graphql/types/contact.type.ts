import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} from 'graphql';

export const contactDatas = [
    {
      id: 1,
      firstName: "Coumarane",
      lastName: "COUPPANE"
    },
    {
      id: 2,  
      firstName: "Helios",
      lastName: "Kumar"
    }
  ];

class Contact {
    public name = "ContactType";
    public description = "Contact description";

    public fields = () => {
        return {
            id: { type: new GraphQLNonNull(GraphQLInt)},
            firstName: {
                type: GraphQLString
            },
            lastName: {
                type: GraphQLString
            }
        }
    }
}

export const ContactType = new GraphQLObjectType(new Contact());
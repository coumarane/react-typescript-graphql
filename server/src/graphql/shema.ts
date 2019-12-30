import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ContactType } from "./types/contact.type";
import ContactLocalStorageService from "../services/contactLocalStorageService";
import { IContact } from "src/models/contact";

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'App schema query root',
  fields: {
    contact: {
      type: ContactType,
      args: {id: { type: GraphQLID }},
      resolve: (parent, args) => {
        return ContactLocalStorageService.getById(+args.id);
      }
    },

    contacts: {
      type: new GraphQLList(ContactType),
      resolve: () => {
        const datas = ContactLocalStorageService.fetchContacts();
        console.log(`contacts: ${JSON.stringify(datas)}`)
        return datas;
      }
    }
    
  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "App schema mutation root",
  fields: {
    addContact: {
      type: ContactType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        dateOfBirth: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const contact: IContact = {id: 0, name: args.name, email: args.email, dateOfBirth: args.dateOfBirth}
        const newContact = ContactLocalStorageService.saveContact(contact);
        return newContact;
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

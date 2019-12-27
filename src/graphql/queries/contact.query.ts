import {
    GraphQLType,
    GraphQLList,
} from 'graphql';
import { find } from 'lodash';
import { GraphQLQuery } from "./abstract.query";
import { ContactType, contactDatas } from '../types/contact.type';



class ContactQuery implements GraphQLQuery {
    public type = new GraphQLList(ContactType);

    public description = "List of all Contacts";

    public resolve = () => {
        return contactDatas;
    }    
}

export default ContactQuery;
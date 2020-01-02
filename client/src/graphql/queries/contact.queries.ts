import gql from "graphql-tag";

export const ContactListQuery = gql`
{
  contacts {
    id
    name, 
    email,
    dateOfBirth
  }
}`;


export const ContactDetailQuery = gql`
  query ($id: ID!) {
    contact(id: $id) {
      id
      name, 
      email,
      dateOfBirth
    }
  }`;
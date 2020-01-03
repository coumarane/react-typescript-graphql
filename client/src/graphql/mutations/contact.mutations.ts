import gql from "graphql-tag";

export const AddContactMutation = gql`
  mutation addContact($name: String!, $email: String!, $dateOfBirth: String!) {
    addContact(name: $name, email: $email, dateOfBirth: $dateOfBirth) {
      id,
      name,
      email,
      dateOfBirth
    }
  }`;

export const UpdateContactMutation = gql`
  mutation updateContact($id: ID!, $name: String!, $email: String!, $dateOfBirth: String!) {
    updateContact(id: $id, name: $name, email: $email, dateOfBirth: $dateOfBirth) {
      id,
      name,
      email,
      dateOfBirth
    }
  }`; 

export const DeleteContactMutation  = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`;
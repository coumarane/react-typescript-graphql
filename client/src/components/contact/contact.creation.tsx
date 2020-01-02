import * as React from "react";
import { useMutation, useApolloClient } from "react-apollo";
import { IContact } from "../../models/contact";
import { AddContactMutation, UpdateContactMutation } from "../../graphql/mutations/contact.mutations";
import { ContactDetailQuery, ContactListQuery } from "../../graphql/queries/contact.queries";

interface IOwnProps {
  editContactId?: number;
}

const ContactCreation: React.FunctionComponent<IOwnProps> = (
  props: IOwnProps
) => {
  const initialContcatState: IContact = {
    id: 0,
    name: "",
    email: "",
    dateOfBirth: ""
  };

  const client = useApolloClient();
  
  const [addContact] = useMutation(AddContactMutation);

  // contact is a state variable
  const [contact, setContact] = React.useState(initialContcatState);

  React.useEffect(() => {
    if (props.editContactId && props.editContactId! > 0) {
      client.query({query: ContactDetailQuery, variables: {id: props.editContactId}}).then(result => {
        const contact = result.data.contact as IContact
        setContact(contact)
      });
    }
  }, [props.editContactId])

  const handleReset = () => {
    setContact(initialContcatState);
  }

  const handleSubmit = (
    e: any // React.SyntheticEvent<HTMLInputElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    // console.log(`ContactCreation::handleSubmit=>contact ${JSON.stringify(contact)}`);
    if (contact.id > 0) {
      client.mutate({mutation: UpdateContactMutation, variables: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        dateOfBirth: contact.dateOfBirth
      }, refetchQueries: [{query: ContactListQuery}]}).then(result => {
        const contact = result.data.contact as IContact
        console.log(`Updated successfully...`)
      });
    } else {
      addContact({
        variables: {name: contact.name, email: contact.email, dateOfBirth: contact.dateOfBirth},
        refetchQueries: [{query: ContactListQuery}] // to update ContactListQuery on ContactList.tsx
      })
    }
    
    handleReset();
  };

  /**
   * Common input change event
   * When the field is entered an event is raised and update the state
   */
  const handleInputChange = (
    e: React.SyntheticEvent<HTMLInputElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();

    const target = e.target as any;
    setContact(contact => ({ ...contact, [target.name]: target.value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card bg-light mb-3">
          <div className="card-header">New contact</div>
          <div className="card-body">
            <div className="card-text">
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contact.name}
                    placeholder="Enter name"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={contact.email}
                    placeholder="Enter email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    required
                    onChange={handleInputChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>

                <div className="form-group col-md-4">
                  <label>Date of birth</label>
                  <input
                    type="date"
                    max="2020-12-01"
                    min="1900-12-01"
                    name="dateOfBirth"
                    value={contact.dateOfBirth}
                    placeholder="Enter date of birth"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                  />
                </div>

              </div>

              {contact.id > 0 && <input className="btn btn-outline-danger" type="submit" value="Update" />}{` `}
              {contact.id <= 0 && <input className="btn btn-outline-primary" type="submit" value="Save" />}{` `}
              <input className="btn btn-outline-warning" type="button" value="Reset" onClick={handleReset} />{` `}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactCreation;

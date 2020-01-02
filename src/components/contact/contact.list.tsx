import * as React from "react";
import { useQuery } from "react-apollo";
import { IContact } from "../../models/contact";
import { ContactListQuery } from "../../graphql/queries/contact.queries";
import ErrorMessage from "../common/error.message";
import Loading from "../common/loading";


interface IOwnProps {
 handleDelete: (id: number) => (e: React.MouseEvent) => void;
 handleEdit: (id: number) => (e: React.MouseEvent) =>  void;
}

interface IData {
  contacts: IContact[];
}

const ContactList: React.FC<IOwnProps> = (props) => {
  const { loading, error, data } = useQuery<IData>(ContactListQuery)
  // const detailContactMutation = useQuery<IContact>(ContactDetailtQuery, { variables: { id: id }});
  // console.log(`data=>contacts: ${JSON.stringify(data?.contacts)}`)
  
  if (loading) return <><Loading /></>
  if (error || !data) return <><ErrorMessage error={error} /></>

  return (
    <>
      <h6>Contact list</h6>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.contacts &&
              data.contacts.length > 0 &&
              data.contacts.map((item: any, index: any) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.dateOfBirth}</td>
                      <th>
                        <i className="fa fa-edit" onClick={props.handleEdit(item.id)} style={{color: '##0d903c', cursor: 'pointer'}}>&nbsp;</i> | <i className="fa fa-trash" onClick={props.handleDelete(item.id)} style={{color: 'red', cursor: 'pointer'}}>&nbsp;</i>
                      </th>
                    </tr>
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};


// export const ContactListAsQuery: React.FC<IOwnProps> = (props) => {
//   return (
//     <>
//       <h6>Contact list</h6>

//       <Query<IData> query={ContactListQuery}>
//       {
//         ({loading, error, data}) => {
//           if (loading) return <>"Loading..."</>
//           if (error || !data) return <>`Error!`</>

//           return (
//             <>
//             <div className="table-responsive">
//               <table className="table table-striped table-sm">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Date of birth</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data && data.contacts &&
//                     data.contacts.length > 0 &&
//                     data.contacts.map((item, index) => {
//                       return (
//                         <React.Fragment key={index}>
//                           <tr>
//                             <td>{item.id}</td>
//                             <td>{item.name}</td>
//                             <td>{item.email}</td>
//                             <td>{item.dateOfBirth}</td>
//                             <th>
//                               <i className="fa fa-edit" onClick={props.handleEdit(item.id)} style={{color: '##0d903c', cursor: 'pointer'}}>&nbsp;</i> | <i className="fa fa-trash" onClick={props.handleDelete(item.id)} style={{color: 'red', cursor: 'pointer'}}>&nbsp;</i>
//                               </th>
//                           </tr>
//                         </React.Fragment>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//             </>
//           )
//         }
//       }
//       </Query>

//     </>
//   );
// };

export default ContactList;

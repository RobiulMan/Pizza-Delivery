import { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import {
  deleteUserAction,
  getAllUserAction
} from "../context/actions/userActions";
import { GlobalContext } from "../context/Provider";

const UsersList = () => {
  const { getAllUser, getAllUserdispatch } = useContext(GlobalContext);
  useEffect(() => {
    getAllUserAction()(getAllUserdispatch);
  }, [getAllUserdispatch]);
  console.log(getAllUser.data);
  return (
    <div>
      {getAllUser.loading && <Loading />}
      {getAllUser.error && (
        <Message error="something want wrong!" signveritent="alert-danger" />
      )}
      <div className="table-responsive mt-4">
        {getAllUser.data && (
          <div className="table-responsive mt-4">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">User Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {getAllUser.data.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>

                      <td>{item.name}</td>
                      <td>{item.email}</td>

                      <td>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => deleteUserAction(item._id)()}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {/* {console.log(getAllOrderState.order)} */}
      </div>
    </div>
  );
};

export default UsersList;

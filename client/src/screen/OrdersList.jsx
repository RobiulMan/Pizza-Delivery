import { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import {
  deliverOrdersAction,
  getAllOrdersAction
} from "../context/actions/OrderAction";
import { GlobalContext } from "../context/Provider";

const OrdersList = () => {
  const { getAllOrderState, getallorderdispatch } = useContext(GlobalContext);
  useEffect(() => {
    getAllOrdersAction()(getallorderdispatch);
  }, [getallorderdispatch]);

  return (
    <div className="container">
      <h1>Order List</h1>
      {getAllOrderState.loading && <Loading />}
      {getAllOrderState.error && (
        <Message error="something want wrong!" signveritent="alert-primary" />
      )}

      <div className="table-responsive mt-4">
        {getAllOrderState.order && (
          <div className="table-responsive mt-4">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">User Id</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {getAllOrderState.order.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>

                      <td>{item.email}</td>
                      <td>{item.userId}</td>
                      <td>{item.orderAccount}</td>
                      <td>{item.createdAt.substring(0, 10)}</td>
                      <td>
                        {item.isDelivered ? (
                          <span className="badge bg-success">Delivered</span>
                        ) : (
                          <button
                            className="btn btn-color"
                            onClick={() =>
                              deliverOrdersAction(item._id)(getallorderdispatch)
                            }
                          >
                            Delivered
                          </button>
                        )}
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

export default OrdersList;

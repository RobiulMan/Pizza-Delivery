import { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { getOrderUserAction } from "../context/actions/OrderAction";
import { GlobalContext } from "../context/Provider";

const OrderScreen = () => {
  const { getOrderState, getorderdispatch, loginState } =
    useContext(GlobalContext);
  useEffect(() => {
    getOrderUserAction(loginState)(getorderdispatch);
  }, [getorderdispatch, loginState]);
  console.log(getOrderState.order);
  return (
    <div className="container">
      <h1>Order</h1>
      {getOrderState.loading && <Loading />}
      {getOrderState.error && (
        <Message error="something want wrong!" signveritent="alert-primary" />
      )}

      <div className="table-responsive mt-4">
        {getOrderState.order && (
          <div className="table-responsive mt-4">
            <table className="table table-borderless table-dark">
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Location</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {getOrderState.order.order.map((item) => {
                  const data = new Date(item.createdAt).toLocaleDateString();
                  return item.orderItems.map((food) => {
                    return (
                      <tr>
                        <td>{food.name}</td>

                        <td>
                          city: {item.shippingAddress.city} <br />
                          street: {item.shippingAddress.street}
                          <br />
                          zip: {item.shippingAddress.pincode}
                        </td>
                        <td>${food.price}</td>
                        <td>{data}</td>
                        <td>
                          {console.log(item.isDelivered)}
                          {!item.isDelivered ? (
                            <span className="badge rounded-pill bg-warning text-dark">
                              Process
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-success">
                              Delivered
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderScreen;

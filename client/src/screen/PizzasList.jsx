import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import {
  deletePizzaAction,
  getAllPizzaAction,
} from "../context/actions/PizzaActions";
import { GlobalContext } from "../context/Provider";
const PizzzList = () => {
  const { allPizzaState, dispatch } = useContext(GlobalContext);
  console.log(allPizzaState);

  useEffect(() => {
    getAllPizzaAction()(dispatch);
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Order</h1>
      {allPizzaState.loading && <Loading />}
      {allPizzaState.error && (
        <Message
          error="something want wrong!"
          signveritent="alert-primary"
        />
      )}

      <div className="table-responsive mt-4">
        {allPizzaState.data.data && (
          <div className="table-responsive mt-4">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Catagory</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allPizzaState.data.data.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.name}</td>

                      <td>
                        <strong>S </strong> : ${" "}
                        {item.prices[0]["small"]}
                        <br /> <strong>M</strong> : ${" "}
                        {item.prices[0]["medium"]}
                        <br /> <strong> L </strong> : ${" "}
                        {item.prices[0]["large"]}
                      </td>
                      <td>{item.category}</td>
                      <td>
                        <Link
                          to={`/admin/editpizza/${item._id}`}
                          className="btn btn-outline-secondary"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            deletePizzaAction(
                              item._id,
                            )(dispatch);
                          }}
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
      </div>
    </div>
  );
};

export default PizzzList;

// {allPizzaState.loading ? (
//   <Loading />
// ) : allPizzaState.error ? (
//   <Message error="something want wrong!" signveritent="alert-danger" />
// ) : (
//   <div className="row">
//     {allPizzaState.data.map((pizza, id) => {
//       return (
//         <div className="col-md-4" key={pizza._id}>
//           <div>
//             <Pizza pizza={pizza} key={id} />
//           </div>
//         </div>
//       );
//     })}
//   </div>
// )}

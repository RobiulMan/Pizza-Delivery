import React, { useContext, useEffect } from "react";
import Pizza from "../components/Pizza";
import { GlobalContext } from "../context/Provider";

const HomePage = () => {
  const { allPizzaState, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    fetch("api/pizza")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        dispatch({
          type: "GET_PIZZAS_SUCCESS",
          loading: false,
          data: data,
          error: ""
        });
      })

      .catch((err) => {
        dispatch({
          type: "GET_PIZZAS_FAILED",
          loading: false,
          data: [],
          error: err
        });
      });
  }, [dispatch]);

  return (
    <div className="container">
      {allPizzaState.loading ? (
        <h1>loading..</h1>
      ) : allPizzaState.error ? (
        <h1>smeting want wrong</h1>
      ) : (
        <div className="row">
          {allPizzaState.data.map((pizza, id) => {
            return (
              <div className="col-md-4" key={pizza._id}>
                <div>
                  <Pizza pizza={pizza} key={id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;

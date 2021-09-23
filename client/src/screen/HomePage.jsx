import React, { useContext, useEffect } from "react";
import Pizza from "../components/Pizza";
import getAllPizzaAction from "../context/actions/PizzaActions";
import { GlobalContext } from "../context/Provider";

const HomePage = () => {
  const { allPizzaState, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    // pizza Action from the actions dir
    getAllPizzaAction()(dispatch);
  }, [dispatch]);

  return (
    <div className="container">
      {allPizzaState.loading ? (
        <h1>loading..</h1>
      ) : allPizzaState.error ? (
        <h1>someting want wrong</h1>
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

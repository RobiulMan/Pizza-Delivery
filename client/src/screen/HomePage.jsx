import React, { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Pizza from "../components/Pizza";
import Search from "../components/Search";
import { getAllPizzaAction } from "../context/actions/PizzaActions";
import { GlobalContext } from "../context/Provider";

const HomePage = () => {
  const { allPizzaState, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    getAllPizzaAction()(dispatch);
  }, [dispatch]);

  return (
    <div className="container">
      <Search />
      {allPizzaState.loading ? (
        <Loading />
      ) : allPizzaState.error ? (
        <Message error="something want wrong!" signveritent="alert-danger" />
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

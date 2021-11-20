import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import {
  getPizzaByIdAction,
  updatePizzaAction
} from "../context/actions/PizzaActions";
import { GlobalContext } from "../context/Provider";
const EditPizza = ({ match }) => {
  const [pizzaName, setPizzaName] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, SetMediumPrice] = useState("");
  const [largePrice, setLeargPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const {
    getPizzaByIdState,
    getPizzaByIddispatch,
    updatePizzaState,
    updatePizzadispatch
  } = useContext(GlobalContext);
  const { data } = getPizzaByIdState;
  useEffect(() => {
    if (data) {
      if (data._id === match.params.pizzaId) {
        setPizzaName(data.name);
        setSmallPrice(data.prices[0].small);
        SetMediumPrice(data.prices[0].medium);
        setLeargPrice(data.prices[0].large);
        setDescription(data.description);
        setCategory(data.category);
        setImage(data.image);
      } else {
        getPizzaByIdAction(match.params.pizzaId)(getPizzaByIddispatch);
      }
    } else {
      getPizzaByIdAction(match.params.pizzaId)(getPizzaByIddispatch);
    }
  }, [match.params.pizzaId, getPizzaByIddispatch, data]);

  function formHandler(e) {
    e.preventDefault();
    const pizza = {
      id: match.params.pizzaId,
      name: pizzaName,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice
      }
    };
    updatePizzaAction(pizza)(updatePizzadispatch);
    // addPizzaAction(pizza)(addpizzadispatch);
    // reset the form
    // if (updatePizzaState.success) {
    //   setPizzaName("");
    //   setSmallPrice("");
    //   SetMediumPrice("");
    //   setLeargPrice("");
    //   setDescription("");
    //   setCategory("");
    //   setImage("");
    //   updatePizzaState.success = false;
    // }
  }

  return (
    <div>
      <h1>edit pizza</h1>
      {getPizzaByIdState.loading && <Loading />}
      {getPizzaByIdState.error && (
        <Message error="something want wrong!" signveritent="alert-danger" />
      )}
      {updatePizzaState.loading && <Loading />}

      {updatePizzaState.success ? (
        <Message
          error="Pizza has been updated successfuly!"
          signveritent="alert-success"
        />
      ) : updatePizzaState.error ? (
        <Message error="something want wrong!" signveritent="alert-danger" />
      ): ''}

      <form onSubmit={formHandler}>
        <div className="col-4 m-auto">
          <div className="col mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Pizza Name"
              name="name"
              value={pizzaName}
              onChange={(e) => setPizzaName(e.target.value)}
              required
            />
          </div>
          <div className="col mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="small varient price"
              name="s-varitnet-price"
              value={smallPrice}
              onChange={(e) => setSmallPrice(e.target.value)}
              required
            />
          </div>
          <div className="col mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="medium varient price"
              name="m-varitnet-price"
              value={mediumPrice}
              onChange={(e) => SetMediumPrice(e.target.value)}
              required
            />
          </div>
          <div className="col mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="large varient price"
              name="l-varitnet-price"
              value={largePrice}
              onChange={(e) => setLeargPrice(e.target.value)}
              required
            />
          </div>
          <div className="col mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="col mb-1">
            <textarea
              name="description"
              className="form-control"
              rows="3"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="col mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="image url"
              name="image-url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <span>
              upload image this site <a href="https://imgbb.com/">click</a> to
              get image url afte that put the url in this files
            </span>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-color">
              Edit Pizza
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPizza;

// {getPizzaByIdState.loading && <Loading />}
//       {getPizzaByIdState.error && (
//         <Message error="something want wrong!" signveritent="alert-danger" />
//       )}

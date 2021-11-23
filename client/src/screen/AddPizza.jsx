import { useContext, useState } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { addPizzaAction } from "../context/actions/PizzaActions";
import { GlobalContext } from "../context/Provider";
const AddPizza = () => {
  const [pizzaName, setPizzaName] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, SetMediumPrice] = useState("");
  const [largePrice, setLeargPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const { addPizzaState, addpizzadispatch } = useContext(GlobalContext);
  function formHandler(e) {
    e.preventDefault();
    const pizza = {
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

    addPizzaAction(pizza)(addpizzadispatch);
          // reset the form
    if (addPizzaState.success) {

      setPizzaName("");
      setSmallPrice("");
      SetMediumPrice("");
      setLeargPrice("");
      setDescription("");
      setCategory("");
      setImage("");
    }
  }

  return (
    <div>
      <h1>Add Pizza</h1>
      {addPizzaState.loading ? <Loading /> : ""}
      {addPizzaState.success ? (
        <Message
          error="new Pizza Added Successfuly!"
          signveritent="alert-success"
        />
      ) : addPizzaState.error ? (
        <Message error="something want wrong!" signveritent="alert-danger" />
      ) : (
        ""
      )}

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
              Add Pizza
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPizza;

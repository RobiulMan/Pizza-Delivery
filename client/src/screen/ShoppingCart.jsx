import { useContext } from "react";
import CheckoutButton from "../components/CheckoutButton";
import {
  addToCartAction,
  deleteFromCart
} from "../context/actions/AddToCartAction";
import { GlobalContext } from "../context/Provider";

const ShoppingCart = () => {
  const { cartItemState, cartdispatch } = useContext(GlobalContext);

  const totalSubPrice = cartItemState.cartItems.reduce(
    (init, item) => init + item.price,
    0
  );
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="card wish-list mb-3">
            <div className="card-body">
              <h5 className="mb-4">
                Cart (<span>{cartItemState.cartItems.length}</span> items)
              </h5>

              {cartItemState.cartItems.map((item) => {
                return (
                  <>
                    <div className="row mb-4" ids={item._id}>
                      <div className="col-md-5 col-lg-3 col-xl-3">
                        <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                          <img
                            className="img-fluid w-100"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                      </div>
                      <div className="col-md-7 col-lg-9 col-xl-9">
                        <div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5>{item.name}</h5>

                              <p className="mb-3 text-muted text-uppercase small">
                                Size: <strong>{item.varient}</strong>
                              </p>
                            </div>
                            <div className="mb-2 text-center">
                              <div className="d-flex col-7 m-auto">
                                <button
                                  className="minus btn"
                                  onClick={() =>
                                    addToCartAction(
                                      item,
                                      item.quentity - 1,
                                      item.varient
                                    )(cartdispatch)
                                  }
                                >
                                  <i className="bi bi-dash-lg"></i>
                                </button>
                                <input
                                  className="form-control "
                                  min="0"
                                  name="quantity"
                                  value={item.quentity}
                                  type="number"
                                />
                                <button
                                  className="plus btn"
                                  onClick={() =>
                                    addToCartAction(
                                      item,
                                      item.quentity + 1,
                                      item.varient
                                    )(cartdispatch)
                                  }
                                >
                                  <i className="bi bi-plus-lg"></i>
                                </button>
                              </div>
                              <small>Quentity</small>
                            </div>
                          </div>
                          <div className="d-flex justify-content-around align-items-center">
                            <div>
                              <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                  deleteFromCart(item)(cartdispatch);
                                }}
                              >
                                <i className="bi bi-trash mr-1"></i> Remove item
                              </button>
                            </div>
                            <p className="mb-0">
                              <span>
                                <strong>${item.price}.00</strong>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="mb-4" />
                  </>
                );
              })}

              <p className="text-primary mb-0">
                <i className="fas fa-info-circle mr-1"></i>
                Do not delay the purchase, adding items to your cart does not
                mean booking them.
              </p>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-4">Expected shipping delivery</h5>

              <p className="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-4">We accept</h5>

              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://z9t4u9f6.stackpathcdn.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                alt="PayPal acceptance mark"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-3">The total amount of</h5>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Temporary amount
                  <span>${totalSubPrice}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>Gratis</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>The total amount of</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>${totalSubPrice}</strong>
                  </span>
                </li>
              </ul>
              <div className="d-grid gap-2 mx-auto">
                <CheckoutButton totalSubPrice={totalSubPrice} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;

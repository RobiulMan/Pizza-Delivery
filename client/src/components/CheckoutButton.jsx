import { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import placeOrderAction from "../context/actions/PlaceOrderAction";
import { GlobalContext } from "../context/Provider";
import Message from "./Message";

const CheckoutButton = ({ totalSubPrice }) => {
  const { cartItemState, loginState, placeorderdispatch } =
    useContext(GlobalContext);

  function tokenHandler(token) {
    placeOrderAction(
      token,
      totalSubPrice,
      cartItemState,
      loginState
    )(placeorderdispatch);
  }

  return (
    <>
      {loginState.loginUserInfo ? (
        <StripeCheckout
          amount={totalSubPrice * 100}
          shippingAddress
          token={tokenHandler}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button type="button" className="btn btn-primary">
            go to checkout
          </button>
        </StripeCheckout>
      ) : (
        <>
          {" "}
          <button type="button" className="btn btn-primary" disabled>
            go to checkout
          </button>
          <Message
            error="after login to active the checkout button!"
            signveritent="alert-info"
          />
        </>
      )}
    </>
  );
};

export default CheckoutButton;

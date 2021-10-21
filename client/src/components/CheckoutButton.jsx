import { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import { placeOrderAction } from "../context/actions/OrderAction";
import { GlobalContext } from "../context/Provider";
import Loading from "./Loading";
import Message from "./Message";

const CheckoutButton = ({ totalSubPrice }) => {
  const { cartItemState, loginState, placeOrderState, placeorderdispatch } =
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
        <>
          {placeOrderState.loading ? (
            <Loading />
          ) : placeOrderState.error ? (
            <Message
              error="something want wrong!"
              signveritent="alert-danger"
            />
          ) : placeOrderState.success ? (
            <Message
              error="order has been successfully"
              signveritent="alert-success"
            />
          ) : (
            ""
          )}

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
        </>
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

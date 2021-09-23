import React, { useContext } from "react";
import { GlobalContext } from "../context/Provider";
const Navbar = () => {
  const { cartItemState } = useContext(GlobalContext);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg 
        shadow-lg p-3 mb-5 rounded"
      >
        <div className="container-fluid ">
          <a className="navbar-brand" href='/'>
            Pizza-Delivery
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href={1}>
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  Cart
                  <span className="badge bg-danger">
                    {cartItemState.cartItems.length > 0
                      ? cartItemState.cartItems.length
                      : ""}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

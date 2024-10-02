import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoutAction from "../context/actions/LogoutAction";
import { GlobalContext } from "../context/Provider";
const Navbar = () => {
    const { cartItemState, loginState } = useContext(GlobalContext);

    return (
        <>
            <nav
                className="navbar navbar-expand-lg 
        border-bottom rounded"
            >
                <div className="container-fluid ">
                    <Link className="navbar-brand" to="/">
                        Pizza-Delivery
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="">
                            <i className="bi bi-list"></i>
                        </span>
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarNav"
                    >
                        <ul className="navbar-nav ">
                            {loginState?.loginUserInfo ? (
                                <div className="dropdown">
                                    <button
                                        className="btn  dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-person"></i>
                                        {loginState.loginUserInfo.name}
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        {loginState.loginUserInfo.isAdmin ? (
                                            <li>
                                                <Link
                                                    className="nav-link dropdown-item"
                                                    aria-current="page"
                                                    to="/admin"
                                                >
                                                    Admin
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        <li>
                                            <Link
                                                className="nav-link dropdown-item"
                                                aria-current="page"
                                                to="/order"
                                            >
                                                Order
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="nav-link dropdown-item"
                                                aria-current="page"
                                                to="/login"
                                                onClick={() => logoutAction()()}
                                            >
                                                LogOut
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <i className="bi bi-bag">
                                        {" "}
                                        Cart
                                        <span className="badge bg-danger">
                                            {cartItemState?.cartItems.length > 0
                                                ? cartItemState.cartItems.length
                                                : ""}
                                        </span>
                                    </i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

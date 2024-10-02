import { useContext, useEffect } from "react";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context/Provider";
import AddPizza from "./AddPizza";
import "./adminstyle/animate.css";
import "./adminstyle/style.css";
import EditPizza from "./EditPizza";
import OrdersList from "./OrdersList";
import PizzasList from "./PizzasList";
import UsersList from "./UsersList";
const AdminScreen = () => {
    const { loginState } = useContext(GlobalContext);
    useEffect(() => {
        if (loginState.loginUserInfo !== null) {
            const { isAdmin } = loginState.loginUserInfo;
            if (!isAdmin) {
                window.location.href = "/";
            }
        } else {
            window.location.href = "/";
        }
    }, [loginState]);

    return (
        <div className="content">
            <div className="container">
                <h2 className="my-5 text-center">Admin Deshbord</h2>

                <div className="d-flex carousel-nav">
                    <NavLink
                        className="col"
                        activeClassName="active"
                        to="/admin/userlist"
                        aria-current="page"
                    >
                        User List
                    </NavLink>
                    <NavLink
                        className="col"
                        activeClassName="active"
                        to="/admin/pizzalist"
                        aria-current="page"
                    >
                        Pizzas List
                    </NavLink>
                    <NavLink
                        className="col"
                        activeClassName="active"
                        aria-current="page"
                        to="/admin/addpizza"
                    >
                        Add New Pizza
                    </NavLink>
                    <NavLink
                        className="col"
                        activeClassName="active"
                        aria-current="page"
                        to="/admin/orderlist"
                    >
                        Orders List
                    </NavLink>
                </div>

                <div className="owl-carousel owl-1">
                    <Switch>
                        <Route
                            path="/admin/userlist"
                            exact
                            component={UsersList}
                        />
                        <Route
                            path="/admin/pizzalist"
                            exact
                            component={PizzasList}
                        />
                        <Route
                            path="/admin/addpizza"
                            exact
                            component={AddPizza}
                        />
                        <Route
                            path="/admin/orderlist"
                            exact
                            component={OrdersList}
                        />
                        <Route
                            path="/admin/editpizza/:pizzaId"
                            exact
                            component={EditPizza}
                        />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default AdminScreen;

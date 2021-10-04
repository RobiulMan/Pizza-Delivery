import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginAction from "../context/actions/loginAction";
import { GlobalContext } from "../context/Provider";
import "./Login.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { logindispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      window.location.href = "/";
    }
  });
  function login() {
    const user = {
      email,
      password
    };

    loginAction(user)(logindispatch);
    setemail("");
    setpassword("");
    alert("account logined successfully");
  }
  return (
    <div className="d-flex">
      <div className="col-sm-6 login-section-wrapper">
        <div className="brand-wrapper">
          <h4>Pizza Delivery</h4>
        </div>
        <div className="login-wrapper my-auto">
          <h1 className="login-title">Log in</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="enter your passsword"
              />
            </div>
            <input
              name="login"
              id="login"
              className="form-control btn login-btn"
              type="button"
              value="Login"
              onClick={login}
            />
          </form>
          <Link href="#!" className="forgot-password-link">
            Forgot password?
          </Link>
          <p className="login-wrapper-footer-text">
            Don't have an account?
            <Link to="/registation" className="text-reset">
              Register here
            </Link>
          </p>
        </div>
      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block">
        <img
          src="https://i.ibb.co/ThqqVHc/Apizza.jpg"
          alt="login"
          className="login-img"
        />
      </div>
    </div>
  );
};
export default Login;

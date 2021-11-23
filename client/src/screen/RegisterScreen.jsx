import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { userAction } from "../context/actions/userActions";
import { GlobalContext } from "../context/Provider";
import "./Login.css";
const Registation = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confpassword, setconfpasswor] = useState("");
  const { userState, userdispatch } = useContext(GlobalContext);

  function register() {
    if (password !== confpassword) {
      alert("password not matched..");
    } else {
      const user = {
        name,
        email,
        password
      };

      userAction(user)(userdispatch);
      setname("");
      setemail("");
      setpassword("");
      setconfpasswor("");
      alert("account created successfully");
    }
  }

  return (
    <div className="d-flex">
      <div className="col-sm-6 login-section-wrapper">
        <div className="brand-wrapper">
          <h4>Pizza Delivery</h4>
          {userState.error ? (
            <Message error="User Already Exists" signveritent="alert-danger" />
          ) : userState.success ? (
            <Message
              error="account created successfully!"
              signveritent="alert-success"
            />
          ) : (
            ""
          )}
        </div>
        <div className="login-wrapper my-auto">
          <h1 className="login-title">Log in</h1>
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
                type="name"
                name="name"
                id="name"
                className="form-control"
                placeholder="enter you name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                required
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
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="enter your passsword"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="conf-password">Confirm Password</label>
              <input
                required
                value={confpassword}
                onChange={(e) => setconfpasswor(e.target.value)}
                type="password"
                name="conf-password"
                id="conf-password"
                className="form-control"
                placeholder="confirm passsword"
              />
            </div>
            <input
              onClick={register}
              name="registation"
              id="registation"
              className="form-control btn login-btn"
              type="button"
              value="Registation"
            />
          </div>

          <p className="login-wrapper-footer-text">
            have an account?
            <Link to="/login" className="text-reset">
              Login
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
export default Registation;

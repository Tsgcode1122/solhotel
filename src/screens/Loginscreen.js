import React, { useState } from "react";
import axios from "axios";

const Loginscreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(null);

  const login = async () => {
    const user = {
      email,
      password,
    };

    try {
      const result = (
        await axios.post(
          "https://tossolback.onrender.com/api/users/login",
          user,
        )
      ).data;
      localStorage.setItem("currentUser", JSON.stringify(result));
      setLoginSuccess(true);
      setEmail("");
      setPassword("");
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      // Login failed
      setLoginSuccess(false);
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs ">
            <h2 className="">Login</h2>

            <input
              type="email"
              className="form-control"
              placeholder="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.toLowerCase());
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={login}>
              Login
            </button>
            <a href="/resetpassword" className="">
              <p> forget password?</p>
            </a>

            <p>
              {" "}
              New user?{" "}
              <a href="/register" className="">
                Create an account
              </a>
            </p>

            {loginSuccess === true && (
              <div className="alert alert-success mt-3" role="alert">
                Login successful!
              </div>
            )}

            {loginSuccess === false && (
              <div className="alert alert-danger mt-3" role="alert">
                Invalid email or password.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;

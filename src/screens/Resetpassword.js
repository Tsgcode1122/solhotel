import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Resetpassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetsuccess, setResetsuccess] = useState(null);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);

  const checkEmail = async () => {
    try {
      if (!email) {
        setErrorMessage("Email is required.");
        return;
      }

      // Check if email exists
      const response = await axios.post(
        "https://tossolback.onrender.com/api/users/checkemail",
        { email },
        setErrorMessage(""),
      );
      const userExists = response.data.exists;

      if (!userExists) {
        setErrorMessage("Email does not exist.");
        return;
      }

      setShowPasswordInputs(true);
    } catch (error) {
      console.log(error);
    }
  };

  const reset = async () => {
    try {
      if (password !== confirmpassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      const user = {
        email,
        password,
      };

      const result = await axios.post(
        "https://tossolback.onrender.com/api/users/reset",
        user,
      );
      localStorage.setItem("currentUser", JSON.stringify(result.data));

      Swal.fire("", "Password Reset", "success").then((result) => {
        window.location.href = "/login";
      });
    } catch (error) {
      console.log(error);
      setResetsuccess(false);
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs ">
            <h2 className="">Reset Password</h2>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {!showPasswordInputs && (
              <div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />
                <button className="btn btn-primary mt-3" onClick={checkEmail}>
                  Reset Password
                </button>
              </div>
            )}

            {showPasswordInputs && (
              <div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  required
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <button className="btn btn-primary mt-3" onClick={reset}>
                  Done
                </button>
              </div>
            )}

            {resetsuccess === true && (
              <div className="alert alert-success mt-3" role="alert">
                Password Reset successful!
              </div>
            )}

            {resetsuccess === false && (
              <div className="alert alert-danger mt-3" role="alert">
                Something went wrong, please try again.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;

import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
const Registerscreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      if (!email || !name || !password || !confirmpassword) {
        setErrorMessage("All fields are required.");
        return;
      }

      // Email validation check
      if (!email.includes("@")) {
        setErrorMessage("Invalid email format. Please enter a valid email.");
        return;
      }
      // Password validation: at least 6 characters and at least one number
      const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
      if (!passwordRegex.test(password)) {
        setErrorMessage(
          " Password must be at least 6 characters long and contain at least one number",
        );
        return;
      }

      if (password !== confirmpassword) {
        setErrorMessage(" Passwords do not match.");
        return;
      }

      const user = { name, email, password, confirmpassword };
      setLoading(true);
      const result = await axios.post(
        "https://tossolback.onrender.com/api/users/register",
        user,
      );
      setLoading(false);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmpassword("");
      Swal.fire("Congrats", "Registration Successful", "success").then(
        (result) => {
          window.location.href = "/login";
        },
      );
    } catch (error) {
      setSuccessMessage("");
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error(" failed:", error.response.data.error);
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h2 className="">Register</h2>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              required
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerscreen;

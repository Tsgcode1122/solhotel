import React from "react";
import { Link } from "react-router-dom";

const Landingscreen = () => {
  return (
    <div className="row landing justify-content-center">
      <div className="col-md-8 text-center my-auto">
        <h3 style={{ color: "white", fontSize: "80px" }}> SheyRooms</h3>
        <h1 style={{ color: "white" }} className="mt-5">
          There is only on eboss, the GUest.
        </h1>

        <Link to="/home">
          <button className="btn btn-primary landingbtn">Get started</button>
        </Link>
      </div>
    </div>
  );
};

export default Landingscreen;

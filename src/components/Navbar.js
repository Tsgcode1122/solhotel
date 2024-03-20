import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <div className="navs">
      <div className="navdesign">
        <a href="/" style={{ fontSize: "18px", lineHeight: "1.5" }}>
          Soltos Hotel
        </a>

        <div className="proflog">
          {user ? (
            <>
              <div
                onClick={toggleProfile}
                style={{ fontSize: "18px", lineHeight: "1.5" }}
              >
                <i className="fa-solid fa-user"></i> {user.name}{" "}
                <i class="fa-solid fa-caret-down"></i>
              </div>
            </>
          ) : (
            <>
              <div
                className="reglog"
                style={{ fontSize: "18px", lineHeight: "1.5" }}
              >
                <a href="/register">Register</a>
                <a href="/login">Login</a>
              </div>
            </>
          )}
        </div>
      </div>
      {showProfile && (
        <div
          className="llloog "
          style={{ fontSize: "18px", lineHeight: "1.5" }}
        >
          <div className="aa">
            <a href="/profile">Profile</a>
            <a href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

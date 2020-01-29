import React from "react";
import logo from "../images/logo.png";
import { NavLink, BrowserRouter } from "react-router-dom";
const Navbar = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <nav
          className="navbar navbar-dark bg-dark navbar-expand-sm"
          style={{ fontWeight: "bold", color: "white", borderRadius: "10px" }}
        >
          <div
            className="navbar-brand mx-auto"
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt=""
              style={{ marginRight: "10px" }}
            ></img>
            BYON
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/"
                  activeClassName="active"
                >
                  ImageNet
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/train"
                  activeClassName="active"
                >
                  Train With Your Own Data
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/build"
                  activeClassName="active"
                >
                  Build Your Own
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </BrowserRouter>
  );
};

export default Navbar;

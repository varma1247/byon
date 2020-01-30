import React from "react";
import logo from "../images/logo.png";
import { NavLink, BrowserRouter } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="container">
      <nav
        className="navbar navbar-dark bg-dark navbar-expand-sm"
        style={{ fontWeight: "bold", color: "white", borderRadius: "10px" }}
      >
        <NavLink
          className="navbar-brand mx-auto"
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            textAlign: "center"
          }}
          to="/"
          exact
        >
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt=""
            style={{ marginRight: "10px" }}
          ></img>
          <span className="navbar-text">BYON</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border:"none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="nav navbar-nav ml-sm-auto" style={{ marginLeft: "30px" }}>
            <li className="nav-item align-self-center">
              <NavLink
                className="nav-link"
                exact
                to="/"
                activeClassName="active"
              >
                ImageNet
              </NavLink>
              {/* <a className="nav-link" href="#">
                Build Your Own
              </a> */}
            </li>
            <li className="nav-item align-self-center">
              <NavLink
                className="nav-link"
                exact
                to="/train"
                activeClassName="active"
              >
                Train With Your Own Data
              </NavLink>
              {/* <a className="nav-link" href="#">
                Train With Your Own Data
              </a> */}
            </li>
            <li className="nav-item align-self-center">
              <NavLink
                className="nav-link"
                exact
                to="/build"
                activeClassName="active"
              >
                Build Your Own Model
              </NavLink>
              {/* <a className="nav-link" href="#">
                Build Your Own
              </a> */}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

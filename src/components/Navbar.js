import React from "react";
import logo from "../images/logo.png";
import { blue } from "@material-ui/core/colors";
const Navbar = () => {
  return (
    <div className="container">
      <nav
        className="navbar navbar-dark bg-dark navbar-expand-sm"
        style={{ fontWeight: "bold", color: "white", borderRadius: "10px" }}
      >
        <a
          className="navbar-brand mx-auto"
          style={{ display: "flex", alignItems: "center", cursor:"pointer" }}
        >
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt=""
            style={{ marginRight: "10px"}}
          ></img>
          BYON
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Train With Your Own Data
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Build Your Own
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

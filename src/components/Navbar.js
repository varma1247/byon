import React from "react";
import logo from "../images/logo.png";
const Navbar = () => {
  return (
    <div className="container">
      <nav
        className="navbar navbar-dark bg-dark"
        style={{ fontWeight: "bold", color: "white", borderRadius: "10px" }}
      >
        <a className="navbar-brand" style={{display:"flex",alignItems:"center"}}>
    <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="" style={{marginRight:"10px"}}></img>
    BYON
  </a>
      </nav>
    </div>
  );
};

export default Navbar;

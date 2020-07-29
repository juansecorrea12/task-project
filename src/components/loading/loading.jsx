import React, { Component } from "react";
import { BarLoader } from "react-spinners";
import Logo from "../../logo.svg";

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-box">
        <div className="loading-panel">
          <div className="brand-logo-container-space">
            <img src={Logo} alt="Logo" className="brand_logo" />
          </div>
          <BarLoader color="#8645ff" size="7rem" />
          <h4>Loading...</h4>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Logo from "../../logo.svg";

export default class Register extends Component {
  render() {
    return (
      <div className="container h-100 mt-5 p-relative">
        <div className="d-flex justify-content-center h-100 p-absolute t-50">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={Logo} alt="Logo" className="brand_logo" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form onSubmit={this.loginUser} onInput={this.handleinput}>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="email"
                    className="form-control input_user"
                    placeholder="email"
                  ></input>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      className="form-control input_pass"
                      placeholder="password"
                    ></input>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  <button type="submit" name="button" className="btn login_btn">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-4">
              <div className="d-flex justify-content-center links">
                Don't have an account?
                <a
                  href="register"
                  className="ml-2"
                  onClick={this.props.showView}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

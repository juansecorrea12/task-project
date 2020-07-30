import React, { Component } from "react";
import "./login.component.css";
import Logo from "../../logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Link = "#";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
    };
  }

  toastSucces = () => {
    toast.success("Inicio de sesión exitoso.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "dark",
    });
  };
  toastError = () => {
    toast.error("Ocurrio un error!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "dark",
    });
  };

  loginUser = (event) => {
    event.preventDefault();
    let url = "https://academlo-todolist.herokuapp.com/login";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(this.state.user),
    };

    fetch(url, options)
      .then((response) => {
        response.json();
      })
      .then((result) => {
        this.toastSucces();
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        this.toastError();
      });
  };

  handleinput = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
      },
    });
  };

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
                    required
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
                      required
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
                <a onClick={this.props.register} href={Link} className="ml-2">
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

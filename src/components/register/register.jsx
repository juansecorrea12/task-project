import React, { Component } from "react";
import Logo from "../../logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.component.css";

toast.configure();
const Link = "#";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {},
    };
  }

  toastSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "dark",
    });
  };

  toastError = () => {
    toast.error("Something wrong with the request", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  registerUser = (event) => {
    event.preventDefault();
    let url = "https://academlo-todolist.herokuapp.com/register";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(this.state.newUser),
    };

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        document.getElementById("form_register").reset();
        switch (result.message) {
          case "El usuario ya está registrado en el sistema":
            return this.toastSuccess("This user already exists in database");
          case "El usuario ha sido registrado correctamente":
            return this.toastSuccess(
              "This user has been successfully registered"
            );
          default:
            return null;
        }
      })
      .catch((error) => {
        console.log(error);
        this.toastError();
      });
  };

  handleInputRegister = (event) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [event.target.name]: event.target.value,
      },
    });
  };

  render() {
    return (
      <div className="container h-100 mt-5 p-relative">
        <div className="d-flex justify-content-center h-100 p-absolute t-50">
          <div className="user_card user_card_register">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={Logo} alt="Logo" className="brand_logo" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form
                id="form_register"
                onSubmit={this.registerUser}
                onInput={this.handleInputRegister}
              >
                <div className="input-group mb-3">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control input_user"
                    placeholder="juan"
                    required
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="lastname"
                    className="form-control input_user"
                    placeholder="correa"
                    required
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="email"
                    className="form-control input_user"
                    placeholder="juan@mail.com"
                    required
                  ></input>
                </div>
                <div className="input-group mb-2">
                  <input
                    type="password"
                    name="password"
                    className="form-control input_pass"
                    placeholder="*****"
                    required
                  ></input>
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  <button type="submit" name="button" className="btn login_btn">
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-center links">
                Do you have an acoount?
                <a onClick={this.props.login} href={Link} className="ml-2">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Loading from "./components/loading/loading";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showView: "loading",
    };

    const Methods = ["login", "register"];
    Methods.forEach((element) => {
      this[element] = this[element].bind(this);
    });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ showView: "login" });
    }, 3000);
  }

  login() {
    this.setState({ showView: "login" });
  }
  register() {
    this.setState({ showView: "register" });
  }

  render() {
    switch (this.state.showView) {
      case "login":
        return <Login showView={this.register} />;
      case "register":
        return <Register />;
      default:
        return <Loading />;
    }
  }
}

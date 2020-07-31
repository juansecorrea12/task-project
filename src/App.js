import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Loading from "./components/loading/loading";
import Task from "./components/tasks/task";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showView: "loading",
    };

    const Methods = ["login", "register", "task"];
    Methods.forEach((element) => {
      this[element] = this[element].bind(this);
    });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ showView: "task" });
    }, 3000);
  }

  login() {
    this.setState({ showView: "login" });
  }
  register() {
    this.setState({ showView: "register" });
  }
  task() {
    this.setState({ showView: "task" });
  }

  render() {
    switch (this.state.showView) {
      case "login":
        return <Login register={this.register} task={this.task} />;
      case "register":
        return <Register login={this.login} task={this.task} />;
      case "task":
        return <Task />;
      default:
        return <Loading />;
    }
  }
}

import React, { Component } from "react";
import ".//task.component.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  Container,
  Row,
  Button,
  Table,
  InputGroup,
  Modal,
  Col,
} from "react-bootstrap";

export default class Task extends Component {
  constructor() {
    super();
    this.state = {
      task: {
        content: "",
        date: new Date(),
      },
      showModal: false,
      tasks: [],
    };
  }

  handleShow = () => {
    this.setState({
      showModal: true,
    });
  };
  handleCLose = () => {
    this.setState({
      showModal: false,
    });
  };

  componentDidMount() {
    this.getTasks();
  }

  addTask = (event) => {
    event.preventDefault();
    const url = "https://academlo-todolist.herokuapp.com/tasks";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(this.state.task),
    };

    fetch(url, options)
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log(result);
        this.getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTasks = () => {
    const url = "https://academlo-todolist.herokuapp.com/tasks";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        // console.log(result);
        this.setState({
          tasks: result.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  updateTask = (id) => {
    const url = "https://academlo-todolist.herokuapp.com/tasks" + id;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(this.state.task),
    };
    fetch(url, options)
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteTask = (id) => {
    const url = "https://academlo-todolist.herokuapp.com/tasks/" + id;
    fetch(url, { method: "DELETE" })
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log(result);
        this.getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleTask = (event) => {
    this.setState({
      task: {
        ...this.state.task,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleChange = (dateNew) => {
    this.setState({
      task: {
        ...this.state.task,
        date: dateNew,
      },
    });
  };

  render() {
    return (
      <Container className="container-task border mt-5">
        <Row className="align-items-center justify-content-between p-2 border-bottom">
          <h2>Task List</h2>
          <div className="d-flex">
            <Button className="btn btn-bg" onClick={this.handleShow}>
              <i className="fas fa-plus"></i>
            </Button>
            <Button className="btn btn-bg ml-2">
              <i className="fas fa-user"></i>
            </Button>
          </div>
        </Row>
        <Row className="p-2">
          <Table borderless>
            <thead>
              <tr>
                <th>Done?</th>
                <th>Date</th>
                <th colSpan="2">Description</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tasks.map((taskNew, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                        </InputGroup.Prepend>
                      </InputGroup>
                    </th>
                    <td>{moment(taskNew.date).format("MMM Do YY")}</td>
                    <td colSpan="2">{taskNew.content}</td>
                    <td>
                      <button
                        className="btn btn-bg"
                        onClick={() => {
                          this.updateTask(taskNew._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-bg  mx-2"
                        onClick={() => {
                          this.deleteTask(taskNew._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>

        <Modal show={this.state.showModal} onHide={this.handleCLose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-center">
              <Col xs={10}>
                <form id="form_add_task" onSubmit={this.addTask}>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-tasks"></i>
                      </span>
                    </div>
                    <input
                      onChange={this.handleTask}
                      type="text"
                      name="content"
                      className="form-control input_user"
                      placeholder="Do excersice at mornings..."
                      required
                    />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-calendar-minus"></i>
                      </span>
                    </div>
                    <DatePicker
                      name="date"
                      selected={this.state.task.date}
                      onChange={this.handleChange}
                      className="form-control input_user"
                      dateFormat="yyyy/MM/dd"
                      placeholderText="01/08/2020"
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container_task">
                    <button
                      type="submit"
                      name="button"
                      className="btn login_btn"
                      onClick={this.handleCLose}
                    >
                      Add task
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col>
                <h6>
                  All the task that you add, you can see them at task list
                </h6>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

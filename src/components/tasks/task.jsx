import React, { Component } from "react";
import ".//task.component.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import LogoIcon from "../../logo.svg";
import {
  Container,
  Row,
  Button,
  Table,
  InputGroup,
  Modal,
  Col,
  Dropdown,
  ButtonGroup,
  FormControl,
  // Pagination,
} from "react-bootstrap";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        content: "",
        date: new Date(),
      },
      taskEdit: {
        content: "",
        date: "",
      },
      showModal: false,
      showModalEdit: false,
      tasks: [],
      taskFilterName: "",
      taskFilterDate: new Date(),
    };
  }

  // Handle filtro por contenido y por fecha
  handleFilterName = (event) => {
    this.setState({
      taskFilterName: event.target.value,
    });
  };

  handleFilterDate = (dateNew) => {
    this.setState({
      ...this.state.taskFilterDate,
      taskFilterDate: dateNew,
    });
  };

  handleShow = () => {
    this.setState({
      showModal: true,
    });
  };
  handleShowEdit = () => {
    this.setState({
      showModalEdit: true,
    });
  };
  handleCLose = () => {
    this.setState({
      showModal: false,
    });
  };
  handleCLoseEdit = () => {
    this.setState({
      showModalEdit: false,
    });
  };

  componentDidMount() {
    this.getTasks();
  }
  // nextPage = () => {
  //   fetch(this.nextPage)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       const prev = this.state.prevPage;
  //       const next = result.nextPage;
  //       this.setState({
  //         tasks: result.results,
  //         prev,
  //         next,
  //       });
  //     });
  // };

  // prevPage = () => {
  //   fetch(this.prevPage)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       const prev = result.prevPage;
  //       const next = this.state.nextPage;
  //       this.setState({
  //         tasks: result.results,
  //         prev,
  //         next,
  //       });
  //     });
  // };

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
        this.setState({
          tasks: result.results,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setTask = (task) => {
    this.setState({
      taskEdit: {
        content: task.content,
        date: task.date,
      },
    });
    this.handleShowEdit();
  };
  updateTask = (id, event) => {
    event.preventDefault();
    const url = "https://academlo-todolist.herokuapp.com/tasks" + id;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(this.state.taskEdit),
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
  handleTaskEdit = (event) => {
    this.setState({
      taskEdit: {
        ...this.state.taskEdit,
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
  handleChangeEdit = (dateNew) => {
    this.setState({
      taskEdit: {
        ...this.state.taskEdit,
        date: dateNew,
      },
    });
  };

  logOut = () => {
    this.props.loading();
    setTimeout(() => {
      this.props.login();
    }, 1200);
  };

  render() {
    return (
      <Container className="container-task border mt-5">
        <Row className="align-items-center justify-content-between p-2 border-bottom">
          <div className="w-25 d-flex align-items-center">
            <div className="container-logo-title">
              <img src={LogoIcon} alt="Logo" className="brand-logo-title " />
            </div>
            <h2 className="title-head ml-2">Task List</h2>
          </div>
          <div className="d-flex justify-content-around align-items-center">
            <FormControl
              type="text"
              placeholder="Search Task..."
              className="mr-sm-2 search-bar"
              onChange={this.handleFilterName}
            />
            <DatePicker
              name="date"
              selected={this.state.taskFilterDate}
              onChange={this.handleFilterDate}
              className="form-control input_user search-bar"
              dateFormat="yyyy/MM/dd"
              placeholderText="Date?"
            />
            {/* <Button className="btn btn-bg">Date?</Button> */}
          </div>
          <div className="d-flex">
            <Button className="btn btn-bg" onClick={this.handleShow}>
              <i className="fas fa-plus"></i>
            </Button>
            <Dropdown as={ButtonGroup} className="btn btn-bg ml-2">
              <Button className="btn btn-bg">
                <i className="fas fa-user"></i>
              </Button>

              <Dropdown.Toggle
                split
                id="dropdown-split-basic"
                className="btn btn-bg"
              />

              <Dropdown.Menu>
                <Dropdown.Item href="#" onClick={this.logOut}>
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
              {this.state.tasks
                .filter((taskFilter) => {
                  return taskFilter === ""
                    ? true
                    : taskFilter.content.includes(this.state.taskFilterName);
                })
                // .filter((taskFilter) => {
                //   return taskFilter.date.includes(this.state.taskFilterDate);
                // })
                .map((taskNew, index) => {
                  return (
                    <tr key={index} className="border-bottom">
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
                            this.setTask(taskNew);
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
        {/* <Row className="justify-content-center">
          <Col xs={6}>
            <Pagination>
              <Pagination.Item>{13}</Pagination.Item>
            </Pagination>
          </Col>
        </Row> */}

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

        {/* Otro modal para la edición */}
        <Modal show={this.state.showModalEdit} onHide={this.handleCLoseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-center">
              <Col xs={10}>
                <form id="form_add_task" onSubmit={this.updateTask}>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-tasks"></i>
                      </span>
                    </div>
                    <input
                      onChange={this.handleTaskEdit}
                      type="text"
                      name="content"
                      value={this.state.taskEdit.content}
                      className="form-control input_user"
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
                      selected={this.state.taskEdit.date}
                      onChange={this.handleChangeEdit}
                      className="form-control input_user"
                      dateFormat="yyyy/MM/dd"
                      value={this.state.taskEdit.date}
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container_task">
                    <button
                      type="submit"
                      name="button"
                      className="btn login_btn"
                      onClick={this.handleCLoseEdit}
                    >
                      Update task
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

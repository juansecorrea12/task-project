import React, { Component } from "react";
import ".//task.component.css";
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
      task: {},
      show: false,
    };
  }

  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  handleCLose = () => {
    this.setState({
      show: false,
    });
  };

  addTask = () => {};

  render() {
    return (
      <Container className="container-task border mt-5">
        <Row className="align-items-center justify-content-between p-2 border-bottom">
          <h2>Task List</h2>
          <Button className="btn btn-bg" onClick={this.handleShow}>
            <i className="fas fa-plus"></i>
          </Button>
        </Row>
        <Row className="p-2">
          <Table borderless>
            <thead>
              <tr>
                <th>Task Id</th>
                <th>Date</th>
                <th colSpan="2">Description</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup.Prepend>
                  </InputGroup>
                </th>
                <td>15/07/2020</td>
                <td colSpan="2">Task number 1</td>
                <td>
                  <button className="btn btn-bg">Edit</button>
                  <button className="btn btn-bg  mx-2">Delete</button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>15/07/2020</td>
                <td colSpan="2">Task number 2</td>
                <td>
                  <button className="btn btn-bg">Edit</button>
                  <button className="btn btn-bg  mx-2">Delete</button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>15/07/2020</td>
                <td colSpan="2">Task number 3</td>
                <td>
                  <button className="btn btn-bg">Edit</button>
                  <button className="btn btn-bg  mx-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>

        <Modal show={this.state.show} onHide={this.handleCLose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-center">
              <Col xs={10}>
                <form id="form_add_task">
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-tasks"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="content"
                      className="form-control input_user"
                      placeholder="Do excersice at mornings..."
                      required
                    ></input>
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-calendar-minus"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="date"
                      className="form-control input_pass"
                      placeholder="30/07/2020"
                      required
                    ></input>
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container_task">
                    <button
                      type="submit"
                      name="button"
                      className="btn login_btn"
                      // onClick={}
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
                  All the task that you add, you can see them at task list{" "}
                </h6>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

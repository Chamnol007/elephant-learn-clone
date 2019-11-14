import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';
import { Modal, Button } from 'rsuite';

class CommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleConfirm(this.state.value);
  }

  render() {
    return (
      <Modal
        size="lg"
        centered
        show={this.props.isVisble}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Comment ID: {this.props.data.id}</h6>
        </Modal.Body>
        <Modal.Body>
          <h6>Original:</h6>
          <p> {this.props.data.comment}</p>
        </Modal.Body>
        <Modal.Body>
          <h6>Result: {this.props.data.result}</h6>
        </Modal.Body>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Col}>
            <Col sm={10}>
              <Form.Check
                inline
                type="radio"
                onChange={this.handleChange}
                value={1}
                label="Positive"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                inline
                type="radio"
                onChange={this.handleChange}
                value={0}
                label="Neuteral"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
              <Form.Check
                inline
                type="radio"
                onChange={this.handleChange}
                value={-1}
                label="Negative"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
              />
            </Col>
            <Button appearance="primary" block type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    );
  }
}

export default CommentModal;

import React, { Component } from 'react';
import { Modal, Button } from 'rsuite';

class PostDetailModal extends Component {
  render() {
    return (
      <Modal
        size="md"
        keyboard
        centered
        show={this.props.isVisble}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Post By: {this.props.data.user_id}, On: {this.props.data.post_date}{' '}
          </h6>
          <h6>Post Tags: {this.props.data.post_tags}</h6>
          <h6>Post Title: {this.props.data.post_title}</h6>
          <h6>Total Comment: {this.props.data.total_comment}</h6>
        </Modal.Body>
        <Modal.Body>
          <h6>Post Story: </h6>
          <p>{this.props.data.post_story}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="red" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button color="green" onClick={this.props.handleConfirm}>
            Go To Comment Page
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PostDetailModal;

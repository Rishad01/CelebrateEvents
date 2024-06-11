import React from "react";
import {Modal} from "react-bootstrap";
function Chat(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Conversation between Client and Vendor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </Modal>
    );
  }

export default Chat;
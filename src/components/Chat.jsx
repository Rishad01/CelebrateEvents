import React, { useState, useEffect }from "react";
import io from 'socket.io-client';
import axios from "axios";
import {Container, Modal, Row, Col, Form, Button} from "react-bootstrap";

const socket = io('http://localhost:5000');

function Chat(props) {
    const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    // Fetch or create room ID
    const fetchRoomId = async () => {
      try {
        const event_id=props.event_id;
        const vendor_id=props.vendor_id;
        const client_id=props.client_id;
        const response = await axios.post(`http://localhost:5000/createRoom/${event_id}/${vendor_id}/${client_id}`);
        setRoomId(response.data.roomId);
        console.log('room created');
      } catch (error) {
        console.error('Error fetching room ID:', error);
      }
    };

    fetchRoomId();
  }, [props.event_id, props.vendor_id, props.client_id]);

  useEffect(() => {
    if (roomId) {
        {
      socket.emit('joinRoom', { roomId });
      console.log('room joined');
        }

      socket.on('previousMessages', (previousMessages) => {
        //console.log('previous mesg fetched');
        setMessages(previousMessages);
        //console.log(previousMessages);
      });

      socket.on('receiveMessage', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);      
      });

      return () => {
        socket.off('previousMessages');
        socket.off('receiveMessage');
      };
    }
  }, [roomId]);


  const sendMessage = async () => {
    if (message && roomId) {
        const senderType=props.senderType;
      const userId = props.senderType == 'client' ? props.client_id : props.vendor_id; // Use the appropriate ID
      await socket.emit('sendMessage', { roomId, message, userId, senderType });
      setMessage('');
    }
  };

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
            <Container style={{maxHeight:'400px', overflowY:'auto'}}>
                
                    {messages.map((msg, index) => (
                      <Row>

                        <Col  className={`rounded d-flex justify-content-${msg.sender_type === props.senderType ? 'end' : 'start'}`}>
                            <div className={`p-1 rounded ${msg.sender_type === props.senderType ?'alert alert-info':'alert alert-warning'}`}>
                            <strong>{msg.sender_type}:</strong> {msg.message}
                            </div>
                        </Col>
                      </Row>
                    ))}
                    </Container>
              <Container>
                <Row className="mt-2 justify-content-evenly">
                  <Col xs={11}>
                    <Form className="px-1">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control 
                          type="text" 
                          value={message} 
                          onChange={(e) => setMessage(e.target.value)} 
                          placeholder="Type your message here..." />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col xs={1} className="">
                  <Button variant="outline-dark" onClick={sendMessage}><i class="bi bi-send"></i></Button>
                  </Col>
                </Row>
                </Container>
        </Modal.Body>
      </Modal>
    );
  }

export default Chat;
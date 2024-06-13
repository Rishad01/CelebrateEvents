import React, { useState, useEffect }from "react";
import io from 'socket.io-client';
import axios from "axios";
import {Modal} from "react-bootstrap";

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
        console.log('previous mesg fetched');
        setMessages(previousMessages);
        console.log(previousMessages);
      });

      socket.on('receiveMessage', (data) => {
        console.log('received mesg');
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.off('previousMessages');
        socket.off('receiveMessage');
      };
    }
  }, [roomId]);

  const sendMessage = () => {
    if (message && roomId) {
        const senderType=props.senderType;
      const userId = props.senderType == 'client' ? props.client_id : props.vendor_id; // Use the appropriate ID
      socket.emit('sendMessage', { roomId, message, userId, senderType });
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
            <div>
                <div className="message-container">
                    {messages.map((msg, index) => (
                        
                    <div key={index} className={msg.senderType == 'client' ? 'client-message' : 'vendor-message'}>
                        <strong>{msg.sender_type}:</strong> {msg.message}
                    </div>
                    ))}
                </div>
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

export default Chat;
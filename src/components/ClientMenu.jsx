import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Offcanvas,Button,i,ListGroup} from "react-bootstrap";

function ClientMenu(props)
{
  const navigate=useNavigate();
    const [show, setShow] = React.useState(false);
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  axios.defaults.withCredentials=true;
  const Clientlogout=async ()=>{
    try {
      console.log('hello');
      const response = await axios.get('http://localhost:5000/logout');
      console.log(response);
      navigate('/home');
   } catch (error) {
      console.error(error);
   }  
  }
  const AddEvent=()=>{
    props.setshowDashboard(false);
    props.setshowAddevent(true);
    props.setshowPostedEvents(false);
    handleClose();
  };

  const AddDashboard= ()=> {
    props.setshowDashboard(true);
    props.setshowAddevent(false);
    props.setshowPostedEvents(false);
    handleClose();
  };

  const PostedEvents= ()=> {
    props.setshowPostedEvents(true);
    props.setshowDashboard(false);
    props.setshowAddevent(false);
    handleClose();
  };

  return (
    <div className="mb-3 mt-2">
      <Button className="lg" variant="outline-dark" onClick={handleShow}>
      <i class="bi bi-list"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup variant="flush">
        <ListGroup.Item action onClick={AddDashboard}>
            Dashboard
        </ListGroup.Item>
        <ListGroup.Item action onClick={AddEvent}>
            Add an event
            
        </ListGroup.Item>
        <ListGroup.Item action onClick={PostedEvents}>
           Posted event
        </ListGroup.Item>
        <ListGroup.Item action onClick={Clientlogout}>
           Logout
        </ListGroup.Item>
        </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      
      </div>
  );
}

export default ClientMenu;
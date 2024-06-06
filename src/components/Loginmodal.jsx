import axios from "axios";
import React from "react";
import {Modal,Button,Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function LoginModal(props)
{
    const navigate=useNavigate();
    const[values,setValues]=React.useState({
      email:'',
      password:''
    });

    const handleSubmit=async (event)=>{
      console.log('login');
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/vendor/login', values);
        console.log(response);
        if(response.data.status=='success'){
          localStorage.setItem('token',response.data.token);
          navigate('/vendorSection'); 
        }
      }
      catch(error){
        console.error(error);
      }
    }

    const handleChange=(event)=>{
      setValues({...values,[event.target.name]:event.target.value});
    }
    return(
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Login Form
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
                </Form.Group>
                <Button variant="btn btn-dark" type="submit" onClick={handleSubmit}>
                    Sign In
                </Button>
              </Form>
              </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal
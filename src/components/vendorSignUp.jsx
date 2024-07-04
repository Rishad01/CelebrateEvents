import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Form,Button, Container,Row,Col,Image} from "react-bootstrap";
import sidepic from "../assets/sidepic.jpg";
function VendorSignUp()
{
    const[values,setValues]=React.useState({
    name:'',
    email:'',
    password:'',
    cpassword:''    
      });

      const navigate=useNavigate();

      const handleSubmit=async (event)=>{
        console.log(values);
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/vendor/signup', values);
          console.log(response);
          if(response.data.status=='success'){
            localStorage.setItem('vendor_token',response.data.token);
            navigate('/vendorSection'); 
          }
       } catch (error) {
          console.error(error);
       }
      }

    const handleChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value});
      }
    return(
        <Container className="bg-body-secondary mt-3 rounded">
        <Row>
        <Col md={6}>
        <Form className="py-3">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="cpassword" onChange={handleChange} />
                </Form.Group>
                <Button variant="btn btn-dark" type="submit" onClick={handleSubmit}>
                    Sign Up
                </Button>
        </Form>
        </Col>
        <Col className="px-0" md={6}>
        <Image className="side-image" src={sidepic}></Image>
        </Col>
        </Row>
        </Container>
    );
}

export default VendorSignUp;
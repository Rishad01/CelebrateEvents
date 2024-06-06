import React from "react";  
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {Container,Row,Col,Button,Modal,Form} from "react-bootstrap";
//import Client from "../pages/client"
import Heading from "./heading";
import Picture from "./Picture";
//import WOW from 'wowjs';

function MainBody()
{
    const [showLogin,setshowLogin]=React.useState(false);
    const [showSignUp,setshowSignUp]=React.useState(false);
    const [notloggedIn,checknotloggedIn]=React.useState(true);
    function loginonclick()
    {
        setshowLogin(true);
    }

    React.useEffect(() => {
      const fetchSession = async () => {
        try {
          const response = await axios.get('http://localhost:5000/user');
          console.log(response);
          if(response.data.status=="Authenticated"){
          checknotloggedIn(false);
          }
        else{
          checknotloggedIn(true);
          }
        } catch (error) {
          console.log('Error occurred:', error);
        }
      };
    
      fetchSession(); // Call the inner function immediately
    }, []);

    function signuponclick()
    {
        setshowSignUp(true);
    }

    function SignUpform(props)
    {
      const[values,setValues]=React.useState({
        name:'',
        email:'',
        password:'',
        cpassword:''
      });

      const handleChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value})
      }

      const navigate=useNavigate();

      const handleSubmit=async (event)=>{
        //console.log(values);
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/signup', values);
          console.log(response);
          if(response.data.status=='success')
          navigate('/client'); 
       } catch (error) {
          console.error(error);
       }
      }
        
        return (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Sign Up Form
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={handleChange} type="password" placeholder="Password" name="cpassword"/>
                </Form.Group>
                <Button variant="btn btn-dark" type="submit">
                    Sign Up
                </Button>
              </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
    }

    function Loginform(props)
    {
      const[values,setValues]=React.useState({
        email:'',
        password:'',
      });

      const handleChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value})
      }
        const navigate=useNavigate();
        axios.defaults.withCredentials=true;
        const handleSubmit=async (event)=>{
          console.log(values);
          event.preventDefault();
          try {
            const response = await axios.post('http://localhost:5000/login', values);
            console.log(response);
            if(response.data.status=='success')
             navigate('/client');
         } catch (error) {
          console.log('bye');
            console.error(error);
         }
        }

        return (
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
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
                </Form.Group>
                <Button variant="btn btn-dark" type="submit">
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

    return (<Container fluid  className="text-center mb-2">
        <Row className="align-items-center">
            <Col xs={12} md={6}  >
            <Row>
            <Heading 
                content="Plan your moments, craft your memories effortlessly with our event planning app!"
            />
            </Row>
            <Row>
            <Col xs={6}>
            {notloggedIn && <Button onClick={loginonclick} variant="dark">Login</Button>}
            {showLogin&&<Loginform 
                show={showLogin}
                onHide={() => setshowLogin(false)}
            />}
            </Col>
            <Col xs={6}>
            {notloggedIn && <Button onClick={signuponclick} variant="outline-dark">Sign Up</Button>}
            {showSignUp&&<SignUpform 
                show={showSignUp}
                onHide={() => setshowSignUp(false)}
            />}
            </Col>
            </Row>
            </Col>
            <Col  xs={12} md={6} >
            <Picture />
            </Col>
        </Row>
    </Container>);
}

export default MainBody;
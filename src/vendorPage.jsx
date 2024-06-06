import React from "react";
import { Container,Navbar,Row,Col, Button } from "react-bootstrap";
import VendorSignUp from "./components/vendorSignUp";
import LoginModal from "./components/Loginmodal";
function VendorPage()
{
    const [showLogin,setshowLogin]=React.useState(false);

    function LoginClick()
    {
        setshowLogin(true);
    }
    
    return(
        <Container fluid>
        <Row>
            <Col className="bg-body-tertiary">
            <Navbar>
            <Navbar.Brand href="#home"><h2>Brand Name</h2></Navbar.Brand>
            </Navbar>
            </Col>
        </Row>
        <Row>
            <Col className="d-flex justify-content-end mt-2"><Button onClick={LoginClick} variant="outline-dark">Log In</Button></Col>
            {showLogin && <LoginModal 
                show={showLogin}
                onHide={()=>setshowLogin(false)}
            />}
        </Row>
        <VendorSignUp />
        </Container>
    );
}

export default VendorPage;
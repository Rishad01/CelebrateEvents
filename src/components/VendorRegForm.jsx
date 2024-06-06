import React from "react";
import { Container, Form, Row,Col } from "react-bootstrap";

function VendorRegForm()
{
    return(
        <Container className="mx-auto w-75 my-3 mx-3 px-3 bg-body-secondary rounded">
            <Row>
            <Form>
            <Row className="mt-3">
            <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your Name" />
            </Form.Group>
            </Row>
            <Row className="mt-3">
            <Form.Group as={Col} controlId="formGridGST">
                <Form.Label>GST Number</Form.Label>
                <Form.Control  type="text" placeholder="Enter your GST Number" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPAN">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your PAN Number" />
            </Form.Group>
            </Row>
            <Row className="mt-3">
            <Form.Group as={Col} controlId="formGridTIN">
                <Form.Label>TIN Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your TIN Number" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridTAN">
                <Form.Label>TAN Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your TAN Number" />
            </Form.Group>
            </Row>
            <Row className="mt-3">
            <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter your Country" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="Enter your State" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter your City" />
            </Form.Group>
            </Row>
            <Row className="mt-3">
            <Form.Group as={Col} controlId="formGridAdd">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter your Address" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPIN">
                <Form.Label>PIN Code</Form.Label>
                <Form.Control type="text" placeholder="Enter your PIN Code" />
            </Form.Group>
            </Row>
            <Row className="mt-3">
            <Form.Group as={Col} controlId="formGridMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your Mobile Number" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="email" placeholder="Enter your Email" />
            </Form.Group>
            </Row>
            <Row className="mt-3">
            <Form.Group as={Col} controlId="formGridBank">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your Bank Name" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridIFSE">
                <Form.Label>IFSC Code</Form.Label>
                <Form.Control type="text" placeholder="Enter your IFSE Code" />
            </Form.Group>
            </Row>
            <Row className="mt-3 mb-3">
            <Form.Group as={Col} controlId="formGridBranch">
                <Form.Label>Bank Address</Form.Label>
                <Form.Control type="text" placeholder="Enter your Branch of the Bank" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAcc">
                <Form.Label>Account Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Account Number" />
            </Form.Group>
            </Row>
            
            </Form>
            </Row>
        </Container>
    );
}

export default VendorRegForm;
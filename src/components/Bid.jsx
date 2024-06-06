import React from "react";
import { Button,Container,Row,Col,ListGroup } from "react-bootstrap";

function Bid(props)
{
    return(
        <ListGroup.Item action>
            <Row className="mt-2">
                <Col md={3} xs={6}>
                    {props.vname}
                </Col>
                <Col md={3} xs={6}>
                &#8377;{props.offer}
                </Col>
                <Col md={3} xs={6}>
                    <Button variant="dark">Message</Button>
                </Col>
                <Col md={3} xs={6}>
                    <Button variant="dark">Close Deal</Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default Bid;
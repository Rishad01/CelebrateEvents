import React from "react";
import {Card,Col,Row,Button,Container,ListGroup} from "react-bootstrap";
import Bid from "./Bid";
import bid_data from "./bid_data";
function EventCard(props)
{
    return(
        <div>
            <Card>
            <Card.Body>
                <Container className="mb-3">
                    <Row className="mb-3">
                    <Col xs={6}><h3>{props.name}</h3></Col>
                    <Col xs={6} className="d-flex justify-content-end"><Button variant="dark">Edit</Button></Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={4}>
                        <h4>Date:{props.date}</h4>
                        </Col>
                        <Col xs={4}>
                        <h4>Location:{props.location}</h4>
                        </Col>
                        <Col xs={4}>
                        <h4>Budget:&#8377;{props.budget}</h4>
                        </Col>
                    </Row>
                    <ListGroup variant="flush" className="bg-dark-subtle">
                        {bid_data.map(data=>(
                            <Bid 
                                key={data.id}
                                vname={data.vname}
                                offer={data.offer}
                            />
                        ))}
                    </ListGroup>
                </Container>
            </Card.Body>
            </Card>
        </div>
    );
}

export default EventCard;
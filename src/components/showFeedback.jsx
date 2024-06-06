import React from "react";
import { Container,Row,Col,Card,Form,Button } from "react-bootstrap";
import StarRating from "./starRating";
const clients=[
    {
        name:"XYZ"
    },{
        name:"ABC"
    },{
        name:"MNO"
    },{
        name:"PQR"
    }
];

function FeedbackCard(props)
{
    return(
        <Container className="mx-auto w-75 mb-3">
        <Card className="shadow-lg">
            <Card.Body>
                <Row>
                    <Col>
                    <h3>{props.name}</h3>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <StarRating />
                    </Col>
                </Row>
                <Row>
                <div>
                
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Give your feedback</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Write your comments..."/>
                        </Form.Group>
                    </Row>
                    <Row>
                    <Col  className="d-flex justify-content-end">
                    <Button xs={3} variant="btn btn-dark" type="submit">
                        Submit
                    </Button>
                    </Col>
                    </Row>
                
                    </div>
                </Row>
            </Card.Body>
            </Card>
            </Container>
    );
}

function ShowFeedback()
{
    return(
        <Container>
            <Row>
                <Col>
                    {clients.map((client)=>
                    <FeedbackCard 
                        name={client.name}
                    />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ShowFeedback;
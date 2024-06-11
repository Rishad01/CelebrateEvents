import React from "react";
import {Card,Col,Row,Button,Container,ListGroup} from "react-bootstrap";
import Bid from "./Bid";
import axios from "axios";


function Event(props){

    const[bids,setBids]=React.useState([]);
    React.useEffect(() => {
        const fetchBids = async () => {
            try {
                const event_id=props.event_id;
                const response = await axios.get(`http://localhost:5000/client/getBids/${event_id}`);
                console.log(response.data);
                if (response.status === 200) {
                    setBids(response.data);
                    console.log('Bids fetched successfully');
                } else {
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log('Error occurred:', error);
            }
        };
    
        fetchBids(); // Call the inner function immediately
    }, [props.event_id]);

    return (
        <Container className="mb-2">
    <Card>
            <Card.Body>
                <Container className="mb-3">
                    <Row className="mb-3">
                    <Col xs={6}><h3>{props.event_id}</h3></Col>
                    <Col xs={6} className="d-flex justify-content-end"><Button variant="dark">Edit</Button></Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={4}>
                        <h4>Date:{props.date.slice(0,10)}</h4>
                        </Col>
                        <Col xs={4}>
                        <h4>Location:{props.location}</h4>
                        </Col>
                        <Col xs={4}>
                        <h4>Budget:&#8377;{props.budget}</h4>
                        </Col>
                    </Row>
                    <ListGroup variant="flush" className="bg-dark-subtle">
                        {bids.map((data,index)=>(
                            <Bid 
                                key={index}
                                bid_id={data.bid_id}
                                vendor_id={data.vendor_id}
                                client_id={localStorage.getItem('token')}
                                bidAmt={data.bidAmt}
                                event_id={data.event_id}
                                proposal={data.proposal}
                            />
                        ))}
                    </ListGroup>
                </Container>
            </Card.Body>
            </Card>
            </Container> 
);
}

function EventCard()
{
    const[dataItems,setdataItems]=React.useState([]);
    React.useEffect(() => {
        const token=localStorage.getItem('token');
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/client/getPostedEvents/${token}`);
                console.log(response.data);
                if (response.status === 200) {
                    setdataItems(response.data);
                    console.log('Events fetched successfully');
                } else {
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log('Error occurred:', error);
            }
        };
    
        fetchEvents(); // Call the inner function immediately
    }, []); 
    return (
        <Container>
            {dataItems.map((data, index) => (
                <Event 
                    key={index}
                    event_id={data.event_id}
                    event={data.event}
                    date={data.date}
                    location={data.location}
                    budget={data.budget}
                />
            ))}
        </Container>
    );
}

export default EventCard;
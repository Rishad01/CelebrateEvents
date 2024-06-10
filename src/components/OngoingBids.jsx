import axios from "axios";
import React from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";

function ProposedEventCard(props)
{
    const [event,setEvent]=React.useState([]);

    React.useEffect(()=>{

        const getEvent=async ()=>{

            const token=localStorage.getItem('token');

            try{
                const response=await axios.get(`http://localhost:5000/vendor/getEvent/${props.event_id}`);
                console.log(response.data);
                if(response.data)
                    {
                        setEvent(response.data[0]);
                    }
                    else{
                        console.log(response.message);
                    }
                }catch(err){
                console.error(err);
            }
        }
        console.log(event);
        getEvent();
    },[]);
    return(
    <Container className="mx-auto w-75 mb-3">
        <Card className="shadow-lg">
            <Card.Body>
            <Row>
            <Col>
                <h3>{event.event}</h3>
            </Col>
            <Col className="d-flex justify-content-end">
                <h2>Budget:{event.budget}</h2>
            </Col>
            </Row>
            <Container>
            <Row>
                <Col className="mx-auto d-flex justify-content-start">
                    <p>Lowest Bid:{props.lowBid}</p>
                </Col>
                <Col className="mx-auto d-flex justify-content-center">
                    <p>Avg. Bid:{props.avgBid}</p>
                </Col>
                <Col className="mx-auto d-flex justify-content-end">
                    <p>Highest Bid:{props.highBid}</p>
                </Col>
            </Row>
            </Container>
            <Row className="mb-2">
            <Col className="d-flex justify-content-start">
            <h6>
            No. of Bids: 
            <Badge pill className="mx-1" bg="dark">
                {props.bidNum}
            </Badge>
            </h6>
            </Col>
            <Col className="d-flex justify-content-end" xs={3}>
                <Button variant="btn btn-dark">Message</Button>
            </Col>
            </Row>
            </Card.Body>
        </Card>    
        </Container>
    );
}

function ProposedEvents()
{
    const [bids,setBids]=React.useState([]);

    React.useEffect(()=>{

        const getBids=async ()=>{

            const token=localStorage.getItem('token');

            try{
                const response=await axios.get(`http://localhost:5000/vendor/proposedEvents`,{
                    headers:{
                        'Authorization':`Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                if(response.data)
                    {
                        setBids(response.data);
                    }
            }catch(err){
                console.error(err);
            }
        }

        getBids();
    },[]);
    return(
        <Container>
            <Row>
                <Col>
                    {bids.map((bid,index)=>
                    <ProposedEventCard 
                        key={index}
                        event_id={bid.event_id}
                        bid_id={bid.user_id}
                        vendor_id={bid.vendor_id}
                        highBid={bid.highBid}
                        avgBid={bid.avgBid}
                        lowBid={bid.lowBid}
                        bidNum={bid.bidNum}
                    />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ProposedEvents;
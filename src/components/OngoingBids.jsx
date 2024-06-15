import axios from "axios";
import React from "react";
import Chat from "./Chat";
import { Container, Row, Col, Button, Card, Badge, Form } from "react-bootstrap";

function ProposedEventCard(props)
{
    const [event,setEvent]=React.useState([]);
    const [sendMessage,setsendMessage]=React.useState(false);
    const [bidAmt,setBidAmt]=React.useState(props.bidAmt);
    const [value,setValue]=React.useState({
        bid_id:props.bid_id,
        revisedOffer:''
    });

    React.useEffect(()=>{

        const getEvent=async ()=>{

            const token=localStorage.getItem('token');

            try{
                const response=await axios.get(`http://localhost:5000/vendor/getEvent/${props.event_id}`);
                //console.log(response.data);
                if(response.data)
                    {
                        //console.log(response.data[0]);
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
    },[props.event_id]);

    const handleSendMessage = () => {
        setsendMessage(true);
    };

    const handleChange=(e)=>{
        setValue({...value,[e.target.name]:e.target.value});
    }

    const handleSubmit=async ()=>{
        try{
            console.log(value);
            const response=await axios.post(`http://localhost:5000/vendor/reviseOffer`,value);
            console.log(response);

            if(response.data.status=='success')
                {
                    console.log('success');
                    setBidAmt(value.revisedOffer);
                }
                else{
                    console.log(response.message);
                }
        }catch(err)
        {
            console.error(err);
        }

    }

    return(
    <Container className="mx-auto w-75 mb-3">
        <Card className="shadow-lg">
            <Card.Body>
            <Container>
            <Row>
            <Col>
                <h3>{event.event}</h3>
            </Col>
            <Col className="d-flex justify-content-end">
                <h2>Budget:{event.budget}</h2>
            </Col>
            </Row>
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
                <Col className="mx-auto d-flex justify-content-end">
                    <p>My offer:{bidAmt}</p>
                </Col>
            </Row>
            <Row className="mb-2">
            <Col className="d-flex justify-content-start" xs={6}>
            <h6>
            No. of Bids: 
            <Badge pill className="mx-1" bg="dark">
                {props.bidNum}
            </Badge>
            </h6>
            </Col>

            <Col className="d-flex justify-content-end" xs={6} >
                <Button onClick={handleSendMessage} variant="btn btn-dark">Message</Button>
            </Col>
            {sendMessage && <Chat
                show={sendMessage} 
                event_id={event.event_id}
                client_id={event.user_id}
                vendor_id={props.vendor_id}
                onHide={() => setsendMessage(false)}
                senderType='vendor'
            />}
            </Row>
            <Row>
            <Col className="d-flex justify-content-start" xs={4} >
                <Form.Group className="mb-3">
                <Form.Control type="number" placeholder="revised offer" name='revisedOffer' onChange={handleChange}/>
                </Form.Group>
            </Col>
            <Col className="d-flex justify-content-start" xs={4}>
                <Button  style={{maxHeight:'40px'}} variant="outline-dark" onClick={handleSubmit}>
                    Submit
                </Button>
            </Col>
            </Row>
            </Container>
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
                        bid_id={bid.bid_id}
                        bidAmt={bid.bidAmt}
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
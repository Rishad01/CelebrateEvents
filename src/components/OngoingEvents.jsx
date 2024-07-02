import React from "react";
import axios from "axios";
import {Container,Row,Col,Card,Button,Modal} from "react-bootstrap";
import WOW from 'wowjs';

function Description(props)
{
    return(
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.content}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button  variant="outline-dark" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}

function PostedEvent(props)
{
    const[showDescrp,setshowDescrp]=React.useState(false);
    const handleDescrp=()=>{
        setshowDescrp(true);
    }
    React.useEffect(()=>{
        const wow = new WOW.WOW();
        wow.init();
    },[]);
    return(
        <Container className="mx-auto w-75 mb-3">
        <Card className="shadow-lg wow bounceInRight" data-wow-delay={`${props.id*200}ms`}>
            <Card.Body>
            <Card.Text>
            <Row>
                <Col xs={6} className="d-flex  justify-content-start">
                <h4>{props.event}</h4>
                </Col>
                <Col xs={6} className="d-flex  justify-content-end">
                    <h5>Budget: &#8377;{props.budget}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={4} className="d-flex  justify-content-start">
                <h5>Date: {props.date.slice(0,10)}</h5>
                </Col>
                <Col xs={4} className="d-flex  justify-content-between">
                    <h5>Time: {props.time}</h5>
                </Col>
                <Col xs={4} className="d-flex  justify-content-end">
                    <h5>Location: {props.location}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={4} className="d-flex  justify-content-start">
                <h5>No. of guests: {props.guestNum}</h5>
                </Col>
                <Col className="d-flex  justify-content-end">
                    <Button style={{maxHeight:"40px"}} variant="outline-dark" onClick={handleDescrp}>
                        Description
                    </Button>
                </Col>
                {showDescrp && 
                <Description 
                   content={props.descr}
                   show={showDescrp}
                   onHide={() => setshowDescrp(false)}
                />}
            </Row>
            </Card.Text>
            </Card.Body>
            </Card>
            </Container>
    );
}

function PostedEvents(props)
{
    const[dataItems,setdataItems]=React.useState([]);
    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/client/getPostedEvents/${props.user_id}`);
                console.log(response.data);
                if (response.status == 200) {
                    setdataItems(response.data.events);
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
    return(<Container>
        <Row>
            <Col>
                {dataItems.map((dataItem,index)=>(
                <PostedEvent 
                    key={index}
                    id={index}
                    event={dataItem.event}
                    date={dataItem.date}
                    time={dataItem.time}
                    location={dataItem.location}       
                    budget={dataItem.budget}
                    guestNum={dataItem.guestNum}
                    descr={dataItem.descr}
                />)
                )}
            </Col>
        </Row>
    </Container>);   
}

export default PostedEvents;
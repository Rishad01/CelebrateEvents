import React from "react";
import { Container, Nav, Card, Row, Col, Modal, Button} from "react-bootstrap";
import axios from "axios";

const Compevents=[
    {
        name:"CompEvent1"
    },{
        name:"CompEvent2"
    },{
        name:"CompEvent3"
    },{
        name:"CompEvent4"
    },{
        name:"CompEvent5"
    },{
        name:"CompEvent6"
    },{
        name:"CompEvent7"
    },{
        name:"CompEvent8"
    },{
        name:"CompEvent9"
    },{
        name:"CompEvent10"
    }
];


function EventDescription(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Event Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
           {props.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


function OngoingEventCard(props)
{
    const [descriptionShow, setdescriptionShow] = React.useState(false);
    const [eventInfo,setEventInfo]=React.useState([]);
    const [estimate,setEstimate]=React.useState('');

    React.useEffect(()=>{
        const fetchEvents=async()=>{
            try{
                const response=await axios.get(`http://localhost:5000/vendor/getEvent/${props.event_id}`);
                if(response.data && response.data.length > 0)
                    {
                        setEventInfo(response.data[0]);
                    }
            }catch(err){
                console.error(err);
            }
        }
        fetchEvents();
    },[]);
        React.useEffect(()=>{
        const fetchEstimate=async()=>{
            try{
                const response=await axios.get(`http://localhost:5000/vendor/getEstimate/${props.event_id}/${props.vendor_id}`);
                setEstimate(response.data);
            }catch(err)
            {
                console.error(err);
            }
        }
        fetchEstimate();
    },[]);
    return(
        
    <Container className="mx-auto w-75 mb-3">
        <Card className="shadow-lg">
            <Card.Body>
            <Row className="mb-2">
                <Col>
                <h3>{eventInfo.event}</h3>
                </Col>
                <Col className="d-flex justify-content-end">
                <h4>Estimate: &#8377;{estimate}</h4>
                </Col>
            </Row>
            <Row className="mb-2">
                        <Col>
                        
                             <h5>Date: {eventInfo.date}</h5>
                        </Col>
                        <Col className="d-flex justify-content-center">
                             <h5>Location: {eventInfo.location}</h5>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button style={{height:'40px'}} variant="outline-dark" onClick={()=>setdescriptionShow(true)}>Description</Button>
                        </Col>
                        <EventDescription
                            show={descriptionShow}
                            onHide={() => setdescriptionShow(false)}
                            description={eventInfo.descr}
                        />
                    </Row>
                    
            </Card.Body>
        </Card>    
        </Container>
    );
}

function CompletedEventCard(props)
{

    return(
        
    <Container className="mx-auto w-75 mb-3">
        <Card className="shadow-lg">
            <Card.Body>
            <Row>
            <Col>
                <h3>{props.name}</h3>
            </Col>
            </Row>
            
            </Card.Body>
        </Card>    
        </Container>
    );
}

function ShowMyprojects()
{
    const [ongoingEvents,setongoingEvents]=React.useState(true);
    const [completedEvents,setcompletedEvents]=React.useState(false);
    const [ongoingEventsArr,setOngoingEventsArr]=React.useState([]);
    const [completedEventsArr,setCompletedEventsArr]=React.useState([]);
    const [events,setEvents]=React.useState([]);

    React.useEffect(()=>{
        const token=localStorage.getItem('vendor_token');
        const fetchEvents=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/vendor/getOngoingEvents',{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                //console.log(response.data.events);
                if(response.data.message=="success")
                    {
                        //console.log(response.data.events);
                      setOngoingEventsArr(response.data.events);
                    }
                else if(response.data.message=="no data present")
                    {
                        console.log(response.data.message);
                    }
            }catch(err){
                console.error(err);
            }
        }

        fetchEvents();
    },[ongoingEvents]);

    React.useEffect(()=>{
        const token=localStorage.getItem('vendor_token');
        const fetchEvents=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/vendor/getCompletedEvents',{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                //console.log(response.data.events);
                if(response.data.message=="success")
                    {
                        //console.log(response.data.events);
                      setCompletedEventsArr(response.data.events);
                    }
                else if(response.data.message=="no data present")
                    {
                        console.log(response.data.message);
                    }
            }catch(err){
                console.error(err);
            }
        }

        fetchEvents();
    },[completedEvents]);

    function handleOngoingClick()
    {
        setongoingEvents(true);
        setcompletedEvents(false);
    }

    function handleCompletedClick()
    {
        setongoingEvents(false);
        setcompletedEvents(true);
    }

    return(
        <Container fluid>
        <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link onClick={handleOngoingClick} eventKey="link-1">Ongoing Events</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={handleCompletedClick} eventKey="link-2">Completed Events</Nav.Link>
      </Nav.Item>
    </Nav>

    <Row className="mt-5">
        <Col>
            {
                ongoingEvents
                &&
                <Container>
                    <Row>
                        <Col>
                            {ongoingEventsArr.
                            map((event)=>(<OngoingEventCard 
                                key={event.event_id}
                                event_id={event.event_id}
                                vendor_id={event.vendor_id}
                                feedback={event.feedback}
                                reveiw={event.review}
                            />
                            ))}
                        </Col>
                    </Row>
                </Container>
            }

            {
                completedEvents
                &&
                <Container>
                    <Row>
                        <Col>
                            {completedEventsArr.map((event)=>
                            <CompletedEventCard 
                                name={event.name}
                            />
                            )}
                        </Col>
                    </Row>
                </Container>
            }
        </Col>
    </Row>
    </Container>

    );
}

export default ShowMyprojects;
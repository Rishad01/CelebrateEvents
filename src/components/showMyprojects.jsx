import React from "react";
import { Container, Nav, Card, Row, Col, Modal, Button} from "react-bootstrap";

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

const Ongoingevents=[
    {
        name:"Birthday",
        date:"01-01-2001",
        location:"Lucknow",
        estimate:5000,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Purus semper eget duis at tellus at urna. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Bibendum enim facilisis gravida neque convallis a cras. Ipsum consequat nisl vel pretium. Fermentum et sollicitudin ac orci phasellus. Blandit aliquam etiam erat velit. Enim lobortis scelerisque fermentum dui faucibus in ornare. Risus pretium quam vulputate dignissim suspendisse in est ante. Massa sapien faucibus et molestie. Nunc congue nisi vitae suscipit. Pellentesque habitant morbi tristique senectus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Id leo in vitae turpis massa sed elementum. Ullamcorper morbi tincidunt ornare massa eget."
    },{
        name:"Wedding",
        date:"02-02-2002",
        location:"Kolkata",
        estimate:100000,
        description:"Ante metus dictum at tempor commodo. Sed risus pretium quam vulputate dignissim suspendisse in est. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Amet dictum sit amet justo donec. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Nulla aliquet enim tortor at. Ut morbi tincidunt augue interdum velit. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Augue mauris augue neque gravida in fermentum et sollicitudin. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Elit pellentesque habitant morbi tristique senectus et netus. Adipiscing elit ut aliquam purus sit. Volutpat odio facilisis mauris sit. Scelerisque viverra mauris in aliquam sem. Augue neque gravida in fermentum et. Aliquet lectus proin nibh nisl condimentum id."
    },{
        name:"Promotion Party",
        date:"03-03-2003",
        location:"Lucknow",
        estimate:100000,
        description:"Erat velit scelerisque in dictum non consectetur a erat. Imperdiet nulla malesuada pellentesque elit eget. Placerat vestibulum lectus mauris ultrices eros in cursus. Egestas sed sed risus pretium quam. Felis bibendum ut tristique et egestas quis. Egestas pretium aenean pharetra magna. Vitae congue mauris rhoncus aenean vel elit. Commodo sed egestas egestas fringilla. A erat nam at lectus urna duis convallis. Eros donec ac odio tempor orci dapibus ultrices in. Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. In fermentum et sollicitudin ac orci. Turpis egestas integer eget aliquet nibh praesent tristique magna. Tristique senectus et netus et. Dapibus ultrices in iaculis nunc sed augue. Donec et odio pellentesque diam volutpat commodo sed egestas. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Porttitor leo a diam sollicitudin tempor id. Nibh praesent tristique magna sit amet. Consectetur a erat nam at lectus urna duis."
    },{
        name:"Festival Celebration",
        date:"04-04-2004",
        location:"xyz",
        estimate:20000,
        description:"Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Felis imperdiet proin fermentum leo vel orci porta non. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Ut tellus elementum sagittis vitae. Viverra mauris in aliquam sem fringilla. Quisque non tellus orci ac auctor augue. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Ullamcorper a lacus vestibulum sed arcu non odio euismod. Vitae purus faucibus ornare suspendisse sed. Sit amet porttitor eget dolor. Fermentum leo vel orci porta non pulvinar neque laoreet. Id diam vel quam elementum pulvinar etiam non. In est ante in nibh mauris. Bibendum ut tristique et egestas quis. Tincidunt praesent semper feugiat nibh sed pulvinar. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Mollis nunc sed id semper risus in hendrerit gravida. Felis imperdiet proin fermentum leo vel orci. A erat nam at lectus. Amet mauris commodo quis imperdiet massa tincidunt nunc."
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
    return(
        
    <Container className="mx-auto w-75 mb-3">
        <Card className="shadow-lg">
            <Card.Body>
            <Row className="mb-2">
                <Col>
                <h3>{props.name}</h3>
                </Col>
                <Col className="d-flex justify-content-end">
                <h4>Estimate: &#8377;{props.estimate}</h4>
                </Col>
            </Row>
            <Row className="mb-2">
                        <Col>
                             <h5>Date: {props.date}</h5>
                        </Col>
                        <Col className="d-flex justify-content-center">
                             <h5>Location: {props.location}</h5>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button variant="outline-dark" onClick={()=>setdescriptionShow(true)}>Description</Button>
                        </Col>
                        <EventDescription
                            show={descriptionShow}
                            onHide={() => setdescriptionShow(false)}
                            description={props.description}
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
        <Container>
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
                            {Ongoingevents.map((event)=>
                            <OngoingEventCard 
                                name={event.name}
                                date={event.date}
                                location={event.location}
                                estimate={event.estimate} 
                                description={event.description} 
                                offer={event.offer}
                            />
                            )}
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
                            {Compevents.map((event)=>
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
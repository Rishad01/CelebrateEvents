import React from "react";
import { Container,Row,Col,Modal,Card,Button} from "react-bootstrap";
const event_data=[
    {
        name:"Birthday",
        date:"01-01-2001",
        location:"Lucknow",
        budget:5000,
        offer:6000,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Purus semper eget duis at tellus at urna. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Bibendum enim facilisis gravida neque convallis a cras. Ipsum consequat nisl vel pretium. Fermentum et sollicitudin ac orci phasellus. Blandit aliquam etiam erat velit. Enim lobortis scelerisque fermentum dui faucibus in ornare. Risus pretium quam vulputate dignissim suspendisse in est ante. Massa sapien faucibus et molestie. Nunc congue nisi vitae suscipit. Pellentesque habitant morbi tristique senectus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Id leo in vitae turpis massa sed elementum. Ullamcorper morbi tincidunt ornare massa eget."
    },{
        name:"Wedding",
        date:"02-02-2002",
        location:"Kolkata",
        budget:100000,
        offer:105000,
        description:"Ante metus dictum at tempor commodo. Sed risus pretium quam vulputate dignissim suspendisse in est. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Amet dictum sit amet justo donec. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Nulla aliquet enim tortor at. Ut morbi tincidunt augue interdum velit. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Augue mauris augue neque gravida in fermentum et sollicitudin. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Elit pellentesque habitant morbi tristique senectus et netus. Adipiscing elit ut aliquam purus sit. Volutpat odio facilisis mauris sit. Scelerisque viverra mauris in aliquam sem. Augue neque gravida in fermentum et. Aliquet lectus proin nibh nisl condimentum id."
    },{
        name:"Promotion Party",
        date:"03-03-2003",
        location:"Lucknow",
        budget:100000,
        offer:105000,
        description:"Erat velit scelerisque in dictum non consectetur a erat. Imperdiet nulla malesuada pellentesque elit eget. Placerat vestibulum lectus mauris ultrices eros in cursus. Egestas sed sed risus pretium quam. Felis bibendum ut tristique et egestas quis. Egestas pretium aenean pharetra magna. Vitae congue mauris rhoncus aenean vel elit. Commodo sed egestas egestas fringilla. A erat nam at lectus urna duis convallis. Eros donec ac odio tempor orci dapibus ultrices in. Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. In fermentum et sollicitudin ac orci. Turpis egestas integer eget aliquet nibh praesent tristique magna. Tristique senectus et netus et. Dapibus ultrices in iaculis nunc sed augue. Donec et odio pellentesque diam volutpat commodo sed egestas. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Porttitor leo a diam sollicitudin tempor id. Nibh praesent tristique magna sit amet. Consectetur a erat nam at lectus urna duis."
    },{
        name:"Festival Celebration",
        date:"04-04-2004",
        location:"xyz",
        budget:20000,
        offer:22000,
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

function ActiveBid(props)
{
    const [descriptionShow, setdescriptionShow] = React.useState(false);
    return(
        <Card className="shadow-lg mb-2">
            <Card.Body>
                <Container>
                    <Row className="mb-2">
                        <Col>
                        <h3>{props.name}</h3>
                        </Col>
                        <Col className="d-flex justify-content-end">
                        <h4>Budget: &#8377;{props.budget}</h4>
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
                            <h5>Offer: &#8377;{props.offer}</h5>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col className="d-flex justify-content-start">
                             <Button variant="outline-dark" onClick={()=>setdescriptionShow(true)}>Description</Button>
                        </Col>
                        <EventDescription
                            show={descriptionShow}
                            onHide={() => setdescriptionShow(false)}
                            description={props.description}
                        />
                        <Col className="d-flex justify-content-end" xs={3}>
                            <Button variant="btn btn-dark">Message</Button>
                        </Col>
                        
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

function OngoingBids()
{
    return(
        <Container className="mx-auto w-75 mb-3">
            {event_data.map((event)=>
            <ActiveBid 
                name={event.name}
                date={event.date}
                location={event.location}
                budget={event.budget}
                offer={event.offer}
                description={event.description}
            />
            )}
        </Container>
    );
}

export default OngoingBids;
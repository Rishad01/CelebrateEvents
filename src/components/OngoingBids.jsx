import React from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
const events=[
    {
        name:"Event1",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    },{
        name:"Event2",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    },{
        name:"Event3",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    },{
        name:"Event4",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    },{
        name:"Event5",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    },{
        name:"Event6",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    },{
        name:"Event7",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    },{
        name:"Event8",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    },{
        name:"Event9",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    },{
        name:"Event10",
        budget:10000,
        avg_bid:12000,
        highest_bid:15000,
        lowest_bid:10500,
        bid_num:10
    }
];

function ProposedEventCard(props)
{
    const [bid_num,setbid_num]=React.useState(props.bid_num);

    React.useEffect(() => {
        setbid_num(props.bid_num);
    }, [props.bid_num]);
    return(
    <Container className="mx-auto w-75 mb-3">
        <Card className="shadow-lg">
            <Card.Body>
            <Row>
            <Col>
                <h3>{props.name}</h3>
            </Col>
            <Col className="d-flex justify-content-end">
                <h2>Budget:{props.budget}</h2>
            </Col>
            </Row>
            <Container>
            <Row>
                <Col className="mx-auto d-flex justify-content-start">
                    <p>Lowest Bid:{props.lowest_bid}</p>
                </Col>
                <Col className="mx-auto d-flex justify-content-center">
                    <p>Avg. Bid:{props.avg_bid}</p>
                </Col>
                <Col className="mx-auto d-flex justify-content-end">
                    <p>Highest Bid:{props.highest_bid}</p>
                </Col>
            </Row>
            </Container>
            <Row className="mb-2">
            <Col className="d-flex justify-content-start">
            <h6>
            No. of Bids: 
            <Badge pill className="mx-1" bg="dark">
                {bid_num}
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
    return(
        <Container>
            <Row>
                <Col>
                    {events.map((event)=>
                    <ProposedEventCard 
                        name={event.name}
                        budget={event.budget}
                        avg_bid={event.avg_bid}
                        highest_bid={event.highest_bid}
                        lowest_bid={event.lowest_bid}
                        bid_num={event.bid_num}
                    />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ProposedEvents;
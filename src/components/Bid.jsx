import React from "react";
import { Button,Row,Col,ListGroup } from "react-bootstrap";
import Chat from "./Chat";

function Bid(props)
{
    const [sendMessage,setsendMessage]=React.useState(false);
    const handleSendMessage = () => {
        setsendMessage(true);
    };
    return(
        <ListGroup.Item action>
            <Row className="mt-2">
                <Col md={3} xs={6}>
                    {props.vendor_id}
                    
                </Col>
                <Col md={3} xs={6}>
                &#8377;{props.bidAmt}
                </Col>
                <Col md={3} xs={6}>
                    <Button onClick={handleSendMessage} variant="dark">Message</Button>
                </Col>
                {sendMessage && <Chat 
                    event_id={props.event_id}
                    client_id={props.user_id}
                    vendor_id={props.vendor_id}
                    onHide={() => setsendMessage(false)}
                    senderType='client'
                />}
                <Col md={3} xs={6}>
                    <Button variant="dark">Close Deal</Button>
                </Col>
            </Row>
            
        </ListGroup.Item>
    );
}

export default Bid;
import React from "react";
import { Button,Row,Col,ListGroup } from "react-bootstrap";
import Chat from "./Chat.jsx";
import axios from "axios";

function Bid(props)
{
    const [sendMessage,setsendMessage]=React.useState(false);
    const [status,setStatus]=React.useState(props.bidStatus);
    const handleCloseDeal=async ()=>{
        try{
            console.log('hello');
            const response=await axios.put(`http://localhost:5000/client/closeDeal/${props.vendor_id}/${props.event_id}`);
            console.log(response);
            if(response.data.message=="status changed")
                {
                    console.log('changed');
                    setStatus('awarded');
                }
        }catch(error){
            console.error(error);
        }
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
                    <Button onClick={()=>setsendMessage(true)} variant="dark">Message</Button>
                </Col>
                {sendMessage && <Chat 
                    show={sendMessage}
                    event_id={props.event_id}
                    client_id={props.client_id}
                    vendor_id={props.vendor_id}
                    onHide={() => setsendMessage(false)}
                    senderType='client'
                />}
                <Col md={3} xs={6}>
                    {status==="ongoing"?<Button onClick={handleCloseDeal} variant="dark">Close Deal</Button>:<strong>{status}</strong>}
                </Col>
            </Row>
            
        </ListGroup.Item>
    );
}

export default Bid;
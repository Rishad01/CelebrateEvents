import React from "react";
import {Col,Image} from "react-bootstrap";
import WOW from 'wowjs';

function Card(props)
{
    React.useEffect(()=>{
        const wow = new WOW.WOW();
        wow.init();
    },[]);
    return (
        <Col className="wow bounceInRight img" data-wow-delay={`${props.id*200}ms`} xs={12} md={3}>
            <Image src={props.path} rounded /> 
        </Col>
    );
}

export default Card; 




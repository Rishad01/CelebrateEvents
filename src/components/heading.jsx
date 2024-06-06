import React from "react";
import { useEffect } from "react";
import WOW from 'wowjs';

function Heading(props)
{
    useEffect(()=>{
        const wow = new WOW.WOW();
        wow.init();
    },[]);

    return (<h1 style={{zIndex: "1"}} className="wow bounceInLeft">{props.content}</h1>);
}
export default Heading;
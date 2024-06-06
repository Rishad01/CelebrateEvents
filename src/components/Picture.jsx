import React from 'react';
//import {Carousel, Image} from "react-bootstrap";
//import bday from "../assets/bday.jpg";
import CarouselImage from "./carouselImage";
import WOW from 'wowjs';
function Picture()
{
    React.useEffect(()=>{
        const wow = new WOW.WOW();
        wow.init();
    },[]);

    return <CarouselImage />;
    //return(
        //<Image style={{width:'100%'}} className="wow bounceInRight" src={bday} rounded />);
}

export default Picture;
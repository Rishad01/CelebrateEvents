import React from "react";
import {Carousel,Image} from 'react-bootstrap';
import bday from "../assets/bday.jpg";
import wedding from "../assets/wedding.jpg"
import cake from "../assets/cake.jpg"
//import CarouselItem from "./carouselItem";
import arr from "./Images";

function CarouselImage()
{
    return (
        <Carousel fade interval={2500} className="wow bounceInRight mt-2">
          <Carousel.Item>
          <Image className="carousel-image" src={bday} rounded />
          </Carousel.Item>
          <Carousel.Item>
          <Image className="carousel-image" src={wedding} rounded />
          </Carousel.Item>
          <Carousel.Item>
          <Image className="carousel-image" src={cake} rounded />
          </Carousel.Item>
        </Carousel>
      );
}

export default CarouselImage;
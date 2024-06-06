import React from "react";
import {Container,Row,Col} from "react-bootstrap";
import Card from "./Card";
const pics=[
    {
        id:1,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:2,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:3,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:4,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:5,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:6,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:7,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:8,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:9,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:10,
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    }

];


function ShowPortfolio()
{
    return(
        <Container>
            <Row>
                {pics.map((pic)=>
                    <Card 
                        id={pic.id}
                        key={pic.id}
                        path={pic.src}
                    />
                    )}
            </Row>
        </Container>
    );
}

export default ShowPortfolio;
import React from "react";
import Card from "./Card";
const images=[
    {
        id:1,
        path:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:2,
        path:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:3,
        path:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    },
    {
        id:4,
        path:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdEd2-lxbnNxJBRJ5UVgo1sSGUb8ZPi1ew&usqp=CAU'
    }
];

function ExampleImage()
{
    return(
        images.map(image=>
            (<Card 
                key={image.id}
                id={image.id}
                path={image.path}
            />)
        )
    );
}

export default ExampleImage
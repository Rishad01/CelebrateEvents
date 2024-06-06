import React from "react";
import { Container,Row } from "react-bootstrap";
import Heading from "./heading";
import ExampleImage from "./Exampleimage";

function Examples()
{
    return (
        <Container>
        <Row>
    <Heading 
        content="Explore perfection in every frame - behold our curated event experiences!"
    />
    </Row>
    <Row>
    <ExampleImage />
    </Row>
    </Container>);
}

export default Examples;
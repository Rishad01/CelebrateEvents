import React from "react";
import {Row,Container} from "react-bootstrap";
import VendorImage from "./VendorImage";
import Heading from "./heading";


function Vendors()
{
    return (
        <Container>
        <Row>
    <Heading 
        content="Some of our Vendors are..."
    />
    </Row>
    <Row>
        <VendorImage />
    </Row>
    </Container>
    );
}

export default Vendors;
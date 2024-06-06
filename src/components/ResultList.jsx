import React from "react";
import { Container, ListGroup, Row, Col} from "react-bootstrap";
function ResultList(props)
{
    function handleonClick(value)
    {
        props.setinputValue(value);
    }
    return(
        <Container>
        <Row>
        <Col>
        <ListGroup style={{ position: "absolute", zIndex: 100}} classsName="mt-0">
        {props.results.map(result=>(
            <ListGroup.Item onClick={(e)=>handleonClick(e.target.innerText)}>{result}</ListGroup.Item>
        ))}
    </ListGroup>
    </Col>
    </Row>
    </Container>
    );
}

export default ResultList;
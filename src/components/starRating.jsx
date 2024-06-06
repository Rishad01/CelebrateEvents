import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {FaStar} from "react-icons/fa";
function StarRating()
{
    const [Rating,setRating]=React.useState(null);
    const [hover,sethover]=React.useState(null);
    return(
        
        <Container>
            <Row className="star_rating">
                {[...Array(5)].map((star,index)=>{
                    let currentRating=index+1;
                    return(
                    <Col xs={1} style={{maxWidth:"25px", minWidth:"25px"}} className="m-0 p-0">
                    <FaStar className="star" 
                        size={25}
                        onClick={()=>setRating(currentRating)}
                        color={currentRating <= (hover||Rating)?"yellow":"grey"}
                        onMouseEnter={()=>sethover(currentRating)}
                        onMouseLeave={()=>sethover(null)}
                    />
                    </Col>
                    );
                }
                )}
                
            </Row>
        </Container>
        
    );
}

export default StarRating;
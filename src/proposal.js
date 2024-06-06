import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function Proposal()
{
    const navigate=useNavigate();
    const [editorHtml, setEditorHtml] = React.useState("");
  
    
        console.log(editorHtml);
      
    const handleSubmit=()=>{
        console.log(editorHtml);
        //For the time being till i am doing the frontend i am redirecting to vendorSection 
        
    }
  
    

    return(
            <Container>
            <Row className="mb-2">
            <Col>
            <ReactQuill
                theme="snow"
                value={editorHtml}
                onChange={setEditorHtml}
                style={{ width: "100%"}}
            /></Col>
            </Row>
            </Container>
    );
}

export default Proposal;
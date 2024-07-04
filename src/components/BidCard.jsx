import axios from "axios";
import React from "react";
import { Button, Card, Col, Container, Row, Modal, Form} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function ProposalModal(props) {
  const [editorHtml, setEditorHtml] = React.useState("");      
    const handleSubmit=()=>{
      props.updateproposal(editorHtml); // Call the passed-in function with the proposal content
      console.log(editorHtml); // Optional logging for debugging
      props.onHide(); // Close the modal after submission
    }
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Write the proposal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
            <Row className="mb-2">
              <Col>
                <ReactQuill
                    theme="snow"
                    value={editorHtml}
                    onChange={setEditorHtml}
                    style={{ width: "100%"}}
                />
              </Col>
            </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
      <Container>
      <Row>
      <Col className="d-flex justify-content-start">
        <Button onClick={props.onHide}>Close</Button>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button onClick={handleSubmit}>Submit</Button>
      </Col>
      </Row>
      </Container>
      </Modal.Footer>
    </Modal>
  );
}


function EventDescription(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Event Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

function BidCard(props)
{
    const[values,setvalues]=React.useState({
      event_id:props.event_id,
      bidAmt:0,
      proposal:''
    });
    const [proposalShow, setproposalShow] = React.useState(false); 
    const [descriptionShow, setdescriptionShow] = React.useState(false);
    const [bidSubmitted,setbidSubmitted] = React.useState(false);
    const [bidAwarded,setBidAwarded]= React.useState(false);
    React.useEffect(()=>{
      const token=localStorage.getItem('vendor_token');
      const checkBid=async ()=>{
        try{
          const response=await axios.get(`http://localhost:5000/vendor/checkBidStatus/${props.event_id}`,{
            headers:{
              'Authorization':`Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
          );
          console.log(response);
          if(response.data.status =='awarded')
            {
              setBidAwarded(true);
            }
          else if(response.data.status =='set')
            {
              console.log(response);
              setbidSubmitted(true);
            }
        }catch(err){
          console.error(err);
        }
      }

      checkBid();
    },[props.event_id]);
    const updateProposal = (newProposal) => {
      setvalues({ ...values, proposal: newProposal });
    };
    const handleChange=(event)=>{
      setvalues({...values,[event.target.name]:event.target.value});
    }
    const handleSubmit=async ()=>{
      console.log(values);
      const token=localStorage.getItem('vendor_token');
      try{
        const response=await axios.post('http://localhost:5000/vendor/storeBid', values,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      });
      console.log(response);
        if(response.data.status=='success')
          {
            console.log('hello');
            setbidSubmitted(true);
          }
      }
      catch(err)
      {
        console.error(err);
      }
    }
    
    const navigate=useNavigate();
    return(
      <div>
        {!bidAwarded && <Container className="mx-auto w-75 mb-3">
        <Card className="shadow-lg">
            <Card.Body>
                <Container>
                    <Row className="mb-2">
                        <Col>
                        <h4>{props.name}</h4>
                        </Col>
                        <Col className="d-flex justify-content-end">
                        <h5>Budget: &#8377;{props.budget}</h5>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-start">
                        <Col>
                             <h6>Date: {props.date}</h6>
                        </Col>
                        <Col className="d-flex justify-content-center">
                             <h6>Location: {props.location}</h6>
                        </Col>
                        <Col className="d-flex justify-content-center">
                             <h6>Time: {props.time}</h6>
                        </Col>
                        <Col className="d-flex justify-content-end">
                             <h6>No. of guests: {props.guestNum}</h6>
                        </Col>
                        
                    </Row>
                    <Row className="m-2">
                        <Col className="d-flex justify-content-start">
                             <Button  style={{maxHeight:'40px'}} variant="outline-dark" onClick={()=>setdescriptionShow(true)}>Description</Button>
                        </Col>
                        <EventDescription
                            show={descriptionShow}
                            onHide={() => setdescriptionShow(false)}
                            description={props.description}
                        />
                        <Col>
                          {!bidSubmitted && <Form className="">
                            <Form.Group className="mb-3" controlId="formBasic">
                                <Form.Control type="number" placeholder="Make your offer" name="bidAmt" onChange={handleChange}/>
                            </Form.Group>
                          </Form>}
                        </Col>
                        <Col className="d-flex justify-content-end">
                        {!bidSubmitted && <Button style={{maxHeight:'40px'}} variant="btn btn-dark" onClick={()=>setproposalShow(true)}>Make Proposal</Button>}
                            {proposalShow 
                            && 
                            <ProposalModal
                              show={proposalShow}
                              onHide={() => setproposalShow(false)}
                              updateproposal={updateProposal}
                            />}
                        </Col>
                    </Row>
                    {!bidSubmitted && <Row>
                      <Col className="d-flex justify-content-end">
                        <Button style={{maxHeight:'40px'}} variant="btn btn-dark" onClick={handleSubmit}>Submit</Button>
                      </Col>
                    </Row>}
                </Container>
            </Card.Body>
        </Card>
        </Container>}
        </div>
    );
}

export default BidCard;
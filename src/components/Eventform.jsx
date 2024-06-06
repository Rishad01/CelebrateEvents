import React from "react";
import { useEffect } from "react";
import axios from "axios";
import {Form,Row,Col,Button, Container} from "react-bootstrap";
import WOW from 'wowjs';
function Eventform()
{
    useEffect(()=>{
        const wow = new WOW.WOW();
        wow.init();
    },[]);
    
    const[values,setValues]=React.useState({
      user_id:'',
      event:'',
      location:'',
      date:'',
      time:'',
      guestNum:'',
      descr:'',
      images:'',
      budget:''
    });

    React.useEffect(() => {
      const fetchSession = async () => {
        try {
          const response = await axios.get('http://localhost:5000/user');
          console.log(response);
          if(response.data.status=="Authenticated"){
            setValues({...values,user_id: response.data.id});
          }
        else{
          console.log(response.data.message);
          }
        } catch (error) {
          console.log('Error occurred:', error);
        }
      };
    
      fetchSession(); // Call the inner function immediately
    }, []);



    const handleChange=(event)=>{
      setValues({...values,[event.target.name]:event.target.value})
    }

    axios.defaults.withCredentials=true;
    const handleSubmit=async (event)=>{
      console.log(values);
      //event.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/client/addEvent', values);
        console.log(response);
        //if(response.data.status=='success')
        //navigate('/client'); 
     } catch (error) {
        console.error(error);
        
     }
    }
    return (
        <div className="">
        <Container className="bg-body-secondary mt-3 rounded wow slideInLeft">
        <Row className="mb-3">
        <h2>Register the event you want to organize</h2>
        </Row>
        <Form  onSubmit={handleSubmit} className="py-3">
          <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Type of Event</Form.Label>
              <Form.Select defaultValue="Choose..." name="event" onChange={handleChange}>
                <option>Choose...</option>
                <option>Event1</option>
                <option>Event2</option>
                <option>Event3</option>
                <option>Event4</option>
                <option>Event5</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" onChange={handleChange}/>
            </Form.Group>
          </Row>
    
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" onChange={handleChange}/>
            </Form.Group>
    
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" name="time" onChange={handleChange}/>
            </Form.Group>
    
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control type="number" min="10" name="guestNum" onChange={handleChange}/>
            </Form.Group>
            </Row>
        
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Description of event</Form.Label>
              <Form.Control as="textarea" rows={2} name="descr" onChange={handleChange}/>
            </Form.Group>
    
            <Form.Group as={Col} controlId="formFileMultiple" className="mb-3">
              <Form.Label>Upload images...</Form.Label>
              <Form.Control type="file" multiple  name="images" onChange={handleChange}/>
            </Form.Group>
          </Row>

          <Row className="mb-3" >
          <Col xs={4}>
            <Form.Group controlId="formGridCity">
              <Form.Label>Budget</Form.Label>
              <Form.Control type="number" min="1000" name="budget" onChange={handleChange}/>
            </Form.Group>
        </Col>
        </Row>
          <Button variant="btn btn-dark" type="submit">
            Submit
          </Button>
        </Form>
        </Container>
        </div>
      );
}

export default Eventform;
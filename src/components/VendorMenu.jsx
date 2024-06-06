import React from "react";
import {Button,Offcanvas,ListGroup,i, Container, Col, Row, ListGroupItem} from "react-bootstrap";
function VendorMenu(props)
{
  const [show, setShow] = React.useState(false);
  const [DashboardList,setDashboardList] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    setDashboardList(false);
    };
  const handleShow = () => setShow(true);

  function addBids()
  {
    props.setshowOngoingBids(false);
    props.setshowMyprojects(false);
    props.setshowPortfolio(false);
    props.setshowFeedback(false);
    props.setshowReview(false);
    props.setshowDashboard(false);
    props.setshowBids(true);
    props.setshowEditprofile(false);
    props.setregistered(false);
    handleClose();
  }

  function addEditprofile()
  {
    props.setshowOngoingBids(false);
    props.setshowMyprojects(false);
    props.setshowPortfolio(false);
    props.setshowFeedback(false);
    props.setshowReview(false);
    props.setshowDashboard(false);
    props.setshowBids(false);
    props.setshowEditprofile(true);
    props.setregistered(false);
    handleClose();
  }

  function setshowOngoingBids()
  {
    props.setshowOngoingBids(true);
    props.setshowMyprojects(false);
    props.setshowPortfolio(false);
    props.setshowFeedback(false);
    props.setshowReview(false);
    props.setshowBids(false);
    props.setshowEditprofile(false);
    props.setregistered(false);
    handleClose();
  }

  function setshowMyprojects()
  {
    props.setshowOngoingBids(false);
    props.setshowMyprojects(true);
    props.setshowPortfolio(false);
    props.setshowFeedback(false);
    props.setshowReview(false);
    props.setshowBids(false);
    props.setshowEditprofile(false);
    props.setregistered(false);
    handleClose();
  }

  function setshowPortfolio()
  {
    props.setshowOngoingBids(false);
    props.setshowMyprojects(false);
    props.setshowPortfolio(true);
    props.setshowFeedback(false);
    props.setshowReview(false);
    props.setshowBids(false);
    props.setshowEditprofile(false);
    props.setregistered(false);
    handleClose();
  }

  function setshowFeedback()
  {
    props.setshowOngoingBids(false);
    props.setshowMyprojects(false);
    props.setshowPortfolio(false);
    props.setshowFeedback(true);
    props.setshowReview(false);
    props.setshowBids(false);
    props.setshowEditprofile(false);
    props.setregistered(false);
    handleClose();
  }

  function setshowReview()
  {
    props.setshowOngoingBids(false);
    props.setshowMyprojects(false);
    props.setshowPortfolio(false);
    props.setshowFeedback(false);
    props.setshowReview(true);
    props.setshowBids(false);
    props.setshowEditprofile(false);
    props.setregistered(false);
    handleClose();
  }


    return (<div className="mb-3 mt-2">
      <Button className="lg" variant="outline-dark" onClick={handleShow}>
      <i class="bi bi-list"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup variant="flush">
        <ListGroup.Item action onClick={()=>setDashboardList(!DashboardList)} >Dashboard</ListGroup.Item>
            {
                DashboardList
                &&
                <Container>
                    <Row>
                        <Col>
                            <ListGroup as="ul" variant="flush">
                            <ListGroup.Item action onClick={setshowOngoingBids}>Ongoing Bids</ListGroup.Item>
                            <ListGroup.Item action onClick={setshowMyprojects}>My Projects</ListGroup.Item>
                            <ListGroup.Item action onClick={setshowPortfolio}>Portfolio</ListGroup.Item>
                            <ListGroup.Item action onClick={setshowFeedback}>Feedback</ListGroup.Item>
                            <ListGroup.Item action onClick={setshowReview}>Review</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            }
        
        <ListGroup.Item action onClick={addBids}>
            Make Bid
        </ListGroup.Item>
        <ListGroup.Item action onClick={addEditprofile}>
           Edit Profile
        </ListGroup.Item>
        </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      </div>);
}

export default VendorMenu;
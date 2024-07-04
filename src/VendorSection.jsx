import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container,Navbar,Row,Col, Button } from "react-bootstrap";
import VendorRegForm from "./components/VendorRegForm";
import VendorMenu from "./components/VendorMenu";
import VendorDashboard from "./components/VendorDashboard";
import EventstoBid from "./components/EventstoBid";
import VendorEditProfile from "./components/VendorEditProfile";
import OngoingBids from "./components/OngoingBids";
import ShowMyprojects from "./components/showMyprojects";
import ShowPortfolio from "./components/showPortfolio";
import ShowFeedback from "./components/showFeedback";
import ShowReview from "./components/showReview";

function VendorSection()
{
    const [logoutbtn,setlogoutbtn]=React.useState(false);
    const [registered,setregistered]=React.useState(true);
    const [showDashboard,setshowDashboard]=React.useState(false);
    const [showBids,setshowBids]=React.useState(false);
    const [showEditprofile,setshowEditprofile]=React.useState(false);
    const [showOngoingBids,setshowOngoingBids]=React.useState(false);
    const [showMyprojects,setshowMyprojects]=React.useState(false);
    const [showPortfolio,setshowPortfolio]=React.useState(false);
    const [showFeedback,setshowFeedback]=React.useState(false);
    const [showReview,setshowReview]=React.useState(false);
    const [id,setId]=React.useState('');
    const navigate=useNavigate();
    React.useEffect(()=>{
        const logout=async()=>{
            const token=localStorage.getItem('vendor_token');
            try{
                const response=await axios.get('http://localhost:5000/vendor/authenticate', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if(response.data.status=='Authenticated')
                    {
                       setId(response.data.id);
                       setlogoutbtn(true);
                    } 
                else
                  navigate('/vendor');
              }
              catch(error){
                console.error(error);
              }
        }

        logout();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("vendor_token");
        navigate('/vendor');
    };
    return(
        <Container fluid>
        <Row>
            <Col className="bg-body-tertiary">
            <Navbar>
            <Navbar.Brand href="#home"><h2>Brand Name</h2></Navbar.Brand>
            </Navbar>
            </Col>
        </Row>
        <Row>
            <Col className="justify-content-start">
            <VendorMenu 
            setregistered={setregistered}
            setshowDashboard={setshowDashboard}
            setshowBids={setshowBids}
            setshowEditprofile={setshowEditprofile}
            setshowOngoingBids={setshowOngoingBids}
            setshowMyprojects={setshowMyprojects}
            setshowPortfolio={setshowPortfolio}
            setshowFeedback={setshowFeedback}
            setshowReview={setshowReview}
            />
            </Col>
            {id}
            <Col className="d-flex justify-content-end">
            {logoutbtn && <Button className="mt-2" variant="outline-dark" style={{maxHeight:'40px'}} onClick={handleLogout}>Logout</Button>}
            </Col>
        </Row>
        <Row>
        <Container>
            <Row>
                <Col>
                {registered&&<VendorRegForm />}
                {showDashboard && <VendorDashboard />}
                {showBids && <EventstoBid />}
                {showEditprofile && <VendorEditProfile />}
                {showOngoingBids && <OngoingBids />}
                {showMyprojects && <ShowMyprojects />}
                {showPortfolio && <ShowPortfolio />}
                {showFeedback && <ShowFeedback />}
                {showReview && <ShowReview />}
                </Col>
            </Row>
        </Container>
            
        </Row>
        </Container>
    );
}

export default VendorSection;
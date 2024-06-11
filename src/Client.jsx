import React from "react";
import { Navbar,Row,Col,Container } from "react-bootstrap";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";
import ResultList from "./components/ResultList";
import Eventform from "./components/Eventform";
import PostedEvents from "./components/OngoingEvents";
import ClientMenu from "./components/ClientMenu";
function Client()
{
    const [showAddevent,setshowAddevent]=React.useState(false);
    const [showDashboard,setshowDashboard]=React.useState(false);
    const [user_id, setUser_id] = React.useState(null);
    const [showPostedEvents,setshowPostedEvents]=React.useState(false);
    const[searchResult,showsearchResult]=React.useState([]);
    const[inputValue,setinputValue]=React.useState("");
    const[showList,setshowList]=React.useState(false);
    //const showList = React.useRef(false);


        React.useEffect(() => {
            const fetchSession = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user');
                console.log(response);
                if(response.data.status=="Authenticated"){
                    setUser_id(response.data.id);
                    localStorage.setItem('token',response.data.id);
                    //console.log(user_id);
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
    
        React.useEffect(() => {

            function handleClickOutside(event)
            {
            if(showList && !event.target.classList.contains("forminput"))
            {
                setshowList(false);
                console.log(showList);

            }
            }
            document.addEventListener("click",handleClickOutside);
        });

    return(
        <div>
        <Container fluid>
        <Row>
        <Col className="bg-body-tertiary">
        <Navbar>
          <Navbar.Brand href="#home"><h2>Brand Name</h2></Navbar.Brand>
        </Navbar>
        </Col>
        </Row>
        <Row>
            <Col  className="justify-content-start">
            <ClientMenu 
                setshowAddevent={setshowAddevent}
                setshowDashboard={setshowDashboard}
                setshowPostedEvents={setshowPostedEvents}
            />
            </Col>
            <Col xs={3} className="justify-content-end mt-2">
            <Searchbar 
            showsearchResult={showsearchResult}
            inputValue={inputValue}
            setinputValue={setinputValue}
            setshowList={setshowList}
            />
            {showList && <ResultList 
              results={searchResult}
              setinputValue={setinputValue}
            />}
          </Col>
        </Row>
        {showAddevent&&<Eventform />}
        {showDashboard&&<Dashboard />}
        {showPostedEvents&&<PostedEvents 
            user_id={user_id}
        />}
        </Container>
        <Footer />
        </div>
    );
}

export default Client;
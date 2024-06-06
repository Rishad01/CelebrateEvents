import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {Row,Col} from 'react-bootstrap';
import Searchbar from "./Searchbar";
import ResultList from "./ResultList"
//import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

function NavHeading()
{

  const[searchResult,showsearchResult]=React.useState([]);
  const[inputValue,setinputValue]=React.useState("");
  const[showList,setshowList]=React.useState(false);
  //const showList = React.useRef(false);
  
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
   
  const navigate=useNavigate();
  
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
          <Nav activeKey="/home">
            <Nav.Item>
              <Nav.Link onClick={()=>navigate('/vendor')} >I'm a Vendor</Nav.Link>
            </Nav.Item>
          </Nav>
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
        </Container>
      </div>
    );
}

export default NavHeading
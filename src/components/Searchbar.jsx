import React from "react";
import {Form} from "react-bootstrap";


const info=['abc','abcd','xyz','mno','mnnpo'];

function Searchbar(props)
{
    //const[showInput,setshowInput]=React.useState("");

    function find(value)
    {
        let result=info.filter((vendor)=>{
            return(
                value&&vendor.includes(value)
            );
        });

        props.showsearchResult(result);
    }

    function handleonChange(value)
    {
        
        props.setinputValue(value);
        find(value);
    }

    function handleInputClick() {
        //console.log(props.showList);
        props.setshowList(true);
    }

    return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Control className="forminput" value={props.inputValue} type="text" placeholder="Search your vendor..." onClick={handleInputClick} onChange={(e)=>handleonChange(e.target.value)}/>
      </Form.Group>
    </Form>
    );
}

export default Searchbar;
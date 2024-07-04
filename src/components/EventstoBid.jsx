import React from "react";
import BidCard from "./BidCard";
import axios from "axios";

function Bids()
{
    const[checkEvent,setcheckEvent]=React.useState(false);
    const[postedEvents,setpostedEvents]=React.useState([]);
    React.useEffect(()=>{
        const fetchData=async ()=>{
        try{
            const response=await axios.get('http://localhost:5000/vendor/postedEvents');
            console.log(response);
                if(response.data.message=='success'){
                    setcheckEvent(true);
                    setpostedEvents(response.data.events);
                }
                else
                    console.log(response.message);
        }
        catch(error){
                console.error(error);
        }
    }
        fetchData();
    },[]);

    return(checkEvent?
        postedEvents.map((event,index)=>
        <BidCard
          key={index}
          event_id={event.event_id}
          name={event.event}
          date={event.date.slice(0,10)}
          location={event.location}
          budget={event.budget} 
          description={event.descr} 
          time={event.time}
          guestNum={event.guestNum}
        />
        ):<h4>No event to bid on!</h4>
    );
}

export default Bids;
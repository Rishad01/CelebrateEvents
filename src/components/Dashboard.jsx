import React from "react";
import WOW from "wowjs";
import EventCard from "./EventCard";
import event_data from "./event_data";
import bid_data from "./bid_data";

function Dashboard()
{
    React.useEffect(()=>{
        const wow = new WOW.WOW();
        wow.init();
    },[]);

    return(
    <div className="wow slideInLeft m-2">
    {event_data.map(event=>(
        <EventCard 
            key={event.id}
            name={event.name}
            date={event.date}
            location={event.location}
            budget={event.budget}
        />
    ))}
    </div>
    );
}

export default Dashboard;
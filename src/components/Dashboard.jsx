import React from "react";
import WOW from "wowjs";
import EventCard from "./EventCard";

function Dashboard()
{
    React.useEffect(()=>{
        const wow = new WOW.WOW();
        wow.init();
    },[]);

    return(
    <div className="wow slideInLeft m-2">
    
        <EventCard 
            
        />
    </div>
    );
}

export default Dashboard;
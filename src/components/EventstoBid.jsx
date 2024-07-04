import React from "react";
import BidCard from "./BidCard";
import axios from "axios";
const event_data=[
    {
        name:"Birthday",
        date:"01-01-2001",
        location:"Lucknow",
        budget:5000,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Purus semper eget duis at tellus at urna. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Bibendum enim facilisis gravida neque convallis a cras. Ipsum consequat nisl vel pretium. Fermentum et sollicitudin ac orci phasellus. Blandit aliquam etiam erat velit. Enim lobortis scelerisque fermentum dui faucibus in ornare. Risus pretium quam vulputate dignissim suspendisse in est ante. Massa sapien faucibus et molestie. Nunc congue nisi vitae suscipit. Pellentesque habitant morbi tristique senectus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Id leo in vitae turpis massa sed elementum. Ullamcorper morbi tincidunt ornare massa eget."
    },{
        name:"Wedding",
        date:"02-02-2002",
        location:"Kolkata",
        budget:100000,
        description:"Ante metus dictum at tempor commodo. Sed risus pretium quam vulputate dignissim suspendisse in est. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Amet dictum sit amet justo donec. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Nulla aliquet enim tortor at. Ut morbi tincidunt augue interdum velit. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Augue mauris augue neque gravida in fermentum et sollicitudin. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Elit pellentesque habitant morbi tristique senectus et netus. Adipiscing elit ut aliquam purus sit. Volutpat odio facilisis mauris sit. Scelerisque viverra mauris in aliquam sem. Augue neque gravida in fermentum et. Aliquet lectus proin nibh nisl condimentum id."
    },{
        name:"Promotion Party",
        date:"03-03-2003",
        location:"Lucknow",
        budget:100000,
        description:"Erat velit scelerisque in dictum non consectetur a erat. Imperdiet nulla malesuada pellentesque elit eget. Placerat vestibulum lectus mauris ultrices eros in cursus. Egestas sed sed risus pretium quam. Felis bibendum ut tristique et egestas quis. Egestas pretium aenean pharetra magna. Vitae congue mauris rhoncus aenean vel elit. Commodo sed egestas egestas fringilla. A erat nam at lectus urna duis convallis. Eros donec ac odio tempor orci dapibus ultrices in. Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. In fermentum et sollicitudin ac orci. Turpis egestas integer eget aliquet nibh praesent tristique magna. Tristique senectus et netus et. Dapibus ultrices in iaculis nunc sed augue. Donec et odio pellentesque diam volutpat commodo sed egestas. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Porttitor leo a diam sollicitudin tempor id. Nibh praesent tristique magna sit amet. Consectetur a erat nam at lectus urna duis."
    },{
        name:"Festival Celebration",
        date:"04-04-2004",
        location:"xyz",
        budget:20000,
        description:"Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Felis imperdiet proin fermentum leo vel orci porta non. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Ut tellus elementum sagittis vitae. Viverra mauris in aliquam sem fringilla. Quisque non tellus orci ac auctor augue. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Ullamcorper a lacus vestibulum sed arcu non odio euismod. Vitae purus faucibus ornare suspendisse sed. Sit amet porttitor eget dolor. Fermentum leo vel orci porta non pulvinar neque laoreet. Id diam vel quam elementum pulvinar etiam non. In est ante in nibh mauris. Bibendum ut tristique et egestas quis. Tincidunt praesent semper feugiat nibh sed pulvinar. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Mollis nunc sed id semper risus in hendrerit gravida. Felis imperdiet proin fermentum leo vel orci. A erat nam at lectus. Amet mauris commodo quis imperdiet massa tincidunt nunc."
    }
];

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
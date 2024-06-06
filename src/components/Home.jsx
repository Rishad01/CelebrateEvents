import React from "react";
import NavHeading from "./header";
import MainBody from "./mainbody";
import Vendors from "./vendors";
import Examples from "./Examples";
import Footer from "./Footer";
function Home()
{
    return(
            <div>
        <NavHeading />
        <MainBody />
        <br></br>
        <br></br>
        <Vendors />
        <br></br>
        <br></br>
        <Examples />
        <Footer />
        </div>
    );
}

export default Home;
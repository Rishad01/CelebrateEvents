import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route, Routes} from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from './components/Home';
import reportWebVitals from "./reportWebVitals";
import Client from './Client';
import VendorPage from './vendorPage';
import VendorSection from './VendorSection';
import Proposal from './proposal';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/client" element={<Client />} />
            <Route path="/vendor" element={<VendorPage />} />
            <Route path="/vendorSection" element={<VendorSection />} />
            <Route path="/proposal" element={<Proposal />} />

    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

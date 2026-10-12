import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Feedback from "./components/Feedback.jsx";
import Map from "./components/Map.jsx";
import Footer from "./components/Footer.jsx";
import Nav from "./components/Nav.jsx";
import Contact from "./components/Contact.jsx";
import Equipment from "./components/Equipment.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Nav />
    <Home />
    <Feedback />
    <Footer />
  </StrictMode>,
);

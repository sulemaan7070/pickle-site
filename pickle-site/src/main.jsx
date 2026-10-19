import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Nav from "./components/Nav.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Nav />
    <Home />
  </StrictMode>,
);

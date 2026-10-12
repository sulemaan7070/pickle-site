import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { ImLocation2 } from "react-icons/im";
function Map() {
  return (
    <div className="h-[50vh] lg:h-screen relative flex">
      <div className="w-[50%] overflow-hidden ">
        <MapContainer
          center={[14.754419824099354, 78.55434815620328]}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[14.754419824099354, 78.55434815620328]}>
            <Popup>
              This is where we are <br /> located.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div id="location" className="w-[50%] px-3 text-2xl my-auto ">
        our services are available at{" "}
        <span className="text-blue-500">
          {" "}
          Proddatur <ImLocation2 className="inline text-red-500 text-3xl" />
        </span>{" "}
        516360
      </div>
    </div>
  );
}

export default Map;

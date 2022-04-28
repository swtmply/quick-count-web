/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LatLngExpression } from "leaflet";

const geoURL =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/philippines/philippines-provinces.json";

const position = [51.505, -0.09] as LatLngExpression;

const Map = () => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      className="min-h-screen w-[100vw]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

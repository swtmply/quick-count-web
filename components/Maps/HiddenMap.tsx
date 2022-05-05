import React, { useCallback } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const HiddenMap = () => {
  return (
    <MapContainer
      center={[12, 122]}
      zoom={6}
      dragging={false}
      scrollWheelZoom={false}
      zoomControl={false}
      doubleClickZoom={false}
    ></MapContainer>
  );
};

export default HiddenMap;

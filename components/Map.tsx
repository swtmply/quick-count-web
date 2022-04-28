/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LatLngExpression } from "leaflet";

import json from "../public/data/ph-regions.json";
import { GeoJsonObject } from "geojson";

const geoURL =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/philippines/philippines-provinces.json";

const position = [120.984222, 14.599512] as LatLngExpression;

const Map = () => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      className="min-h-screen w-[100vw]"
    >
      <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png" />
      <GeoJSON
        data={json as GeoJsonObject}
        // onEachFeature={this.onEachFeature}
      ></GeoJSON>
    </MapContainer>
  );
};

export default Map;

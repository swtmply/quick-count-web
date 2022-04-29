/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useCallback } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import json from "../public/data/ph-provinces.json";
import { GeoJsonObject } from "geojson";
import { Layer } from "leaflet";

const countryStyle = {
  color: "black",
  fillColor: "blue",
  weight: 0.5,
  fillOpacity: 0.2,
};

export interface Votes {
  province: string;
  candidate_name: string;
  submitted_vote: number;
}

const Map = ({ votes }: { votes: Votes[] }) => {
  const onEachFeature = useCallback((feature, layer: Layer) => {
    const provinceName = feature.properties.PROVINCE;
    layer.bindTooltip(provinceName);

    layer.on({
      mouseover: (event: any) => {
        layer.openTooltip();

        event.target.setStyle({
          fillColor: "blue",
          fillOpacity: 0.6,
        });
      },
      mouseout: (event: any) => {
        event.target.setStyle(countryStyle);
      },
    });
  }, []);

  return (
    <MapContainer
      center={[12, 122]}
      zoom={6}
      className="min-h-screen w-[100vw]"
      dragging={false}
      scrollWheelZoom={false}
      zoomControl={false}
      doubleClickZoom={false}
    >
      <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png" />
      <GeoJSON
        style={(feature) => {
          const data = votes.find(
            (vote) =>
              vote.province.toLowerCase() ===
              feature?.properties.PROVINCE.toLowerCase()
          );

          if (data)
            return {
              fillColor: "#7480EC",
              fillOpacity: 1,
              weight: 0.5,
              color: "black",
            };

          return countryStyle;
        }}
        data={json as GeoJsonObject}
        onEachFeature={onEachFeature}
      ></GeoJSON>
    </MapContainer>
  );
};

export default Map;

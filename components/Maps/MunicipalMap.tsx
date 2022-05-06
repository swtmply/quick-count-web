/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useCallback, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import json from "../../public/data/ph-municipals.json";
import { GeoJsonObject } from "geojson";
import { LatLngTuple, Layer } from "leaflet";
import { getColor, getPresidentColor } from "../../lib/constants";
import { Municipal } from "../../pages/map/president/[region]/[province]";

const countryStyle = {
  color: "black",
  weight: 0.5,
  fillColor: "white",
  fillOpacity: 1,
};

export interface Votes {
  [x: string]: any;
  mun_name: string;
  candidate_name: string;
  submitted_vote: number;
  candidate_id: string;
}

const MunicipalMap = ({ votes, type }: { votes: Votes[]; type: string }) => {
  const onEachFeature = useCallback((feature, layer: Layer) => {
    const municipal = feature?.properties.MUNICIPAL;

    layer.bindTooltip(municipal);

    const data = votes.find(
      (vote) => municipal.toLowerCase() === vote.mun_name.toLowerCase()
    );

    layer.bindTooltip(
      `
      ${municipal}${data ? `, Votes: ${data?.submitted_vote}` : ""}
      `
    );

    layer.on({
      mouseover: (event: any) => {
        layer.openTooltip();
      },
    });
  }, []);

  return (
    <MapContainer
      center={[14.564, 121.03]}
      zoom={11}
      className="min-h-screen w-[50vw] !bg-white"
      dragging={false}
      scrollWheelZoom={false}
      zoomControl={false}
      doubleClickZoom={false}
    >
      <GeoJSON
        style={(feature) => {
          const municipal = feature?.properties.MUNICIPAL;

          const data = votes.find(
            (vote) => municipal.toLowerCase() === vote.mun_name.toLowerCase()
          );

          if (data)
            return {
              fillColor: getPresidentColor(data.candidate_id),
              fillOpacity: 1,
              weight: 0.5,
              color: "black",
            };

          return countryStyle;
        }}
        data={json as unknown as GeoJsonObject}
        onEachFeature={onEachFeature}
      ></GeoJSON>
    </MapContainer>
  );
};

export default MunicipalMap;

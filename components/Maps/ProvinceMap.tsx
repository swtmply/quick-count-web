/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useCallback, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import json from "../../public/data/ph-provinces.json";
import { GeoJsonObject } from "geojson";
import { LatLngTuple, Layer } from "leaflet";
import { getColor } from "../../lib/constants";
import { useRouter } from "next/router";

const countryStyle = {
  color: "black",
  weight: 0.5,
  fillColor: "#FFFDFD",
};

const regionsCenter = (region: string) => {
  if (region === "01") return { center: [17, 120.5], zoom: 8 };
  if (region === "02") return { center: [18, 121.5], zoom: 7 };
  if (region === "03") return { center: [15.5, 121], zoom: 8 };
  if (region === "4a") return { center: [14, 121.5], zoom: 8 };
  if (region === "4b") return { center: [11, 120], zoom: 7 };
  if (region === "05") return { center: [13.2, 123.3], zoom: 8 };
  if (region === "06") return { center: [10.8, 122.7], zoom: 8 };
  if (region === "07") return { center: [10.2, 123.8], zoom: 8 };
  if (region === "08") return { center: [11.2, 125], zoom: 8 };
  if (region === "09") return { center: [7.5, 122.5], zoom: 8 };
  if (region === "10") return { center: [8, 124.5], zoom: 8 };
  if (region === "11") return { center: [7, 126], zoom: 8 };
  if (region === "12") return { center: [6.7, 124.7], zoom: 8 };
  if (region === "13") return { center: [9, 125.7], zoom: 8 };
  if (region === "NCR") return { center: [14.5, 121], zoom: 10 };
  if (region === "CAR") return { center: [17.2, 121], zoom: 8 };
  if (region === "ARMM") return { center: [6.4, 121.5], zoom: 8 };
  else return { center: [19, 120], zoom: 7 };
};

export interface Votes {
  prov_name: string;
  candidate_name: string;
  submitted_vote: number;
  region_code: string;
  candidate_id: string;
}

const Map = ({ votes, regions }: { votes: Votes[]; regions: any }) => {
  const router = useRouter();

  const onEachFeature = useCallback((feature, layer: Layer) => {
    const provinceName = feature.properties.PROVINCE;
    layer.bindTooltip(provinceName);

    const data = votes.find(
      (vote) =>
        vote.prov_name.toLowerCase() ===
        feature.properties.PROVINCE.toLowerCase()
    );

    layer.bindTooltip(
      `
      ${provinceName}${data ? `, Votes: ${data?.submitted_vote}` : ""}
      `
    );

    layer.on({
      mouseover: (event: any) => {
        layer.openTooltip();
      },
    });
  }, []);

  const [mapData] = useState(() => {
    const data = regions
      .map((region: any) => {
        const province = (json as any).features.find((feature: any) => {
          const ncr = region.province.includes("NCR");
          const NCR = ncr ? "metropolitan manila" : null;
          const provinceName = feature?.properties.PROVINCE;

          const regExp = /\(([^)]+)\)/;
          const matches = regExp.exec(region.province);

          if (NCR) return NCR === provinceName.toLowerCase();

          if (matches !== null) {
            return (
              provinceName.toLowerCase().includes(matches![1].toLowerCase()) ||
              matches![1].toLowerCase().includes(provinceName.toLowerCase())
            );
          }

          return region.province.toLowerCase() === provinceName.toLowerCase();
        });

        return province;
      })
      .filter((e: any) => e !== undefined);

    return data;
  });

  return (
    <MapContainer
      center={regionsCenter(regions[0].reg_id).center as LatLngTuple}
      zoom={regionsCenter(regions[0].reg_id).zoom}
      className="min-h-screen grow !bg-white"
      dragging={false}
      scrollWheelZoom={false}
      zoomControl={false}
      doubleClickZoom={false}
    >
      <GeoJSON
        style={(feature) => {
          const data = votes.find((vote) => {
            const ncr = vote.prov_name.includes("NCR");
            const NCR = ncr ? "metropolitan manila" : null;
            const provinceName = feature?.properties.PROVINCE;

            if (NCR) {
              return NCR === provinceName.toLowerCase();
            }

            return (
              NCR ||
              vote.prov_name.toLowerCase() ===
                feature?.properties.PROVINCE.toLowerCase()
            );
          });

          if (data)
            return {
              fillColor: getColor(data.submitted_vote),
              fillOpacity: 1,
              weight: 0.5,
              color: "black",
            };

          return countryStyle;
        }}
        data={mapData as GeoJsonObject}
        onEachFeature={onEachFeature}
      ></GeoJSON>
    </MapContainer>
  );
};

export default Map;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useCallback } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import json from "../../public/data/ph-regions.json";
import { GeoJsonObject } from "geojson";
import { Layer } from "leaflet";
import { useRouter } from "next/router";
import { getColor } from "../../lib/constants";

const countryStyle = {
  color: "black",
  weight: 0.5,
  fillColor: "#FFFDFD",
};

export interface Votes {
  region: string;
  candidate_name: string;
  submitted_vote: number;
  region_code: string;
  candidate_id: string;
  region_name: string;
  province_name?: string;
  mun_name?: string;
}

const RegionMap = ({ votes }: { votes: Votes[] }) => {
  const router = useRouter();

  const onEachFeature = useCallback((feature, layer: Layer) => {
    const regionName = feature.properties.REGION;
    const data = votes.find((vote) => {
      const regExp = /\(([^)]+)\)/;
      const matches = regExp.exec(vote.region);

      const ncr = vote.region.includes("NCR");
      const NCR = ncr ? "metropolitan manila" : null;

      if (NCR) {
        return NCR === regionName.toLowerCase();
      }

      return (
        NCR || regionName.toLowerCase().includes(matches![1].toLowerCase())
      );
    });

    layer.bindTooltip(`${regionName}, Votes: ${data?.submitted_vote || 0}`);

    layer.on({
      mouseover: (event: any) => {
        layer.openTooltip();
      },
      click: () => {
        if (data?.region_code === "NCR") {
          router.push(`/map/regions/${data.candidate_id}/NCR`);
        } else {
          if (data)
            router.push(
              `/map/regions/${data.candidate_id}/${data?.region_code}`
            );
        }
      },
    });
  }, []);

  return (
    <MapContainer
      center={[12, 122]}
      zoom={6}
      className="min-h-screen grow !bg-white"
      dragging={false}
      scrollWheelZoom={false}
      zoomControl={false}
      doubleClickZoom={false}
    >
      <GeoJSON
        style={(feature) => {
          const data = votes.find((vote) => {
            const regionName = feature?.properties.REGION;

            const ncr = vote.region.includes("NCR");
            const NCR = ncr ? "metropolitan manila" : null;

            if (NCR) {
              return NCR === feature?.properties.REGION.toLowerCase();
            }

            const regExp = /\(([^)]+)\)/;
            const matches = regExp.exec(vote.region);

            return (
              NCR ||
              regionName.toLowerCase().includes(matches![1].toLowerCase())
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
        data={json as GeoJsonObject}
        onEachFeature={onEachFeature}
      ></GeoJSON>
    </MapContainer>
  );
};

export default RegionMap;

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
import { getPresidentColor } from "../../lib/constants";
import { Votes } from "./RegionMap";

const countryStyle = {
  color: "black",
  weight: 0.5,
  fillColor: "#FFFDFD",
};

const PresidentMap = ({ votes }: { votes: Votes[] }) => {
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
        event.target.setStyle({
          fillColor: getPresidentColor(data?.candidate_id || ""),
        });
      },
      mouseout: (event: any) => {
        event.target.setStyle({
          fillColor: getPresidentColor(data?.candidate_id || ""),
        });
      },
      click: () => {
        if (data) router.push(`/map/president/${data?.region_code}`);
      },
    });
  }, []);

  return (
    <MapContainer
      center={[12, 122]}
      zoom={6}
      className="min-h-screen w-[50vw] !bg-white"
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
              fillColor: getPresidentColor(data.candidate_id),
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

export default PresidentMap;

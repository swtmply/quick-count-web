/* eslint-disable @next/next/no-sync-scripts */
import dynamic from "next/dynamic";
import React from "react";

const geoURL =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/philippines/philippines-provinces.json";

const Chart = () => {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
};

export default Chart;

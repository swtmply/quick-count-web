import React from "react";

const Legend = () => {
  return (
    <div className="grid grid-cols-5 w-10/12 h-20">
      <div className="bg-[#FFFDFD]" />
      <div className="bg-[#FEE2E2]" />
      <div className="bg-[#FDB5B5]" />
      <div className="bg-[#FC7676]" />
      <div className="bg-[#FB3939]" />
      <p>0</p>
      <p>50-99</p>
      <p>100-199</p>
      <p>200-299</p>
      <p>300+</p>
    </div>
  );
};

export const PresidentLegend = () => {
  return (
    <div className="grid grid-cols-5 w-10/12 h-20 mb-8">
      <div className="bg-[#FB3939]" />
      <div className="bg-[#FD3595]" />
      <div className="bg-[#6D96FF]" />
      <div className="bg-[#002FA8]" />
      <div className="bg-[#102354]" />
      <p>Ferdinand Marcos Jr.</p>
      <p>Leni Robredo</p>
      <p>Isko Moreno</p>
      <p>Manny Pacquiao</p>
      <p>Ping Lacson</p>
    </div>
  );
};

export default Legend;

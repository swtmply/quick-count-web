import Image from "next/image";
import React from "react";

const PHIcon = () => {
  return (
    <div className="w-8 h-8 relative flex justify-center items-center">
      <Image
        src="/icons/philippines.svg"
        alt=""
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default PHIcon;

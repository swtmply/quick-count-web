import Link from "next/link";
import React from "react";

const Legend = () => {
  return (
    <div className="grid grid-cols-1 w-full mb-8 auto-rows-fr gap-4 text-sm">
      <div>
        <div className="bg-[#fff6f6] h-8" />
        <p>0 - 2500000</p>
      </div>
      <div>
        <div className="bg-[#FEE2E2] h-8" />
        <p>2500001 - 5000000</p>
      </div>
      <div>
        <div className="bg-[#FDB5B5] h-8" />
        <p>5000001 - 7500000</p>
      </div>
      <div>
        <div className="bg-[#FC7676] h-8" />
        <p>7500001 - 1000000</p>
      </div>
      <div>
        <div className="bg-[#FB3939] h-8" />
        <p>1000000+</p>
      </div>
    </div>
  );
};

export const PresidentLegend = () => {
  return (
    <div className="grid grid-cols-1 w-full mb-8 auto-rows-fr gap-4 text-sm">
      <Link href="/map/PR_7" passHref>
        <a>
          <div className="bg-[#E6140A] h-8" />
          <p>Ferdinand Marcos Jr.</p>
        </a>
      </Link>
      <Link href="/map/PR_10" passHref>
        <a>
          <div className="bg-[#FD3595] h-8" />
          <p>Leni Robredo</p>
        </a>
      </Link>
      <Link href="/map/PR_3" passHref>
        <a>
          <div className="bg-[#6D96FF] h-8" />
          <p>Francisco Moreno</p>
        </a>
      </Link>
      <Link href="/map/PR_9" passHref>
        <a>
          <div className="bg-[#002FA8] h-8" />
          <p>Emmanuel Pacquiao</p>
        </a>
      </Link>
      <Link href="/map/PR_5" passHref>
        <a>
          <div className="bg-[#102354] h-8" />
          <p>Panfilo Lacson</p>
        </a>
      </Link>
    </div>
  );
};

export const VicePresidentLegend = () => {
  return (
    <div className="grid grid-cols-1 w-full mb-8 auto-rows-fr gap-4 text-sm">
      <Link href="/map/VP_4" passHref>
        <a>
          <div className="bg-[#18A821] h-8" />
          <p>Sara Duterte</p>
        </a>
      </Link>
      <Link href="/map/VP_7" passHref>
        <a>
          <div className="bg-[#FD3595] h-8" />
          <p>Kiko Pangilinan</p>
        </a>
      </Link>
      <Link href="/map/VP_6" passHref>
        <a>
          <div className="bg-[#6D96FF] h-8" />
          <p>Willie Ong</p>
        </a>
      </Link>
      <Link href="/map/VP_1" passHref>
        <a>
          <div className="bg-[#002FA8] h-8" />
          <p>Lito Atienza</p>
        </a>
      </Link>
      <Link href="/map/VP_9" passHref>
        <a>
          <div className="bg-[#102354] h-8" />
          <p>Vicente Sotto</p>
        </a>
      </Link>
    </div>
  );
};

export default Legend;

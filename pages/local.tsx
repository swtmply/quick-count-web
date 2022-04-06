import React from "react";
import CandidateList from "../components/CandidateList";
import { Layout } from "../components/Layout";
import VoteTab from "../components/VoteTab";
import { presidentialCandidates } from "../lib/constants";
import { TabProps } from "../types";

export default function Local() {
  const tabs: TabProps[] = [
    {
      position: "Governor",
      content: <CandidateList candidates={presidentialCandidates} />,
    },
    {
      position: "Vice Governor",
      content: <CandidateList candidates={presidentialCandidates} />,
    },
    {
      position: "House of Representative",
      content: <CandidateList candidates={presidentialCandidates} />,
    },
    {
      position: "Team Member",
      content: <CandidateList candidates={presidentialCandidates} />,
    },
  ];
  return (
    <Layout>
      <h1 className="font-bold text-3xl col-span-full my-8">Local</h1>
      <VoteTab tabs={tabs} />
    </Layout>
  );
}

import React from "react";
import CandidateList from "../components/CandidateList";
import { Layout } from "../components/Layout";
import VoteTab from "../components/VoteTab";
import { presidentialCandidates } from "../lib/constants";
import { TabProps } from "../types";

export default function Local() {
  const tabs: TabProps[] = [
    {
      title: "Governor",
      content: (
        <CandidateList
          candidates={presidentialCandidates}
          progressBarColor="bg-[#1774D1]"
        />
      ),
    },
    {
      title: "Vice Governor",
      content: (
        <CandidateList
          candidates={presidentialCandidates}
          progressBarColor="bg-[#D11717]"
        />
      ),
    },
    {
      title: "House of Representative",
      content: (
        <CandidateList
          candidates={presidentialCandidates}
          progressBarColor="bg-gradient-to-r from-[#5383FF] to-[#F153FF]"
        />
      ),
    },
    {
      title: "Team Member",
      content: (
        <CandidateList
          candidates={presidentialCandidates}
          progressBarColor="bg-gradient-to-r from-[#F65858] to-[#F4B02D]"
        />
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="font-bold text-3xl col-span-full my-8">Local</h1>
      <VoteTab tabs={tabs} />
    </Layout>
  );
}

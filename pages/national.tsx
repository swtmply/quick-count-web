import React from "react";
import CandidateList from "../components/CandidateList";
import { Layout } from "../components/Layout";
import VoteTab from "../components/VoteTab";
import { presidentialCandidates } from "../lib/constants";
import { TabProps } from "../types";

export default function National() {
  const tabs: TabProps[] = [
    {
      title: "President",
      content: (
        <CandidateList
          candidates={presidentialCandidates}
          progressBarColor="bg-[#1774D1]"
        />
      ),
    },
    {
      title: "Vice President",
      content: (
        <CandidateList
          candidates={presidentialCandidates}
          progressBarColor="bg-[#D11717]"
        />
      ),
    },
    {
      title: "Senator",
      content: (
        <CandidateList
          candidates={presidentialCandidates}
          progressBarColor="bg-gradient-to-r from-[#5383FF] to-[#F153FF]"
        />
      ),
    },
    {
      title: "Partylist",
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
      <h1 className="font-bold text-3xl col-span-full my-8">National</h1>

      <VoteTab tabs={tabs} />
    </Layout>
  );
}

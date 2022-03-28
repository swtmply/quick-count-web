import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { useState } from "react";
import BigCard from "../components/Cards/BigCard";
import FloatingCard from "../components/Cards/FloatingCard";
import SmallCard from "../components/Cards/SmallCard";
import { Layout } from "../components/Layout";
import { cardProgressBarColors } from "../lib/constants";
import { Candidate } from "../types";

const presidentialCandidates: Candidate[] = [
  { name: "Marcos, BabyM <3", votes: 100000000, votePercentage: 78 },
  { name: "Robredo, Leni", votes: 80000000, votePercentage: 73 },
  { name: "Moreno, Iskor", votes: 20000000, votePercentage: 20 },
];

const Home: NextPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <Layout>
      <h1 className="font-bold text-3xl col-span-full my-8">
        Live counting of votes
      </h1>
      <motion.div className="col-span-full grid grid-cols-12 auto-rows-max gap-2">
        <BigCard
          setSelectedCard={setSelectedCard}
          progressBarColor="bg-[#1774D1]"
          title="President"
          candidates={presidentialCandidates}
        />
        <SmallCard
          setSelectedCard={setSelectedCard}
          progressBarColor="bg-[#D11717]"
          title="Vice President"
          candidates={presidentialCandidates}
        />
        <SmallCard
          setSelectedCard={setSelectedCard}
          progressBarColor="bg-gradient-to-r from-[#5383FF] to-[#F153FF]"
          title="Senator"
          candidates={presidentialCandidates}
        />
        <BigCard
          setSelectedCard={setSelectedCard}
          progressBarColor="bg-gradient-to-r from-[#F65858] to-[#F4B02D]"
          title="Partylist"
          candidates={presidentialCandidates}
        />
      </motion.div>

      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/40 z-50 cursor-pointer flex justify-center items-center"
          onClick={() => setSelectedCard(null)}
        >
          <AnimatePresence>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              layoutId={selectedCard}
              className="p-4 bg-white rounded-md cursor-default"
            >
              <FloatingCard
                setSelectedCard={setSelectedCard}
                title={selectedCard}
                progressBarColor={
                  cardProgressBarColors[selectedCard].progressBarColor
                }
                candidates={presidentialCandidates}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </Layout>
  );
};

export default Home;

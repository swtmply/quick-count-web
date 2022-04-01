import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Card from "../components/Cards/Card";
import FloatingCard from "../components/Cards/FloatingCard";
import { Layout } from "../components/Layout";
import {
  cardProgressBarColors,
  presidentialCandidates,
} from "../lib/constants";

const Home: NextPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [candidates] = useState(presidentialCandidates);

  useEffect(() => {
    axios.get("/api/users").then((response) => console.log(response));
  }, []);

  return (
    <Layout>
      <h1 className="font-bold text-3xl col-span-full my-8">
        Live counting of votes
      </h1>
      <motion.div className="col-span-full grid grid-cols-12 auto-rows-max gap-2">
        <Card
          setSelectedCard={setSelectedCard}
          progressBarColor="bg-[#1774D1]"
          width="col-span-full"
          title="President"
          candidates={candidates.slice(0, 3)}
        />
        <Card
          setSelectedCard={setSelectedCard}
          progressBarColor="bg-[#D11717]"
          width="col-span-full"
          title="Vice President"
          candidates={candidates.slice(0, 3)}
        />
        <Card
          setSelectedCard={setSelectedCard}
          progressBarColor="bg-gradient-to-r from-[#5383FF] to-[#F153FF]"
          width="col-span-6"
          title="Senator"
          candidates={candidates}
        />
        <Card
          setSelectedCard={setSelectedCard}
          progressBarColor="bg-gradient-to-r from-[#F65858] to-[#F4B02D]"
          width="col-span-6"
          title="Partylist"
          candidates={candidates}
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
                width="col-span-full"
                title={selectedCard}
                progressBarColor={
                  cardProgressBarColors[selectedCard].progressBarColor
                }
                candidates={candidates}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </Layout>
  );
};

export default Home;

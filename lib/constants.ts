import { Candidate, CardProgressBarColors } from "../types";

export const cardProgressBarColors: CardProgressBarColors = {
  President: { progressBarColor: "bg-[#1774D1]" },
  "Vice President": { progressBarColor: "bg-[#D11717]" },
  Senator: { progressBarColor: "bg-gradient-to-r from-[#5383FF] to-[#F153FF]" },
  Partylist: {
    progressBarColor: "bg-gradient-to-r from-[#F65858] to-[#F4B02D]",
  },
};

export const presidentialCandidates: Candidate[] = [
  { name: "Marcos, BabyM <3", votes: 100000000, votePercentage: 40 },
  { name: "Robredo, Leni", votes: 80000000, votePercentage: 37 },
  { name: "Moreno, Iskor", votes: 20000000, votePercentage: 12 },
  { name: "Lacson, Jumping", votes: 1000000, votePercentage: 11 },
  { name: "De Guzman, Leody", votes: 120000, votePercentage: 10 },
  { name: "Pacquiao, Manny", votes: 100000, votePercentage: 9 },
  { name: "Gonzales, Norberto ", votes: 90000, votePercentage: 5 },
  { name: "Mangondato, Faisal", votes: 8000, votePercentage: 4 },
  { name: "Abella, Ernesto", votes: 1000, votePercentage: 2 },
  { name: "Montemayor, Jose Jr.", votes: 200, votePercentage: 1 },
];

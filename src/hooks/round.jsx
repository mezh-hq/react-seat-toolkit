import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const rounds = {
  "ROUND 01": 1,
  "FINAL": 2
};

const roundKeys = Object.keys(rounds);

const useRound = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [round, setRound] = useState(searchParams.get("round") || 1);
  const onRoundChange = (value) => {
    setRound(rounds[value]);
    setSearchParams({ ...searchParams, round: rounds[value] });
  };
  return { rounds: roundKeys, round, roundKey: roundKeys[round - 1], onRoundChange };
};

export default useRound;

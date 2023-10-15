import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useGhostLegion = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ghostLegion, setGhostLegion] = useState(searchParams.get("ghost_legion") === "true");
  const toggleGhostLegion = () => {
    setGhostLegion(!ghostLegion);
    searchParams.set("ghost_legion", !ghostLegion);
    setSearchParams(searchParams);
  };
  return { ghostLegion, toggleGhostLegion };
};

export default useGhostLegion;

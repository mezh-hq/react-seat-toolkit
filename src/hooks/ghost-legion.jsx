import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useGhostLegion = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ghostLegion, setGhostLegion] = useState(Boolean(searchParams.get("ghost_legion")));
  const toggleGhostLegion = () => {
    setGhostLegion(!ghostLegion);
    setSearchParams({ ghost_legion: !ghostLegion });
  };
  return { ghostLegion, toggleGhostLegion };
};

export default useGhostLegion;

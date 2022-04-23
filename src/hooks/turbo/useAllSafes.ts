import { useQuery } from "react-query";
import { getAllSafes } from "lib/turbo/fetchers/safes/getAllSafes";
import { getProvider } from "utils/web3Utils";

// Trusted Strategies will be independent of any Safe and whitelisted by TRIBE Governance
export const useAllSafes = (): any => {
  const { data: safeOwner } = useQuery(`All safes`, async () => {
    const provider = getProvider();
    const answer = await getAllSafes(provider, 1);
    return answer;
  });

  return safeOwner;
};

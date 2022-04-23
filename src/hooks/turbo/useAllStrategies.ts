import { useQuery } from "react-query";
import { getBoostableStrategies } from "lib/turbo/fetchers/strategies/getBoostableStrategies";
import { getProvider } from "utils/web3Utils";

// Trusted Strategies will be independent of any Safe and whitelisted by TRIBE Governance
export const useTrustedStrategies = (): string[] => {
  const { data: trustedStrategies } = useQuery(
    `Boostable strategies`,
    async () => {
      const provider = getProvider();
      return await getBoostableStrategies(provider, 1);
    }
  );

  return trustedStrategies ?? [];
};

import { useRari } from "context/RariContext";
import { isUserAuthorizedToCreateSafes } from "lib/turbo/fetchers/getIsUserAuthorizedToCreateSafes";
import { TurboAddresses } from "lib/turbo/utils/constants";
import { useQuery } from "react-query";

export const useIsUserAuthorizedToCreateSafes = (
  simulatedAddress?: string
) => {
  const { address, provider, chainId } = useRari();
  const _address = simulatedAddress ?? address;

  const { data: isAuthorized } = useQuery(
    `Is ${_address} authorized to create safes`,
    async () => {
      if (!_address || !chainId || !provider) return;

      const isAuthorized = await isUserAuthorizedToCreateSafes(
        provider,
        TurboAddresses[chainId].TURBO_AUTHORITY,
        _address,
        TurboAddresses[chainId].MASTER
      );

      return isAuthorized;
    }
  );

  return isAuthorized;
};

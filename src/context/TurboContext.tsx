import { useAllSafes } from "hooks/turbo/useAllSafes";
import useApprovedCollateral from "hooks/turbo/useApprovedCollateral";
import { useIsUserAuthorizedToCreateSafes } from "hooks/turbo/useIsUserAuthorizedToCreateSafes";
import { useTrustedStrategies } from "hooks/turbo/useTrustedStrategies";
import { useAllUserSafes } from "hooks/turbo/useUserSafes";
import { TokensDataMap, useTokensDataAsMap } from "hooks/useTokenData";
import { SafeInfo } from "lib/turbo/fetchers/safes/getSafeInfo";
import { TurboAddresses } from "lib/turbo/utils/constants";
import { createContext, useContext, ReactNode, useMemo } from "react";

type TurboContextData = {
  safes: SafeInfo[];
  allStrategies: string[];

  // Auth
  isUserAuthorized: boolean;
  isRouterAuthorized: boolean;

  // Approved Collateral
  approvedCollaterals: string[];
  collateralTokenData: TokensDataMap;
};

export const TurboContext = createContext<TurboContextData | undefined>(
  undefined
);

export const TurboProvider = ({ children }: { children: ReactNode }) => {
  /** General Safe Data **/
  const allSafes: string[] = useAllSafes();
  const allStrategies: string[] = useTrustedStrategies();
  const safes = useAllUserSafes();

  // Auth
  const isUserAuthorized = useIsUserAuthorizedToCreateSafes();
  const isRouterAuthorized = useIsUserAuthorizedToCreateSafes(
    TurboAddresses[1].ROUTER
  );

  const approvedCollaterals = useApprovedCollateral();
  const collateralTokenData = useTokensDataAsMap(approvedCollaterals);

  const value = useMemo<TurboContextData>(
    () => ({
      safes,
      allStrategies,
      isRouterAuthorized,
      isUserAuthorized,
      approvedCollaterals,
      collateralTokenData,
    }),
    [
      allSafes,
      allStrategies,
      isRouterAuthorized,
      isUserAuthorized,
      approvedCollaterals,
      collateralTokenData,
    ]
  );

  return (
    <TurboContext.Provider value={value}> {children} </TurboContext.Provider>
  );
};

export const useTurbo = () => {
  const turboSafeData = useContext(TurboContext);

  if (turboSafeData === undefined) {
    throw new Error(`useTurboSafe must be used within a TurboSafeProvider`);
  }

  return turboSafeData;
};

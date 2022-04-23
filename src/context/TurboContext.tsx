import { useAllSafes } from "hooks/turbo/useAllSafes";
import { useTrustedStrategies } from "hooks/turbo/useAllStrategies";
import { SafeInfo } from "lib/turbo/fetchers/safes/getSafeInfo";
import { createContext, useContext, ReactNode, useMemo } from "react";

type TurboContextData = {
  allSafes: string[];
  allStrategies: string[];
};

export const TurboContext = createContext<TurboContextData | undefined>(
  undefined
);

export const TurboProvider = ({ children }: { children: ReactNode }) => {
  /** General Safe Data **/
  const allSafes: string[] = useAllSafes();
  const allStrategies: string[] = useTrustedStrategies();

  const value = useMemo<TurboContextData>(
    () => ({
      allSafes,
      allStrategies,
    }),
    [allSafes, allStrategies]
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

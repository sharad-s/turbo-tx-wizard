import { providers } from "ethers";
import { createTurboBooster } from "../../utils/turboContracts";

export const getBoostableStrategies = async (
  provider: providers.Provider,
  chainID: number
) => {
  const turboBoosterContract = await createTurboBooster(provider, chainID);
  const boostableStrategies: string[] =
    await turboBoosterContract.callStatic.getBoostableVaults();
  return boostableStrategies;
};

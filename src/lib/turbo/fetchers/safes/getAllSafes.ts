import { providers } from "ethers";
import { createTurboMaster } from "../../utils/turboContracts";

export const getAllSafes = async (
  provider: providers.Provider,
  chainID: number
) => {
  let master = createTurboMaster(provider, chainID);
  try {
    let result: string[] = await master.callStatic.getAllSafes();
    return result;
  } catch (err) {
    throw err;
  }
};

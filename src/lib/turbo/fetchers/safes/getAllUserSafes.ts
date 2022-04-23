import { providers } from "ethers";
import { formatSafeInfo } from "./getSafeInfo";
import { createTurboLens } from "../../utils/turboContracts";

export const getAllUserSafes = async (
  provider: providers.Provider,
  user: string,
  chainID: number
) => {
  let lens = createTurboLens(provider, chainID);
  try {
    let result: any[] = await lens.callStatic.getAllUserSafes(user);
    const formattedResult = result.map(formatSafeInfo);
    return formattedResult;
  } catch (err) {
    console.log(err);
  }
};

import { Contract } from "ethers";

// ABIS
import TurboRouter from "../abi/TurboRouter.json";
import TurboMaster from "../abi/TurboMaster.json";
import ERC20 from "../abi/ERC20.json";
import CERC20 from "../abi/CERC20.json";
import CERC20Delegate from "../abi/CERC20Delegate.json";
import FuseERC4626 from "../abi/FuseERC4626.json";
import TurboComptroller from "../abi/comptroller.json";
import TurboLens from "../abi/TurboLens.json";
import TurboBooster from "../abi/TurboBooster.json";
import TurboSafe from "../abi/TurboSafe.json";
import TurboAuthority from "../abi/Authority.json";

// Fuse
import FusePoolLensSecondary from "../../esm/Fuse/contracts/abi/FusePoolLensSecondary.json";
import FusePoolLens from "../../esm/Fuse/contracts/abi/FusePoolLens.json";
import FusePoolDirectory from "../../esm/Fuse/contracts/abi/FusepoolDirectory.json";

// Utils
import { Interface } from "ethers/lib/utils";
import { TurboAddresses } from "../utils/constants";
import { providers } from "ethers";
import addresses from "../../esm/Fuse/addresses";

//** Contracts **/
export const createTurboRouter = async (
  provider: providers.JsonRpcProvider,
  id: number
) => {
  const turboRouterContract = new Contract(
    TurboAddresses[id].ROUTER,
    TurboRouter.abi,
    provider
  );
  return turboRouterContract;
};

export const createTurboMaster = (
  provider: any,
  id: number = 1
) => {
  const turboMasterContract = new Contract(
    TurboAddresses[id].MASTER,
    TurboMaster.abi,
    provider
  );

  return turboMasterContract;
};

export const createTurboComptroller = (
  provider: providers.Provider,
  id: number
) => {
  const turboRouterContract = new Contract(
    TurboAddresses[id].COMPTROLLER,
    TurboComptroller,
    provider
  );

  return turboRouterContract;
};

export const createTurboLens = (
  provider: providers.Provider,
  chainID: number
) => {
  const turboLens = new Contract(
    TurboAddresses[chainID].LENS,
    TurboLens.abi,
    provider
  );

  return turboLens;
};

export const createTurboBooster = (
  provider: providers.Provider,
  chainID: number
) => {
  const turboBoosterContract = new Contract(
    TurboAddresses[chainID].BOOSTER,
    TurboBooster.abi,
    provider
  );

  return turboBoosterContract;
};

export const createTurboSafe = (
  provider: providers.Provider,
  turboSafe: string
) => {
  const turboSafeContract = new Contract(turboSafe, TurboSafe.abi, provider);
  return turboSafeContract;
};

export const createTurboAuthority = async (
  provider: providers.BaseProvider,
  authorityAddress: string
) => {
  const turboAuthorityContract = new Contract(
    authorityAddress,
    TurboAuthority.abi,
    provider
  );

  return turboAuthorityContract;
};

/* Token Contracts */

export const createERC20 = (token: string, provider: providers.Provider) =>
  new Contract(token, ERC20.abi, provider);

export const createCERC20 = (
  provider: providers.Provider,
  tokenAddress: string
) => new Contract(tokenAddress, CERC20.abi, provider);

export const createCERC20Delegate = (
  provider: providers.Provider,
  tokenAddress: string
) => new Contract(tokenAddress, CERC20Delegate, provider);

export const createFuseERC4626 = (
  provider: providers.JsonRpcProvider,
  strategyAddress: string
) => {
  const FuseERC4626Contract = new Contract(
    strategyAddress,
    FuseERC4626,
    provider
  );

  return FuseERC4626Contract;
};

/** Lens **/

export const createFusePoolLensSecondary = (
  provider: providers.JsonRpcProvider,
  chainId: number = 1
) => {
  const addr = addresses[chainId].FUSE_POOL_LENS_SECONDARY_CONTRACT_ADDRESS;

  const fusePoolLensSecondary = new Contract(
    addr,
    FusePoolLensSecondary,
    provider
  );
  return fusePoolLensSecondary;
};

export const createFusePoolLens = (
  provider: providers.JsonRpcProvider,
  chainId: number = 1
) => {
  const addr = addresses[chainId].FUSE_POOL_LENS_CONTRACT_ADDRESS;
  const fusePoolLens = new Contract(addr, FusePoolLens, provider);
  return fusePoolLens;
};

export const createFusePoolDirectory = (
  provider: providers.JsonRpcProvider,
  chainId: number = 1
) => {
  const addr = addresses[chainId].FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS;
  const fusePoolDir = new Contract(addr, FusePoolDirectory, provider);
  return fusePoolDir;
};

/** Interfaces **/

// Turbo Ifaces
export const ITurboRouter = new Interface(TurboRouter.abi);
export const ITurboMaster = new Interface(TurboMaster.abi);
export const ITurboComptroller = new Interface(TurboComptroller);
export const ITurboSafe = new Interface(TurboSafe.abi);
export const ITurboBooster = new Interface(TurboBooster.abi);
export const ITurboLens = new Interface(TurboLens.abi);
export const ITurboAuthority = new Interface(TurboAuthority.abi);

// Etc Ifaces
export const IERC20 = new Interface(ERC20.abi);
export const ICERC20 = new Interface(CERC20.abi);
export const ICERC20Delegate = new Interface(CERC20Delegate);
export const IFuseERC4626 = new Interface(FuseERC4626);

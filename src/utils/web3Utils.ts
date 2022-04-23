import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
export const alchemyURL = `https://eth-mainnet.alchemyapi.io/v2/2Mt-6brbJvTA4w9cpiDtnbTo6qOoySnN`;

export const getProvider = () => {
  return new JsonRpcProvider(alchemyURL);
};

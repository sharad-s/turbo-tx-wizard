import { BigNumber, Contract, constants } from "ethers";
import { parseEther, Interface } from "ethers/lib/utils";

export async function balanceOf(
  userAddress: string | undefined,
  underlyingAddress: string | undefined,
  signer: any
): Promise<BigNumber> {
  if (!userAddress || !underlyingAddress) return constants.Zero;
  if (isAssetETH(underlyingAddress)) return parseEther("0");

  const erc20Interface = new Interface([
    "function balanceOf(address _owner) public view returns (uint256 balance)",
  ]);

  const erc20Contract = new Contract(underlyingAddress, erc20Interface, signer);

  const balance: BigNumber = await erc20Contract.callStatic.balanceOf(
    userAddress
  );

  return balance;
}

const isAssetETH = (address: string) =>
  address === "0x0000000000000000000000000000000000000000";

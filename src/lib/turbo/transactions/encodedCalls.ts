import { BigNumber } from "ethers";
import { ITurboRouter } from "../utils/turboContracts";
import { encodeRouterCall } from "../utils/turboMulticall";

/** Create Safe **/
export type CreateSafeAndDepositArgs = [
  token: string,
  userAddress: string,
  amount: BigNumber,
  sharesRecieved: BigNumber
];
const createSafeAndDeposit = (
  token: string,
  userAddress: string,
  amount: BigNumber,
  sharesRecieved: BigNumber
) => {
  const createAndDepositArgs: CreateSafeAndDepositArgs = [
    token,
    userAddress,
    amount,
    sharesRecieved,
  ];
  return encodeRouterCall(
    ITurboRouter,
    "createSafeAndDeposit",
    createAndDepositArgs
  );
};

export type CreateSafeArgs = [token: string];

const createSafe = (underlyingToken: string) => {
  const createSafe: CreateSafeArgs = [underlyingToken];
  return encodeRouterCall(ITurboRouter, "createSafe", createSafe);
};

/** Boost / Less  **/
export type BoostAndLessArgs = [
  safe: string,
  strategy: string,
  amount: BigNumber
];
const boost = (safe: string, strategy: string, amount: BigNumber) => {
  const boostArgs: BoostAndLessArgs = [safe, strategy, amount];
  return encodeRouterCall(ITurboRouter, "boost", boostArgs);
};

const less = (safe: string, strategy: string, amount: BigNumber) => {
  const boostArgs: BoostAndLessArgs = [safe, strategy, amount];
  return encodeRouterCall(ITurboRouter, "less", boostArgs);
};

/** Deposit / Withdraw  **/
export type DepositAndWithdrawArgs = [
  safe: string,
  to: string,
  amount: BigNumber,
  minSharesOut: BigNumber
];
const deposit = (safe: string, to: string, amount: BigNumber) => {
  const depositArgs: DepositAndWithdrawArgs = [safe, to, amount, amount];
  return encodeRouterCall(ITurboRouter, "deposit", depositArgs);
};

const withdraw = (safe: string, to: string, amount: BigNumber) => {
  const depositArgs: DepositAndWithdrawArgs = [safe, to, amount, amount];
  return encodeRouterCall(ITurboRouter, "withdraw", depositArgs);
};

/** Slurp / Sweep  **/
export type SlurpArgs = [safe: string, strategy: string];
const slurp = (safe: string, strategy: string) => {
  const slurpArgs: SlurpArgs = [safe, strategy];
  return encodeRouterCall(ITurboRouter, "slurp", slurpArgs);
};

export type SweepArgs = [
  safe: string,
  recepient: string,
  tokenAddress: string,
  amount: BigNumber
];
const sweep = (
  safe: string,
  recepient: string,
  tokenAddress: string,
  amount: BigNumber
) => {
  const sweepArgs: SweepArgs = [safe, recepient, tokenAddress, amount];
  return encodeRouterCall(ITurboRouter, "sweep", sweepArgs);
};

export type SweepAllArgs = [
  safe: string,
  recepient: string,
  tokenAddress: string
];
const sweepAll = (safe: string, recepient: string, tokenAddress: string) => {
  const sweepAllArgs: SweepAllArgs = [safe, recepient, tokenAddress];
  return encodeRouterCall(ITurboRouter, "sweepAll", sweepAllArgs);
};

/** Periphery Payments  **/
export type PullTokenArgs = [
  token: string,
  amount: BigNumber,
  recipient: string
];
const pullTokens = (token: string, amount: BigNumber, recipient: string) => {
  const pullTokenArgs: PullTokenArgs = [token, amount, recipient];
  return encodeRouterCall(ITurboRouter, "pullToken", pullTokenArgs);
};

const encodeCall = {
  pullTokens,
  createSafeAndDeposit,
  createSafe,
  boost,
  less,
  deposit,
  withdraw,
  slurp,
  sweep,
  sweepAll,
};

export type TurboArgs =
  | CreateSafeAndDepositArgs
  | CreateSafeArgs
  | BoostAndLessArgs
  | DepositAndWithdrawArgs
  | SlurpArgs
  | SweepArgs
  | SweepAllArgs
  | PullTokenArgs;

export default encodeCall;

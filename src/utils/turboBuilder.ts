import {
  BoostAndLessArgs,
  CreateSafeArgs,
  DepositAndWithdrawArgs,
  PullTokenArgs,
  SlurpArgs,
  SweepArgs,
  TurboArgs,
} from "lib/turbo/transactions/encodedCalls";

export enum SafeActionType {
  PULL_TOKEN = "PULL TOKEN",
  CREATE_SAFE = "CREATE SAFE",
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  BOOST = "BOOST",
  LESS = "LESS",
  SLURP = "SLURP",
  SWEEP = "SWEEP",
}

export type SafeAction = {
  type: SafeActionType;
  callData: string;
};

export type TypesToArgs = {
  [SafeActionType.PULL_TOKEN]: PullTokenArgs;
  [SafeActionType.CREATE_SAFE]: CreateSafeArgs;
  [SafeActionType.DEPOSIT]: DepositAndWithdrawArgs;
  [SafeActionType.WITHDRAW]: DepositAndWithdrawArgs;
  [SafeActionType.BOOST]: BoostAndLessArgs;
  [SafeActionType.LESS]: BoostAndLessArgs;
  [SafeActionType.SLURP]: SlurpArgs;
  [SafeActionType.SWEEP]: SweepArgs;
};


// https://github.com/microsoft/TypeScript/issues/36444
export enum SafeInteractionMode {
    DEPOSIT = "Deposit",
    WITHDRAW = "Withdraw",
    BOOST = "Boost",
    LESS = "Less",
  }

  export interface FuseERC4626Strategy {
    underlying: string;
    name: string;
    symbol: string;
    fToken: string;
    comptroller: string;
    supplyRatePerBlock: number;
  }
  
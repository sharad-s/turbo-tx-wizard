import React from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { SafeAction, SafeActionType, TypesToArgs } from "utils/turboBuilder";
import { useState } from "react";
import encodeCall from "lib/turbo/transactions/encodedCalls";
import { useTurbo } from "context/TurboContext";
import { useEffect } from "react";
import { formatUnits, parseEther, parseUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import { useRari } from "context/RariContext";
import { TokenAmountInput } from "rari-components";
import { fetchMaxSafeAmount } from "lib/turbo/utils/fetchMaxSafeAmount";
import { SafeInteractionMode } from "lib/turbo/types";
import useSafeMaxAmount from "hooks/turbo/useSafeMaxAmount";
import { TurboAddresses } from "lib/turbo/utils/constants";

type CardProps = {
  action: SafeAction;
  index: number;
  updateItemInArray: (i: number, item: SafeAction) => void;
};

const Card: React.FC<
  CardProps & {
    removeItemFromArray: (i: number) => void;
  }
> = ({ action, removeItemFromArray, updateItemInArray, index }) => {
  return (
    <Box w="100%" h="100%" bg="grey" p={4} m={4}>
      <HStack flex="space-between" w="100%" bg="">
        <Text>
          {" "}
          {index}.) {action.type}
        </Text>
        <Button bg="red" onClick={() => removeItemFromArray(index)} ml="auto">
          x
        </Button>
      </HStack>
      <HStack>
        {action.type === SafeActionType.BOOST && (
          <BoostCard
            action={action}
            updateItemInArray={updateItemInArray}
            index={index}
          />
        )}
        {action.type === SafeActionType.CREATE_SAFE && (
          <CreateSafeCard
            action={action}
            updateItemInArray={updateItemInArray}
            index={index}
          />
        )}
        {action.type === SafeActionType.DEPOSIT && (
          <DepositCard
            action={action}
            updateItemInArray={updateItemInArray}
            index={index}
          />
        )}
        {action.type === SafeActionType.PULL_TOKEN && (
          <PullTokenCard
            action={action}
            updateItemInArray={updateItemInArray}
            index={index}
          />
        )}
      </HStack>
    </Box>
  );
};

const BoostCard: React.FC<CardProps> = ({
  action,
  updateItemInArray,
  index,
}) => {
  const { safes, allStrategies, collateralTokenData } = useTurbo();

  const [safe, setSafe] = useState<string>("");
  const [strategy, setStrategy] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const callData = useMemo(() => {
    if (!safe || !strategy) return "";
    const _amount = parseEther(!amount || amount === "" ? "0" : amount);
    const callData = encodeCall.boost(safe, strategy, _amount);
    return callData;
  }, [safe, strategy, amount]);

  useEffect(() => {
    const item = {
      ...action,
      callData,
    };
    updateItemInArray(index, item);
  }, [callData, index]);

  return (
    <Box>
      <HStack>
        <Text>Safe: </Text>
        <Select
          placeholder="Select safe"
          onChange={(e) => setSafe(e.target.value)}
          value={safe}
        >
          {safes?.map((safe) => (
            <option value={safe.safeAddress}>
              {collateralTokenData[safe.collateralAsset]?.symbol} Safe (
              {safe.safeUtilization.toString()}%)
            </option>
          ))}
        </Select>
      </HStack>

      <HStack>
        <Text>Strategy: </Text>
        <Select
          placeholder="Select strategy"
          onChange={(e) => setStrategy(e.target.value)}
          value={strategy}
          disabled={!safe}
        >
          {allStrategies.map((strategy) => (
            <option value={strategy}>{strategy}</option>
          ))}
        </Select>
      </HStack>
      <HStack>
        <Text>Amount: </Text>
        <Input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          type="number"
          disabled={!strategy}
        />
      </HStack>
    </Box>
  );
};

const CreateSafeCard: React.FC<CardProps> = ({
  action,
  updateItemInArray,
  index,
}) => {
  const { approvedCollaterals, collateralTokenData } = useTurbo();
  const [collateral, setCollateral] = useState<string>("");

  const callData = useMemo(() => {
    if (!collateral) return "";
    const callData = encodeCall.createSafe(collateral);
    return callData;
  }, [collateral]);

  useEffect(() => {
    const item = {
      ...action,
      callData,
    };
    updateItemInArray(index, item);
  }, [callData, index]);

  return (
    <Box>
      <HStack>
        <Text>Safe: </Text>
        <Select
          placeholder="Select Asset"
          onChange={(e) => setCollateral(e.target.value)}
          value={collateral}
        >
          {approvedCollaterals?.map((collateral) => (
            <option value={collateral}>
              {collateralTokenData[collateral]?.symbol}
            </option>
          ))}
        </Select>
      </HStack>
    </Box>
  );
};

const DepositCard: React.FC<CardProps> = ({
  action,
  updateItemInArray,
  index,
}) => {
  const { address, provider } = useRari();
  const { safes, allStrategies, collateralTokenData } = useTurbo();

  const [safeIndex, setSafeIndex] = useState<number>();
  const [amount, setAmount] = useState<string>("");

  const safe = safes?.[safeIndex];

  const callData = useMemo(() => {
    if (!safe) return "";
    const amountBN = parseUnits(
      !amount || amount === "" ? "0" : amount,
      collateralTokenData[safe.collateralAsset]?.decimals
    );
    const callData = encodeCall.deposit(safe?.safeAddress, address, amountBN);
    return callData;
  }, [safe, amount]);

  useEffect(() => {
    const item = {
      ...action,
      callData,
    };
    updateItemInArray(index, item);
  }, [callData, index]);

  const onClickMax = async () => {
    const _amount = await fetchMaxSafeAmount(
      provider,
      SafeInteractionMode.DEPOSIT,
      address,
      safe,
      1
    );
    console.log({ _amount });
    setAmount(
      formatUnits(
        maxAmount,
        collateralTokenData[safe.collateralAsset]?.decimals ?? 18
      )
    );
  };

  const maxAmount = useSafeMaxAmount(safe, SafeInteractionMode.DEPOSIT);

  return (
    <Box>
      <HStack>
        <Text>Safe: </Text>
        <Select
          placeholder="Select safe"
          onChange={(e) => setSafeIndex(Number(e.target.value))}
          value={safeIndex}
        >
          {safes?.map((safe, i) => (
            <option value={i}>
              {collateralTokenData[safe.collateralAsset]?.symbol} Safe (
              {safe.safeUtilization.toString()}%)
            </option>
          ))}
        </Select>
      </HStack>
      <HStack>
        <Text>Amount: </Text>
        <TokenAmountInput
          value={amount}
          onChange={(amount: string) => setAmount(amount ?? "0")}
          tokenAddress={safe?.collateralAsset ?? ""}
          onClickMax={onClickMax}
        />
      </HStack>
      <HStack>
        <Text>
          You can deposit{" "}
          {formatUnits(
            maxAmount,
            collateralTokenData[safe?.collateralAsset]?.decimals ?? 18
          )}{" "}
          {collateralTokenData[safe?.collateralAsset]?.symbol}
        </Text>
      </HStack>
    </Box>
  );
};

const PullTokenCard: React.FC<CardProps> = ({
  action,
  updateItemInArray,
  index,
}) => {
  const { approvedCollaterals, collateralTokenData } = useTurbo();

  const [token, setToken] = useState<string>();
  const [amount, setAmount] = useState<string>("");

  const callData = useMemo(() => {
    if (!token) return "";
    const amountBN = parseUnits(
      !amount || amount === "" ? "0" : amount,
      collateralTokenData[token]?.decimals
    );
    const callData = encodeCall.pullTokens(
      token,
      amountBN,
      TurboAddresses[1].ROUTER
    );
    return callData;
  }, [token, amount]);

  useEffect(() => {
    const item = {
      ...action,
      callData,
    };
    updateItemInArray(index, item);
  }, [callData, index]);

  return (
    <Box>
      <HStack>
        <Select
          placeholder="Select Token"
          onChange={(e) => setToken(e.target.value)}
          value={token}
        >
          {approvedCollaterals?.map((collateral, i) => (
            <option value={collateral}>
              {collateralTokenData[collateral]?.symbol}{" "}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack>
        <Text>Amount: </Text>
        <TokenAmountInput
          value={amount}
          onChange={(amount: string) => setAmount(amount ?? "0")}
          tokenAddress={token ?? ""}
        />
      </HStack>
    </Box>
  );
};

export default Card;

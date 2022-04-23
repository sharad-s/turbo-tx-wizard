import React from "react";
import { Box, Button, HStack, Input, Select, Text } from "@chakra-ui/react";
import { SafeAction, SafeActionType, TypesToArgs } from "utils/turboBuilder";
import { useState } from "react";
import encodeCall, {
  BoostAndLessArgs,
} from "lib/turbo/transactions/encodedCalls";
import { useTurbo } from "context/TurboContext";
import { useEffect } from "react";
import { parseEther } from "ethers/lib/utils";
import { useMemo } from "react";

const Card: React.FC<{
  action: SafeAction;
  index: number;
  removeItemFromArray: (i: number) => void;
  updateItemInArray: (i: number, item: SafeAction) => void;
}> = ({ action, removeItemFromArray, updateItemInArray, index }) => {
  return (
    <Box w="100%" h="100%" bg="black" p={4} m={4}>
      <HStack>
        <Text>
          {" "}
          {index}.) {action.type}
        </Text>
        <Button bg="red" onClick={() => removeItemFromArray(index)}>
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
      </HStack>
    </Box>
  );
};

const BoostCard: React.FC<{
  action: SafeAction;
  updateItemInArray: (i: number, item: SafeAction) => void;
  index: number;
}> = ({ action, updateItemInArray, index }) => {
  const { allSafes, allStrategies } = useTurbo();

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
          {allSafes.map((safe) => (
            <option value={safe}>{safe}</option>
          ))}
        </Select>
      </HStack>

      <HStack>
        <Text>Strategy: </Text>
        <Select
          placeholder="Select strategy"
          onChange={(e) => setStrategy(e.target.value)}
          value={strategy}
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
        />
      </HStack>
    </Box>
  );
};

export default Card;

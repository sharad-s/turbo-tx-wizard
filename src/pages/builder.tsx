import {
  Box,
  VStack,
  Text,
  HStack,
  Stack,
  Heading,
  Button,
} from "@chakra-ui/react";
import Card from "components/BuildCard/Card";
import { TurboProvider } from "context/TurboContext";
import { callRouterWithMultiCall } from "lib/turbo/utils/turboMulticall";
import { useState } from "react";
import { SafeAction, SafeActionType } from "utils/turboBuilder";
import { getProvider } from "utils/web3Utils";

const Builder = () => {
  const [array, setArray] = useState<SafeAction[]>([]);

  const updateArray = (item: SafeAction) => {
    setArray([...array, item]);
  };

  const removeItemFromArray = (index: number) => {
    const arr = [...array];
    arr.splice(index, 1);
    setArray(arr);
  };

  const updateItemInArray = (index: number, item: SafeAction) => {
    const arr = [...array];
    arr[index] = item;
    setArray(arr);
  };

  const handleExecute = async () => {
    const provider = getProvider();
    const encodedCalls = array
      .map((item) => item.callData)
      .filter((callData) => !!callData);
    console.log({ encodedCalls, array });
    const result = await callRouterWithMultiCall(provider, encodedCalls, 1);
    console.log({ result });
  };

  return (
    <TurboProvider>
      <VStack h="100vh" w="100%" bg="">
        <Heading>Hi</Heading>
        {/* Header */}
        <Box w={"100%"} h={10} bg="black"></Box>
        <Stack direction="row" w="100%" h="100%">
          <VStack w="33%" h="100%" bg="grey">
            <Left array={array} updateArray={updateArray} />
          </VStack>
          <VStack w="66%" h="100%" bg="pink">
            <Right
              array={array}
              removeItemFromArray={removeItemFromArray}
              updateItemInArray={updateItemInArray}
            />
          </VStack>
        </Stack>

        <Button onClick={handleExecute}>Execute</Button>
      </VStack>
    </TurboProvider>
  );
};

const Left: React.FC<{
  array: SafeAction[];
  updateArray: (item: SafeAction) => void;
}> = ({ array, updateArray }) => {
  const handleClick = (type: SafeActionType) => {
    const action = {
      type,
      callData: "",
    };
    updateArray(action);
  };

  return (
    <Box>
      <Heading>Actions</Heading>
      <VStack>
        {Object.values(SafeActionType).map((value) => (
          <Box
            onClick={() => handleClick(value)}
            _hover={{
              cursor: "pointer",
              bg: "black",
            }}
            w="100%"
          >
            <Text>{value}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

const Right: React.FC<{
  array: SafeAction[];
  removeItemFromArray: (i: number) => void;
  updateItemInArray: (i: number, item: SafeAction) => void;
}> = ({ array, removeItemFromArray, updateItemInArray }) => {
  return (
    <Box>
      <Heading>Transactions</Heading>
      <VStack>
        {array.map((action, i) => (
          <Card
            key={i}
            action={action}
            index={i}
            removeItemFromArray={removeItemFromArray}
            updateItemInArray={updateItemInArray}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Builder;

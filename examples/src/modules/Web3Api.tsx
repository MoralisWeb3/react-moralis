import React, { useState } from "react";
import {
  Stack,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { CodeBlock } from "../components/CodeBlock";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

export const Web3Api = () => {
  const [block, setBlock] = useState(1000000);
  const [address, setAddress] = useState(
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  );
  const {
    native: { getBlock },
    account: { getNativeBalance },
  } = useMoralisWeb3Api();

  const getBlockQuery = useMoralisWeb3ApiCall(getBlock, {
    block_number_or_hash: `${block}`,
  });
  const getNativeBalanceQuery = useMoralisWeb3ApiCall(getNativeBalance, {
    address,
  });

  return (
    <VStack spacing={6} alignItems="stretch" divider={<Divider />}>
      <Stack spacing={3}>
        <HStack>
          <InputGroup>
            <InputLeftAddon children="Block no." />
            <Input
              type="number"
              value={block}
              onChange={(e) => setBlock(+e.target.value)}
            />
          </InputGroup>{" "}
          <Button
            onClick={() =>
              getBlockQuery.fetch({ params: { block_number_or_hash: "1000" } })
            }
          >
            getBlock
          </Button>
        </HStack>
        <CodeBlock>{JSON.stringify(getBlockQuery, null, 2)}</CodeBlock>
      </Stack>

      <Stack spacing={3}>
        <HStack>
          <InputGroup>
            <InputLeftAddon children="Address" />
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputGroup>{" "}
          <Button onClick={() => getNativeBalanceQuery.fetch()}>
            getNativeBalance
          </Button>
        </HStack>
        <CodeBlock>{JSON.stringify(getNativeBalanceQuery, null, 2)}</CodeBlock>
      </Stack>
    </VStack>
  );
};

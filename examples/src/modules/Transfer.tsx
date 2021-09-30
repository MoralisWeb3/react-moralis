import React from "react";
import { Heading, Stack } from "@chakra-ui/layout";
import { Box, Button } from "@chakra-ui/react";
import { useWeb3Transfer } from "react-moralis";
import { CodeBlock } from "../components/CodeBlock";
import Moralis from "moralis";

export const Transfer = () => {
  const transferNativeQuery = useWeb3Transfer({
    amount: Moralis.Units.ETH(0.5),
    receiver: "0x0000000000000000000000000000000000000000",
    type: "native",
  });

  const transferWethQuery = useWeb3Transfer({
    amount: Moralis.Units.Token(20, 18),
    receiver: "0x0000000000000000000000000000000000000000",
    type: "erc20",
    contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  });

  return (
    <div>
      <Stack spacing={6}>
        <Box>
          <Stack spacing={6}>
            <Heading>Transfer Native</Heading>
            <Box>
              <Button onClick={() => transferNativeQuery.fetch()}>
                Transfer
              </Button>
            </Box>
            <CodeBlock>
              {JSON.stringify(
                {
                  data: transferNativeQuery.data,
                  error: transferNativeQuery.error,
                  fetch: transferNativeQuery.fetch,
                  isFetching: transferNativeQuery.isFetching,
                  isLoading: transferNativeQuery.isLoading,
                },
                null,
                2,
              )}
            </CodeBlock>
          </Stack>
        </Box>
        <Box>
          <Stack spacing={6}>
            <Heading>Transfer ERC20 (WETH)</Heading>
            <Box>
              <Button onClick={() => transferWethQuery.fetch()}>
                Transfer
              </Button>
            </Box>
            <CodeBlock>
              {JSON.stringify(
                {
                  data: transferWethQuery.data,
                  error: transferWethQuery.error,
                  fetch: transferWethQuery.fetch,
                  isFetching: transferWethQuery.isFetching,
                  isLoading: transferWethQuery.isLoading,
                },
                null,
                2,
              )}
            </CodeBlock>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

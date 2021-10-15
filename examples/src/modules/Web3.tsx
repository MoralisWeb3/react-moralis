import React from "react";
import { Stack, Button, HStack } from "@chakra-ui/react";
import { CodeBlock } from "../components/CodeBlock";
import { useMoralis } from "react-moralis";

export const Web3 = () => {
  const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } =
    useMoralis();

  return (
    <div>
      <Stack spacing={6}>
        <HStack>
          <Button onClick={() => enableWeb3()}>Enable web3</Button>
          <Button onClick={() => enableWeb3({ provider: "walletconnect" })}>
            Enable web3 (Walletconnect)
          </Button>
        </HStack>
      </Stack>
      <CodeBlock>
        {JSON.stringify(
          {
            isWeb3Enabled,
            isWeb3EnableLoading,
            web3EnableError,
          },
          null,
          2,
        )}
      </CodeBlock>
    </div>
  );
};

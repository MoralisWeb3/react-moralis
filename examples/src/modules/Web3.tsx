import { Stack, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { useMoralis } from "react-moralis";

export const Web3 = () => {
  const {
    web3,
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    web3EnableError,
  } = useMoralis();

  console.log("web3", web3);

  return (
    <div>
      <Stack spacing={6}>
        <Button onClick={() => enableWeb3()}>Enable web3</Button>
      </Stack>
      <CodeBlock>
        {JSON.stringify(
          {
            isWeb3Enabled,
            isWeb3EnableLoading,
            web3EnableError,
            provider: web3?.currentProvider,
          },
          null,
          2,
        )}
      </CodeBlock>
    </div>
  );
};

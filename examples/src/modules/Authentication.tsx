import React from "react";
import { Heading, Stack } from "@chakra-ui/layout";
import { Box, Button, HStack } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { CodeBlock } from "../components/CodeBlock";

export const Authentication = () => {
  const {
    authenticate,
    user,
    authError,
    isAuthenticated,
    isAuthenticating,
    logout,
  } = useMoralis();

  return (
    <div>
      <Stack spacing={6}>
        <Heading>Authentication</Heading>
        <Box>
          {isAuthenticated ? (
            <Button onClick={() => logout()}>Logout</Button>
          ) : (
            <HStack>
              <Button onClick={() => authenticate()}>Authenticate</Button>
              <Button
                onClick={() => authenticate({ provider: "walletconnect" })}
              >
                Authenticate Walletconnect
              </Button>
            </HStack>
          )}
        </Box>
        <CodeBlock>
          {JSON.stringify(
            {
              user,
              isAuthenticated,
              isAuthenticating,
              authError,
            },
            null,
            2,
          )}
        </CodeBlock>
      </Stack>
    </div>
  );
};

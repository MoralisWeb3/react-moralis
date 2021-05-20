import React from "react";
import { Code, Heading, Stack, Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { ByMoralis } from "react-moralis";

export const Assets = () => {
  return (
    <div>
      <Stack spacing={6}>
        <Heading>Assets</Heading>
        <ByMoralis width={300} />
        <ByMoralis width={300} variant="dark" />
        <ByMoralis width={300} variant="light" />
      </Stack>
    </div>
  );
};

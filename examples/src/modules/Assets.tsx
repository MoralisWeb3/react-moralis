import React from "react";
import { Heading, Stack } from "@chakra-ui/layout";
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

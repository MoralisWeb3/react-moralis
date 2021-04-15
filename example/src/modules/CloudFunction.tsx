import React, { useState } from "react";
import { Heading, Stack } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react";
import { useMoralisCloudFunction } from "react-moralis";
import { CodeBlock } from "../components/CodeBlock";

export const CloudFunction = () => {
  const [limit, setLimit] = useState(3);
  const {
    data,
    error,
    fetch,
    isFetching,
    isLoading
  } = useMoralisCloudFunction("topScores", { limit });

  return (
    <div>
      <Stack spacing={6}>
        <Heading>Cloud Function</Heading>
        <Box>
          <Button onClick={() => fetch()}>Fetch</Button>
        </Box>
        <Stack maxWidth="400">
          <InputGroup>
            <InputLeftAddon children="Limit" />
            <Input
              type="number"
              value={limit}
              onChange={e => setLimit(+e.target.value)}
            />
          </InputGroup>
        </Stack>
        <CodeBlock>
          {JSON.stringify(
            {
              data,
              error,
              fetch,
              isFetching,
              isLoading
            },
            null,
            2
          )}
        </CodeBlock>
      </Stack>
    </div>
  );
};

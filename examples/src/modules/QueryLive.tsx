import React, { useState } from "react";
import { Heading, Stack } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useMoralisQuery } from "react-moralis";
import { CodeBlock } from "../components/CodeBlock";

interface GameScore {
  playerName: string;
  score: number;
}

export const QueryLive = () => {
  const [maxScore, setMaxScore] = useState(100);
  const [limit, setLimit] = useState(3);

  const {
    fetch,
    data,
    error,
    isFetching,
    isLoading,
  } = useMoralisQuery<GameScore>(
    "GameScore",
    (q) =>
      q.lessThanOrEqualTo("score", maxScore).descending("score").limit(limit),
    [maxScore, limit],
    { live: true },
  );

  return (
    <div>
      <Stack spacing={6}>
        <Heading>Query</Heading>

        <Stack maxWidth="400">
          <InputGroup>
            <InputLeftAddon children="Max score" />
            <Input
              type="number"
              value={maxScore}
              onChange={(e) => setMaxScore(+e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Limit" />
            <Input
              type="number"
              value={limit}
              onChange={(e) => setLimit(+e.target.value)}
            />
          </InputGroup>
        </Stack>

        <Box>
          <Button onClick={() => fetch()}>Refetch</Button>
        </Box>

        <CodeBlock>
          {JSON.stringify(
            {
              data,
              error: error && { name: error.name, message: error.message },
              isFetching,
              isLoading,
            },
            null,
            2,
          )}
        </CodeBlock>
      </Stack>
    </div>
  );
};

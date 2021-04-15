import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useMoralisSubscription } from "react-moralis";

interface GameScore {
  playerName: string;
  score: number;
}

export const Subscription = () => {
  useMoralisSubscription<GameScore>("GameScore", q => q, [], {
    onCreate: data => alert(`${data.attributes.playerName} was just created`)
  });

  return (
    <div>
      <Stack spacing={6}>
        <Heading>Subscription</Heading>
        <Text>Go ahead, make a new GameScore entry</Text>
      </Stack>
    </div>
  );
};

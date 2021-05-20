import React, { useState } from "react";
import { Code, Heading, Stack, Text } from "@chakra-ui/layout";
import { Box, Button, FormLabel, Input } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { CodeBlock } from "../components/CodeBlock";

export const User = () => {
  const { user } = useMoralis();

  if (!user) {
    return <Text>Not signed in</Text>;
  }

  return <Inner />;
};

const Inner = () => {
  const { user, userError, isUserUpdating, setUserData } = useMoralis();

  const [email, setEmail] = useState(user?.getEmail() ?? "");
  const [phone, setPhone] = useState(user?.get("phone") ?? "");
  const [username, setUsername] = useState(user?.getUsername() ?? "");

  const updateUser = (event: React.FormEvent) => {
    event.preventDefault();

    setUserData({ email: email === "" ? undefined : email, phone, username });
  };

  return (
    <div>
      <Stack spacing={6}>
        <Heading>User</Heading>
        <Box maxWidth={500}>
          <form onSubmit={updateUser}>
            <Stack spacing={6}>
              <Box>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder="email"
                />
              </Box>
              <Box>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  placeholder="username"
                />
              </Box>
              <Box>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  placeholder="phone"
                />
              </Box>

              <Button
                type="submit"
                colorScheme="green"
                disabled={isUserUpdating}
              >
                Update user
              </Button>
            </Stack>
          </form>
        </Box>
        <CodeBlock>
          {JSON.stringify(
            {
              user,
              userError: {
                name: userError && userError.name,
                message: userError && userError.message,
              },
              isUserUpdating,
            },
            null,
            2,
          )}
        </CodeBlock>
      </Stack>
    </div>
  );
};

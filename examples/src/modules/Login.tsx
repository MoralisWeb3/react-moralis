import { Stack, Heading, Box, Button, Input, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { useMoralis } from "react-moralis";

export const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const {
    signup,
    login,
    user,
    authError,
    isAuthenticated,
    isAuthenticating,
  } = useMoralis();

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();

    signup(mail, password, mail, { phone });
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    login(mail, password);
  };

  return (
    <div>
      <Stack spacing={6}>
        <Stack spacing={6} direction="row" align="stretch">
          <Box flex={1}>
            <Heading>Sign up</Heading>
            <form onSubmit={handleSignup}>
              <Stack spacing={6}>
                <Input
                  value={mail}
                  onChange={(e) => setMail(e.currentTarget.value)}
                  placeholder="mail"
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="password"
                />
                <Input
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  placeholder="phone"
                />
                <Button type="submit" colorScheme="green">
                  Sign up
                </Button>
              </Stack>
            </form>
          </Box>
          <Box flex={1}>
            <Heading>Log in</Heading>
            <form onSubmit={handleLogin}>
              <Stack spacing={6}>
                <Input
                  value={mail}
                  onChange={(e) => setMail(e.currentTarget.value)}
                  placeholder="mail"
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="password"
                />
                <Button type="submit" colorScheme="green">
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>

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

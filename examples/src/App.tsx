import {
  Badge,
  Box,
  Container,
  Heading,
  Wrap,
  Center,
  Spinner,
  WrapItem,
} from "@chakra-ui/react";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import React from "react";
import { menu } from "./menu";
import { useMoralis } from "react-moralis";

function App() {
  const location = useLocation();
  const { isInitializing, isInitialized } = useMoralis();

  if (isInitializing) {
    return (
      <Container my={8} pt={8} maxW="container.lg">
        <Center>
          <Spinner
            thickness="4px"
            emptyColor="whiteAlpha.400"
            color="blue.400"
            speed="0.65s"
            size="xl"
          />
        </Center>
      </Container>
    );
  }

  if (!isInitialized) {
    <Container my={8} maxW="container.lg">
      <Heading as="h1" size="4xl">
        Failed to initialize
      </Heading>
    </Container>;
  }
  return (
    <Container my={8} maxW="container.lg">
      <Heading as="h1" size="4xl">
        react-moralis examples
      </Heading>
      <Box mt={16} mb={16}>
        <Wrap direction="row" spacing={4}>
          {menu.map(({ label, path }) => (
            <WrapItem>
              <Badge
                key={path}
                as={Link}
                to={path}
                // @ts-ignore
                fontSize="1.1em"
                p={2}
                colorScheme="green"
                variant={location.pathname === path ? "solid" : "subtle"}
              >
                {label}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
      <Box>
        <Switch>
          {menu.map(({ path, component: Component }) => (
            <Route key={path} path={path} exact>
              <Component />
            </Route>
          ))}
          <Route path="*">
            <Redirect to={menu[0].path} />
          </Route>
        </Switch>
      </Box>
    </Container>
  );
}

export default App;

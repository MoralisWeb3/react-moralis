import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  components: {
    Input: {
      defaultProps: {
        variant: "filled",
      },
    },
    Button: {
      defaultProps: {
        colorScheme: "green",
      },
    },
    Heading: {
      baseStyle: {
        marginBottom: "0.5em",
      },
    },
  },
});

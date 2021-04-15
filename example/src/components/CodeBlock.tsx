import { CodeProps } from "@chakra-ui/layout";
import { Code } from "@chakra-ui/react";
import React from "react";

type CodeBlockProps = CodeProps;

export const CodeBlock = (props: CodeBlockProps) => {
  return (
    <Code
      display="block"
      whiteSpace="pre"
      overflowX="auto"
      borderRadius={4}
      p={8}
      background="blackAlpha.600"
      {...props}
    />
  );
};

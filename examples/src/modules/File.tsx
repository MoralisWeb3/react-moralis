import React, { useState } from "react";
import { Code, Heading, Stack, Text } from "@chakra-ui/layout";
import { Box, Button, Input } from "@chakra-ui/react";
import { useMoralis, useMoralisFile } from "react-moralis";
import { CodeBlock } from "../components/CodeBlock";

export const File = () => {
  const [localFile, setLocalFile] = useState<File | null>(null);
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

  const handleUpload = () => {
    if (localFile) {
      saveFile("upload.jpg", localFile);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setLocalFile(event.currentTarget.files[0]);
    }
  };

  return (
    <div>
      <Stack spacing={6}>
        <Heading>File</Heading>
        <Box>
          <Input accept=".jpeg" type="file" onChange={handleChange} />
          <Button onClick={handleUpload}>Upload</Button>
        </Box>
        <CodeBlock>
          {JSON.stringify(
            {
              error,
              isUploading,
              moralisFile,
            },
            null,
            2,
          )}
        </CodeBlock>
      </Stack>
    </div>
  );
};

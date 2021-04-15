import { Moralis } from "moralis";
import { useCallback, useState } from "react";

export type ValidFileInput =
  | number[]
  | { base64: string }
  | { size: number; type: string }
  | { uri: string };

export const useMoralisFile = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [moralisFile, setMoralisFile] = useState<Moralis.File | null>(null);
  /**
   * Save the provided file
   */
  const saveFile = useCallback(
    async (
      name: string,
      file: ValidFileInput,
      options: {
        type?: string;
        metadata?: Record<string, string>;
        tags?: Record<string, string>;
        saveIPFS?: boolean;
      } = {}
    ) => {
      try {
        setIsUploading(true);
        setError(null);
        setIsSuccess(false);
        const moralisFile = new Moralis.File(
          name,
          file,
          options.type,
          //@ts-ignore type is different than documentation (it should accept metadata and tags)
          options.metadata,
          options.tags
        );

        if (options.saveIPFS) {
          await moralisFile.saveIPFS();
        } else {
          await moralisFile.save();
        }

        setMoralisFile(moralisFile);
        setIsSuccess(true);

        return moralisFile;
      } catch (error) {
        setError(error);
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  return {
    error,
    saveFile,
    isUploading,
    isSuccess,
    moralisFile
  };
};

import MoralisType from "moralis";
import { useCallback, useState } from "react";
import { useMoralis } from "../useMoralis";

export type ValidFileInput =
  | number[]
  | { base64: string }
  | { size: number; type: string }
  | { uri: string };

export interface MoralisFileSaveOptions {
  type?: string;
  metadata?: Record<string, string>;
  tags?: Record<string, string>;
  saveIPFS?: boolean;
  onError?: (error: Error) => void;
  onSuccess?: (result: MoralisType.File) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}

export const useMoralisFile = () => {
  const { Moralis } = useMoralis();
  const [error, setError] = useState<Error | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [moralisFile, setMoralisFile] = useState<MoralisType.File | null>(null);
  /**
   * Save the provided file
   */
  const saveFile = useCallback(
    async (
      name: string,
      file: ValidFileInput,
      {
        type,
        metadata,
        tags,
        saveIPFS,
        throwOnError,
        onComplete,
        onError,
        onSuccess,
      }: MoralisFileSaveOptions = {},
    ) => {
      try {
        setIsUploading(true);
        setError(null);

        const moralisFile = new Moralis.File(
          name,
          file,
          type,
          //@ts-ignore type is different than documentation (it should accept metadata and tags)
          metadata,
          tags,
        );

        if (saveIPFS) {
          await moralisFile.saveIPFS();
        } else {
          await moralisFile.save();
        }

        setMoralisFile(moralisFile);

        if (onSuccess) {
          onSuccess(moralisFile);
        }

        return moralisFile;
      } catch (error) {
        setError(error);
        if (throwOnError) {
          throw error;
        }
        if (onError) {
          onError(error);
        }
      } finally {
        setIsUploading(false);
        if (onComplete) {
          onComplete();
        }
      }
    },
    [],
  );

  return {
    error,
    saveFile,
    isUploading,
    moralisFile,
  };
};

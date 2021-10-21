import MoralisType from "moralis";
import { useCallback, useState } from "react";
import { useMoralis } from "../useMoralis";

export interface MoralisObjectSaveOptions {
  cascadeSave?: boolean;
  context?: any;
  onError?: (error: Error) => void;
  onSuccess?: (result: MoralisType.Object) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}

export type MoralisObjectSaveData = Record<string, any>;

/**
 * A hook for making/saving new Moralis Objects
 */
export const useNewMoralisObject = (objectClassName: string) => {
  const { Moralis } = useMoralis();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [object, setObject] = useState<MoralisType.Object | null>(null);

  /**
   * Save function to save data to the object
   */
  const save = useCallback(
    async (
      data: MoralisObjectSaveData = {},
      {
        cascadeSave,
        throwOnError,
        context,
        onSuccess,
        onComplete,
        onError,
      }: MoralisObjectSaveOptions = {},
    ) => {
      setIsSaving(true);
      setError(null);

      try {
        const Object = Moralis.Object.extend(objectClassName);
        const object = new Object();

        // TODO: support saving of nested objects more easy?

        // @ts-ignore (context does not exist in the save options type)
        await object.save(data, { cascadeSave, context });
        setObject(object);

        if (onSuccess) {
          onSuccess(object);
        }
        return object;
      } catch (error) {
        setError(error);
        if (throwOnError) {
          throw error;
        }
        if (onError) {
          onError(error);
        }
      } finally {
        setIsSaving(false);
        if (onComplete) {
          onComplete();
        }
      }
    },
    [objectClassName],
  );

  return {
    isSaving,
    object,
    error,
    save,
  };
};

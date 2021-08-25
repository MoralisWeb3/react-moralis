import { Moralis } from "moralis";
import isDeepEqual from "fast-deep-equal/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMoralis } from "src/hooks/useMoralis";

export type MoralisCloudResult = any;

export interface UseMoralisCloudFunctionOptions {
  autoFetch?: boolean;
}

export type MoralisCloudFunctionParameters = Record<string, any>;

export interface MoralisCloudFetchOptions {
  onError?: (error: Error) => void;
  onSuccess?: (results: MoralisCloudResult) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  params?: MoralisCloudFunctionParameters;
}

const defaultUseMoralisCloudFunctionOptions: UseMoralisCloudFunctionOptions = {
  autoFetch: true,
};

export const useMoralisCloudFunction = (
  name: string,
  params?: MoralisCloudFunctionParameters,
  options?: UseMoralisCloudFunctionOptions,
) => {
  const { isInitialized } = useMoralis();
  const { autoFetch } = {
    ...defaultUseMoralisCloudFunctionOptions,
    ...(options ?? {}),
  };
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<null | MoralisCloudResult>(null);
  const paramsRef = useRef<MoralisCloudFunctionParameters | undefined>(params);

  if (!isDeepEqual(paramsRef.current, params)) {
    paramsRef.current = params;
  }

  /**
   * Run the cloud function
   */
  const fetch = useCallback(
    async ({
      throwOnError,
      onComplete,
      onError,
      onSuccess,
      params: fetchParams,
    }: MoralisCloudFetchOptions = {}) => {
      setIsFetching(true);
      setError(null);

      try {
        const results = await Moralis.Cloud.run(name, {
          ...params,
          ...fetchParams,
        });

        setData(results);
        if (onSuccess) {
          onSuccess(results);
        }
      } catch (error) {
        setError(error);
        if (throwOnError) {
          throw error;
        }
        if (onError) {
          onError(error);
        }
      } finally {
        setIsFetching(false);
        if (onComplete) {
          onComplete();
        }
      }
    },
    [name, paramsRef.current],
  );

  const isLoading = isFetching && data == null;

  /**
   * Automatically fetch the cloud function
   */
  useEffect(() => {
    if (!isInitialized || !autoFetch) {
      return;
    }

    fetch();
  }, [fetch, isInitialized]);

  return {
    fetch,
    isFetching,
    isLoading,
    error,
    data: data ?? [],
  };
};

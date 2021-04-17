import { Moralis } from "moralis";
import isDeepEqual from "fast-deep-equal/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMoralis } from "src/hooks/useMoralis";

export interface UseMoralisCloudFunctionOptions {
  autoFetch?: boolean;
}

export interface MoralisCloudFetchOptions {
  throwOnError?: boolean;
}

export type MoralisCloudFunctionParameters = Record<string, any>;

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
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const paramsRef = useRef<MoralisCloudFunctionParameters | undefined>(params);

  if (!isDeepEqual(paramsRef.current, params)) {
    paramsRef.current = params;
  }

  /**
   * Run the cloud function
   */
  const fetch = useCallback(
    async (options: MoralisCloudFetchOptions = {}) => {
      setIsFetching(true);
      try {
        const results = await Moralis.Cloud.run("topScores", params);

        setData(results);
      } catch (error) {
        setError(error);
        if (options.throwOnError) {
          throw error;
        }
      } finally {
        setIsFetching(false);
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

import isDeepEqual from "fast-deep-equal/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMoralis } from "../../../hooks/core/useMoralis";
import { useImmer } from "use-immer";

export interface UseResolveCallOptions {
  autoFetch?: boolean;
}

export type ResolveCallParams = object;

export interface ResolveCallOptions<Result, Params extends ResolveCallParams> {
  onError?: (error: Error) => void;
  onSuccess?: (results: Result) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  params?: Params;
}

export const _useResolveCall = <Result, Params extends ResolveCallParams>(
  call: (params: Params) => Promise<Result>,
  initialData: Result,
  params?: Params,
  options?: UseResolveCallOptions,
  defaultAutoFetch = true,
  validate?: (params: Params) => string | undefined | null,
) => {
  const { isInitialized } = useMoralis();
  const { autoFetch } = {
    ...{
      autoFetch: defaultAutoFetch,
    },
    ...(options ?? {}),
  };
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useImmer<Result>(initialData);
  const paramsRef = useRef<ResolveCallParams | undefined>(params);

  if (!isDeepEqual(paramsRef.current, params)) {
    paramsRef.current = params;
  }

  /**
   * Run the function
   */
  const fetch = useCallback(
    async ({
      throwOnError,
      onComplete,
      onError,
      onSuccess,
      params: fetchParams,
    }: ResolveCallOptions<Result, Params> = {}) => {
      // @ts-ignore
      const combinedParams: Params = {
        ...params,
        ...fetchParams,
      };

      try {
        if (validate) {
          const error = validate(combinedParams);
          if (error) {
            throw new Error(error);
          }
        }

        setIsFetching(true);
        setError(null);

        const results = await call(combinedParams);

        setData(results);
        if (onSuccess) {
          onSuccess(results);
        }
        return results;
      } catch (error) {
        setData(initialData);
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
    [call, paramsRef.current, validate],
  );
  const isEmpty = useMemo(() => {
    if (data == null) {
      return true;
    }
    if (Array.isArray(data) && data.length === 0) {
      return true;
    }
    return false;
  }, [data]);

  const isLoading = useMemo(() => {
    return isFetching && isEmpty;
  }, [isEmpty, isFetching]);

  /**
   * Automatically fetch the call function
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
    data,
    setData,
  };
};

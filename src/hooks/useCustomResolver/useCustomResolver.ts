/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { useMoralis } from "../useMoralis";
import { UseResolveCallOptions } from "../_useResolveAsyncCall";

export interface UseCustomResolverOptions extends UseResolveCallOptions {
  throwOnError: boolean;
}

export const useCustomResolver = <Params, Result, FormatResponse>(
  call: (params: Params) => Promise<Result>,
  initialData: any,
  params: Params,
  options: UseCustomResolverOptions = {
    autoFetch: false,
    throwOnError: false,
  },
  responseFormat?: (data: Result) => FormatResponse,
) => {
  const { isInitialized } = useMoralis();

  const { autoFetch, throwOnError } = options;

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useImmer<Result | FormatResponse>(initialData);

  const operation = async () => {
    try {
      // eslint-disable-next-line no-console
      console.log({
        params,
      });
      setIsFetching(true);
      const result = await call(params);
      if (responseFormat) {
        // eslint-disable-next-line no-console
        console.log("using response format");
        setData(responseFormat(result));
      } else {
        setData(result);
      }
    } catch (error) {
      setData(initialData);
      setError(error);
      if (throwOnError) {
        throw error;
      }
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!isInitialized || !autoFetch) {
      return;
    }

    operation();
  }, [operation, isInitialized]);

  const isLoading =
    isFetching &&
    data == null &&
    (Array.isArray(data) ? data.length === 0 : true);

  return {
    operation,
    isFetching,
    isLoading,
    error,
    data,
    setData,
  };
};

import { useCallback } from "react";
import { useMoralis } from "../useMoralis";
import {
  UseResolveCallOptions,
  _useResolveCall,
} from "../../internal/_useResolveAsyncCall";

export type Web3ExecuteFunctionResult = unknown;

export interface UseWeb3ExecuteFunctionOptions extends UseResolveCallOptions {}

export type Web3ExecuteFunctionParameters = {
  contractAddress?: string;
  abi?: object;
  functionName?: string;
  params?: Record<string, unknown>;
  msgValue?: number | string;
};

export interface Web3ExecuteFunctionFetchOptions {
  onError?: (error: Error) => void;
  onSuccess?: (results: Web3ExecuteFunctionResult) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  params?: Web3ExecuteFunctionParameters;
}

export const useWeb3ExecuteFunction = (
  params?: Web3ExecuteFunctionParameters,
  options?: UseWeb3ExecuteFunctionOptions,
) => {
  const { Moralis } = useMoralis();
  const call = useCallback(
    async (callParams: Web3ExecuteFunctionParameters) => {
      //@ts-ignore
      const allParams: Web3ExecuteFunctionParameters = {
        ...params,
        ...callParams,
      };

      //@ts-ignore
      return await Moralis.executeFunction(allParams);
    },
    [],
  );

  return _useResolveCall<
    Web3ExecuteFunctionResult,
    Web3ExecuteFunctionParameters
  >(call, null, params, options, false);
};

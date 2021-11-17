import { useCallback } from "react";
import { useMoralis } from "../useMoralis";
import {
  UseResolveCallOptions,
  _useResolveCall,
} from "../../internal/_useResolveAsyncCall";

export type MoralisCloudResult = unknown;

export interface UseMoralisCloudFunctionOptions extends UseResolveCallOptions {}

export type MoralisCloudFunctionParameters = Record<string, unknown>;

export interface MoralisCloudFetchOptions {
  onError?: (error: Error) => void;
  onSuccess?: (results: MoralisCloudResult) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  params?: MoralisCloudFunctionParameters;
}

export const useMoralisCloudFunction = (
  name: string,
  params?: MoralisCloudFunctionParameters,
  options?: UseMoralisCloudFunctionOptions,
) => {
  const { Moralis } = useMoralis();
  const call = useCallback(
    (callParams?: MoralisCloudFunctionParameters) =>
      Moralis.Cloud.run(name, callParams),
    [name],
  );

  return _useResolveCall<MoralisCloudResult, MoralisCloudFunctionParameters>(
    call,
    null,
    params,
    options,
  );
};

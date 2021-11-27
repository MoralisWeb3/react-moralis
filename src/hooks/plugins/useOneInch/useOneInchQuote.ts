import { useMoralis } from "../../core/useMoralis";
import { DEFAULT_API_CHAIN, Plugin } from "../../../config";
import { UseResolveCallOptions } from "../../internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";
import { OneInchToken } from "./types";

export interface UseOneInchQuoteParams {
  chain?: string;
  fromAmount: string | number;
  fromToken: OneInchToken;
  toToken: OneInchToken;
}
export interface UseOneInchQuoteOptions extends UseResolveCallOptions {}

export const useOneInchQuote = (params: UseOneInchQuoteParams, options: UseOneInchQuoteOptions = {}) => {
  const { Moralis } = useMoralis();

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.ONE_INCH,
    Moralis.Plugins?.oneInch?.quote,
    null,
    Object.keys(params)?.length
      ? {
          chain: params.chain ?? DEFAULT_API_CHAIN,
          // The token you want to swap
          fromTokenAddress: params.fromToken.address,
          // The token you want to receive
          toTokenAddress: params.toToken.address,
          amount: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString(),
        }
      : undefined,
    options,
    false
  );

  return { getQuote: fetch, data, isFetching, isLoading, error };
};


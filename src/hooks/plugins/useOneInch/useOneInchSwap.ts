import { useMoralis } from "../../core/useMoralis";
import { DEFAULT_API_CHAIN, Plugin } from "../../../config";
import { UseResolveCallOptions } from "../..//internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";
import { OneInchToken } from "./types";
import { useCallback } from "react";

export interface UseOneInchSwapParams {
  chain?: string;
  fromAmount: string | number;
  fromToken: OneInchToken;
  toToken: OneInchToken;
  slippage?: number;
}
export interface UseOneInchSwapOptions extends UseResolveCallOptions {}

export const useOneInchSwap = (
  params: UseOneInchSwapParams,
  options: UseOneInchSwapOptions = {},
) => {
  const { Moralis, account } = useMoralis();

  const doApproveAndSwap = useCallback(
    async (params: {
      chain: string;
      fromTokenAddress: string;
      toTokenAddress: string;
      amount: number | string;
      fromAddress: string | null;
      slippage: number;
    }) => {
      const hasAllowance = await Moralis.Plugins.oneInch.hasAllowance({
        chain: params.chain,
        fromTokenAddress: params.fromTokenAddress,
        fromAddress: params.fromAddress,
        amount: params.amount,
      });

      if (!hasAllowance) {
        await Moralis.Plugins.oneInch.approve({
          chain: params.chain,
          tokenAddress: params.fromTokenAddress,
          fromAddress: params.fromAddress,
        });
      }

      return Moralis.Plugins.oneInch.swap(params);
    },
    [],
  );

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.ONE_INCH,
    doApproveAndSwap,
    null,
    {
      chain: params.chain ?? DEFAULT_API_CHAIN,
      fromTokenAddress: params.fromToken.address,
      toTokenAddress: params.toToken.address,
      amount: params.fromAmount,
      fromAddress: account,
      slippage: params.slippage ?? 1,
    },
    options,
    false,
    () => {
      return !account ? "No web3 account found, run enableWeb3() first" : null;
    },
  );

  return { swap: fetch, data, isFetching, isLoading, error };
};

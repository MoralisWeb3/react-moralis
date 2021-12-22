import { useMoralis } from "../../core/useMoralis";
import { Plugin } from "../../../config";
import { UseResolveCallOptions } from "../../internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";
import {
  DEFAULT_OPEN_SEA_NETWORK,
  OpenseaNetwork,
  OpenseaTokenType,
} from "./types";

export interface UseOpenSeaBuyOrderParams {
  network?: OpenseaNetwork;
  tokenAddress: string;
  tokenId: string;
  tokenType: OpenseaTokenType;
  amount: number;
  userAddress: string;
  paymentTokenAddress: string;
}
export interface UseOpenSeaBuyOrderOptions extends UseResolveCallOptions {}

export const useOpenSeaBuyOrder = (
  params: UseOpenSeaBuyOrderParams,
  options: UseOpenSeaBuyOrderOptions = {},
) => {
  const { Moralis } = useMoralis();

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.OPEN_SEA,
    Moralis.Plugins?.opensea?.createBuyOrder,
    null,
    {
      network: params.network ?? DEFAULT_OPEN_SEA_NETWORK,
      tokenAddress: params.tokenAddress,
      tokenId: params.tokenId,
      tokenType: params.tokenType,
      amount: params.amount,
      userAddress: params.userAddress,
      paymentTokenAddress: params.paymentTokenAddress,
    },
    options,
    false,
  );

  return { createBuyOrder: fetch, data, isFetching, isLoading, error };
};

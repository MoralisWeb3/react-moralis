import { useMoralis } from "../../core/useMoralis";
import { Plugin } from "../../../config";
import { UseResolveCallOptions } from "../../internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";
import {
  DEFAULT_OPEN_SEA_NETWORK,
  OpenseaNetwork,
  OpenseaTokenType,
} from "./types";

export interface UseOpenSeaSellOrderParams {
  network?: OpenseaNetwork;
  tokenAddress: string;
  tokenId: string;
  tokenType: OpenseaTokenType;
  userAddress: string;
  startAmount: number;
  endAmount: number;
  expirationTime?: number;
}
export interface UseOpenSeaSellOrderOptions extends UseResolveCallOptions {}

export const useOpenSeaSellOrder = (
  params: UseOpenSeaSellOrderParams,
  options: UseOpenSeaSellOrderOptions = {},
) => {
  const { Moralis } = useMoralis();

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.OPEN_SEA,
    Moralis.Plugins?.opensea?.createSellOrder,
    null,
    {
      network: params.network ?? DEFAULT_OPEN_SEA_NETWORK,
      tokenAddress: params.tokenAddress,
      tokenId: params.tokenId,
      tokenType: params.tokenType,
      userAddress: params.userAddress,
      startAmount: params.startAmount,
      endAmount: params.endAmount,
      expirationTime: params.expirationTime,
    },
    options,
    false,
  );

  return { createSellOrder: fetch, data, isFetching, isLoading, error };
};

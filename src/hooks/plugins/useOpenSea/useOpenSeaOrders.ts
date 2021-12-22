import { useMoralis } from "../../core/useMoralis";
import { Plugin } from "../../../config";
import { UseResolveCallOptions } from "../../internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";
import { DEFAULT_OPEN_SEA_NETWORK, OpenseaNetwork } from "./types";

export interface UseOpenSeaOrdersParams {
  network?: OpenseaNetwork;
  tokenAddress: string;
  tokenId: string;
  orderSide: 0 | 1;
  page?: number;
}
export interface UseOpenSeaOrdersOptions extends UseResolveCallOptions {}

export const useOpenSeaOrders = (
  params: UseOpenSeaOrdersParams,
  options: UseOpenSeaOrdersOptions = {},
) => {
  const { Moralis } = useMoralis();

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.OPEN_SEA,
    Moralis.Plugins?.opensea?.getOrders,
    null,
    {
      network: params.network ?? DEFAULT_OPEN_SEA_NETWORK,
      tokenAddress: params.tokenAddress,
      tokenId: params.tokenId,
      orderSide: params.orderSide,
      page: params.page ?? 1,
    },
    options,
    false,
  );

  return { getOrders: fetch, data, isFetching, isLoading, error };
};

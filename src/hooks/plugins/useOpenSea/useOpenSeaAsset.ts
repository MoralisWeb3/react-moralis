import { useMoralis } from "../../core/useMoralis";
import { Plugin } from "../../../config";
import { UseResolveCallOptions } from "../../internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";
import { DEFAULT_OPEN_SEA_NETWORK, OpenseaNetwork } from "./types";

export interface UseOpenSeaAssetParams {
  network?: OpenseaNetwork;
  tokenAddress: string;
  tokenId: string;
}
export interface UseOpenSeaAssetOptions extends UseResolveCallOptions {}

export const useOpenSeaAsset = (
  params: UseOpenSeaAssetParams,
  options: UseOpenSeaAssetOptions = {},
) => {
  const { Moralis } = useMoralis();

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.OPEN_SEA,
    Moralis.Plugins?.opensea?.getAsset,
    null,
    {
      network: params.network ?? DEFAULT_OPEN_SEA_NETWORK,
      tokenAddress: params.tokenAddress,
      tokenId: params.tokenId,
    },
    options,
    false,
  );

  return { getAsset: fetch, data, isFetching, isLoading, error };
};

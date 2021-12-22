import { useMoralis } from "../../core/useMoralis";
import { Plugin } from "../../../config";
import { UseResolveCallOptions } from "../../internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";
import {
  DEFAULT_RARIBLE_NETWORK,
  RaribleNetwork,
  RaribleTokenTypeAssetClass,
} from "./types";

export interface UseRaribleSellOrderParams {
  chain?: RaribleNetwork;
  userAddress: string;
  makeTokenId: string;
  makeTokenAddress: string;
  makeAssetClass: RaribleTokenTypeAssetClass;
  makeValue: string;
  takeAssetClass: RaribleTokenTypeAssetClass;
  takeValue: string;
}
export interface UseRaribleSellOrderOptions extends UseResolveCallOptions {}

export const useRaribleSellOrder = (
  params: UseRaribleSellOrderParams,
  options: UseRaribleSellOrderOptions = {},
) => {
  const { Moralis } = useMoralis();

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.RARIBLE,
    Moralis.Plugins?.rarible?.createSellOrder,
    null,
    {
      chain: params.chain ?? DEFAULT_RARIBLE_NETWORK,
      userAddress: params.userAddress,
      makeTokenId: params.makeTokenId,
      makeTokenAddress: params.makeTokenAddress,
      makeAssetClass: params.makeAssetClass,
      makeValue: params.makeValue,
      takeAssetClass: params.takeAssetClass,
      takeValue: params.takeValue,
    },
    options,
    false,
  );

  return { createSellOrder: fetch, data, isFetching, isLoading, error };
};

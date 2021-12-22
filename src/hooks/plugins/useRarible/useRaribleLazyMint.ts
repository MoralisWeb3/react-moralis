import { useMoralis } from "../../core/useMoralis";
import { Plugin } from "../../../config";
import { UseResolveCallOptions } from "../../internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";
import {
  DEFAULT_RARIBLE_NETWORK,
  RaribleNetwork,
  RaribleTokenType,
} from "./types";

export interface UseRaribleLazyMintParams {
  chain?: RaribleNetwork;
  userAddress: string;
  tokenType: RaribleTokenType;
  tokenUri: string;
  supply: number;
  royaltiesAmount?: number;
}
export interface UseRaribleLazyMintOptions extends UseResolveCallOptions {}

export const useRaribleLazyMint = (
  params: UseRaribleLazyMintParams,
  options: UseRaribleLazyMintOptions = {},
) => {
  const { Moralis } = useMoralis();

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.RARIBLE,
    Moralis.Plugins?.rarible?.lazyMint,
    null,
    {
      chain: params.chain ?? DEFAULT_RARIBLE_NETWORK,
      userAddress: params.userAddress,
      tokenType: params.tokenType,
      tokenUri: params.tokenUri,
      supply: params.supply,
      royaltiesAmount: params.royaltiesAmount,
    },
    options,
    false,
  );

  return { lazyMint: fetch, data, isFetching, isLoading, error };
};

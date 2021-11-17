import { useMemo } from "react";
import MoralisType from "moralis";
import { useMoralis } from "../../core/useMoralis";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  UseMoralisWeb3ApiCallOptions,
} from "../../core/useMoralisWeb3Api";
import { resolveIPFS } from "../../../functions/resolveIPFS";
import { DEFAULT_API_CHAIN } from "../../../config";
import { isValidApiChain } from "../../../utils/isValidApiChain";

export interface UseNFTBalancesParams
  extends Omit<
    Parameters<typeof MoralisType.Web3API["account"]["getNFTs"]>[0],
    "address"
  > {
  address?: string;
}

export const useNFTBalances = (
  params?: UseNFTBalancesParams,
  options?: UseMoralisWeb3ApiCallOptions,
) => {
  const {
    account: { getNFTs },
  } = useMoralisWeb3Api();
  const { chainId, account } = useMoralis();

  const {
    fetch: getNFTBalances,
    data,
    error,
    isLoading,
    isFetching,
  } = useMoralisWeb3ApiCall(
    getNFTs,
    {
      chain: params?.chain ?? isValidApiChain(chainId) ?? DEFAULT_API_CHAIN,
      address: params?.address ?? account ?? "",
      ...params,
    },
    { autoFetch: options?.autoFetch ?? !!account, ...options },
  );

  const balances = useMemo(() => {
    if (!data?.result || !data?.result.length) {
      return data;
    }

    const formattedResult = data.result.map((nft) => {
      try {
        if (nft.metadata) {
          const metadata = JSON.parse(nft.metadata);
          const image = resolveIPFS(metadata?.image);
          return { ...nft, image, metadata };
        }
      } catch (error) {
        return nft;
      }
      return nft;
    });

    return { ...data, result: formattedResult };
  }, [data]);

  return { getNFTBalances, data: balances, error, isLoading, isFetching };
};

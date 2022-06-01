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

export interface UseNFTTokenIdsParams
  extends Omit<
    Parameters<typeof MoralisType.Web3API["token"]["getAllTokenIds"]>[0],
    "address" | "limit"
  > {
  address: string;
  limit?: number;
}

export const useNFTTokenIds = (
  params?: UseNFTTokenIdsParams,
  options?: UseMoralisWeb3ApiCallOptions,
) => {
  const { token } = useMoralisWeb3Api();
  const { chainId } = useMoralis();

  const {
    fetch: getNFTTokenIds,
    data,
    error,
    isLoading,
    isFetching,
  } = useMoralisWeb3ApiCall(
    token.getAllTokenIds,
    {
      chain: params?.chain ?? isValidApiChain(chainId) ?? DEFAULT_API_CHAIN,
      address: params?.address ?? "",
      limit: params?.limit ?? 5,
      ...params,
    },
    { autoFetch: options?.autoFetch ?? !!token, ...options },
  );

  const NFTTokenIds = useMemo(() => {
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

  return { getNFTTokenIds, data: NFTTokenIds, error, isLoading, isFetching };
};

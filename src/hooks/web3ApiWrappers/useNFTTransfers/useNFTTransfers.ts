import MoralisType from "moralis-v1";
import { useMoralis } from "../../core/useMoralis";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  UseMoralisWeb3ApiCallOptions,
} from "../../core/useMoralisWeb3Api";
import { DEFAULT_API_CHAIN } from "../../../config";
import { isValidApiChain } from "../../../utils/isValidApiChain";

export interface UseNFTTransfersParams
  extends Omit<
    Parameters<typeof MoralisType.Web3API["account"]["getTokenTransfers"]>[0],
    "address"
  > {
  address?: string;
}

export const useNFTTransfers = (
  params?: UseNFTTransfersParams,
  options?: UseMoralisWeb3ApiCallOptions,
) => {
  const {
    account: { getNFTTransfers },
  } = useMoralisWeb3Api();
  const { chainId, account } = useMoralis();

  const { fetch, data, error, isLoading, isFetching } = useMoralisWeb3ApiCall(
    getNFTTransfers,
    {
      chain: params?.chain ?? isValidApiChain(chainId) ?? DEFAULT_API_CHAIN,
      address: params?.address ?? account ?? "",
      ...params,
    },
    { autoFetch: options?.autoFetch ?? !!account, ...options },
  );

  return { getNFTTransfers: fetch, data, error, isLoading, isFetching };
};

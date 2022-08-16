import MoralisType from "moralis-v1";
import { useMoralis } from "../../core/useMoralis";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  UseMoralisWeb3ApiCallOptions,
} from "../../core/useMoralisWeb3Api";
import { DEFAULT_API_CHAIN } from "../../../config";
import { isValidApiChain } from "../../../utils/isValidApiChain";

export interface UseNativeTransactionsParams
  extends Omit<
    Parameters<typeof MoralisType.Web3API["account"]["getTransactions"]>[0],
    "address"
  > {
  address?: string;
}

export const useNativeTransactions = (
  params: UseNativeTransactionsParams,
  options?: UseMoralisWeb3ApiCallOptions,
) => {
  const {
    account: { getTransactions },
  } = useMoralisWeb3Api();
  const { chainId, account } = useMoralis();

  const {
    fetch: getNativeTransations,
    data,
    error,
    isLoading,
    isFetching,
  } = useMoralisWeb3ApiCall(
    getTransactions,
    {
      chain: params?.chain ?? isValidApiChain(chainId) ?? DEFAULT_API_CHAIN,
      address: params?.address ?? account ?? "",
      ...params,
    },
    { autoFetch: options?.autoFetch ?? !!account, ...options },
  );

  return {
    getNativeTransations,
    data,
    chainId,
    error,
    isLoading,
    isFetching,
  };
};

import { useMoralis } from "../../core/useMoralis";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  UseMoralisWeb3ApiCallOptions,
} from "../../core/useMoralisWeb3Api";
import { DEFAULT_API_CHAIN } from "../../../config";
import MoralisType from "moralis";
import { isValidApiChain } from "../../../utils/isValidApiChain";

export interface UseERC20BalancesParams
  extends Omit<
    Parameters<typeof MoralisType.Web3API["account"]["getTokenTransfers"]>[0],
    "address"
  > {
  address?: string;
}

export const useERC20Balances = (
  params?: UseERC20BalancesParams,
  options?: UseMoralisWeb3ApiCallOptions,
) => {
  const {
    account: { getTokenBalances },
  } = useMoralisWeb3Api();
  const { account, chainId } = useMoralis();

  const { fetch, data, isLoading, isFetching, error } = useMoralisWeb3ApiCall(
    getTokenBalances,
    {
      chain: params?.chain ?? isValidApiChain(chainId) ?? DEFAULT_API_CHAIN,
      address: params?.address ?? account ?? "",
      ...params,
    },
    { autoFetch: options?.autoFetch ?? !!account, ...options },
  );

  return {
    fetchERC20Balances: fetch,
    data,
    isLoading,
    isFetching,
    error,
  };
};

import MoralisType from "moralis/types";
import { useMemo } from "react";
import { DEFAULT_API_CHAIN } from "../../../config";
import { isValidApiChain } from "../../../utils/isValidApiChain";
import { useMoralis } from "../../core/useMoralis";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  UseMoralisWeb3ApiCallOptions,
} from "../../core/useMoralisWeb3Api";
import { tokenValueTxt } from "../../../utils/formatters";
import { getChain } from "../../../functions/chains";

export interface UseNativeBalancesParams
  extends Omit<
    Parameters<typeof MoralisType.Web3API["account"]["getNativeBalance"]>[0],
    "address"
  > {
  address?: string;
}

export const useNativeBalance = (
  params?: UseNativeBalancesParams,
  options?: UseMoralisWeb3ApiCallOptions,
) => {
  const {
    account: { getNativeBalance },
  } = useMoralisWeb3Api();
  const { chainId, account } = useMoralis();

  const nativeToken = useMemo(() => {
    const chainData = getChain(
      params?.chain ?? isValidApiChain(chainId) ?? DEFAULT_API_CHAIN,
    );

    if (!chainData) {
      return null;
    }

    return chainData.nativeCurrency;
  }, [params, chainId]);

  const { fetch, data, error, isLoading, isFetching } = useMoralisWeb3ApiCall(
    getNativeBalance,
    {
      chain: params?.chain ?? isValidApiChain(chainId) ?? DEFAULT_API_CHAIN,
      address: params?.address ?? account ?? "",
      ...params,
    },
    { autoFetch: options?.autoFetch ?? !!account, ...options },
  );

  const formatted = useMemo(() => {
    if (!nativeToken || !data) {
      return null;
    }
    return tokenValueTxt(
      data.balance,
      nativeToken.decimals,
      nativeToken.symbol,
    );
  }, [data, nativeToken]);

  return {
    getBalances: fetch,
    data: {
      balance: data?.balance,
      formatted,
    },
    nativeToken,
    error,
    isLoading,
    isFetching,
  };
};

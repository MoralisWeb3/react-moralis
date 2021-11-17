import { useMemo } from "react";
import MoralisType from "moralis";
import { tokenValueTxt, toUsd } from "../../../utils/formatters";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  UseMoralisWeb3ApiCallOptions,
} from "../../core/useMoralisWeb3Api";
import { useMoralis } from "../../core/useMoralis";
import { DEFAULT_API_CHAIN } from "../../../config";
import { isValidApiChain } from "../../../utils/isValidApiChain";

export type UseTokenPriceParams = Parameters<
  typeof MoralisType.Web3API["token"]["getTokenPrice"]
>[0];

export const useTokenPrice = (
  params: UseTokenPriceParams,
  options?: UseMoralisWeb3ApiCallOptions,
) => {
  const {
    token: { getTokenPrice },
  } = useMoralisWeb3Api();
  const { chainId } = useMoralis();

  const { fetch, data, error, isFetching, isLoading } = useMoralisWeb3ApiCall(
    getTokenPrice,
    {
      chain: params?.chain ?? isValidApiChain(chainId) ?? DEFAULT_API_CHAIN,
      ...params,
    },
    { autoFetch: options?.autoFetch ?? true, ...options },
  );

  const formattedData = useMemo(() => {
    if (!data) {
      return null;
    }

    const { value, decimals, symbol } = data.nativePrice ?? {};
    const formatted = {
      ...data,
      formattedUsd: toUsd(data.usdPrice),
      formattedNative: value
        ? tokenValueTxt(value, decimals ?? 0, symbol ?? "")
        : null,
    };

    return formatted;
  }, [data]);

  return {
    fetchTokenPrice: fetch,
    data: formattedData,
    error,
    isLoading,
    isFetching,
  };
};

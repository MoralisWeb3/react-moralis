/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { DefaultHookParams } from "../../interfaces/default-hook-params";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { UseCustomResolverOptions } from "../useCustomResolver";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "../useMoralisWeb3Api";

export const useNativeTransactions = (
  params: DefaultHookParams,
  options?: UseCustomResolverOptions,
) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const [nativeTransactions, setNativeTransactions] = useState([]);
  const {
    fetch: getNativeTransations,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(
    account.getTransactions,
    {
      // chain: chainId,
      ...params,
      address: params.chain,
    },
    options,
  );

  useEffect(() => {
    if (data) {
      setNativeTransactions(data.result as any);
    }
  }, [data]);

  return {
    getNativeTransations,
    nativeTransactions,
    chainId,
    error,
    isLoading,
  };
};

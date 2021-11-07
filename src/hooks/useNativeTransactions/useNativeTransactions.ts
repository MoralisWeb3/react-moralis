import { useEffect, useState } from "react";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "../useMoralisWeb3Api";

export const useNativeTransactions = (options: any) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const [nativeTransactions, setNativeTransactions] = useState([]);
  const {
    fetch: getNativeTransations,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getTransactions, {
    chain: chainId,
    ...options,
  });

  useEffect(() => {
    if (data) {
      // setNativeTransactions(data.result as Array<Record<string, any>>);
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

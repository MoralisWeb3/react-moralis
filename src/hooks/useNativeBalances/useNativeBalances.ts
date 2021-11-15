/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";
import { getNativeByChain } from "../../helpers/networks";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { UseCustomResolverOptions } from "../useCustomResolver";
import { useMoralis } from "../useMoralis";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "../useMoralisWeb3Api";

export const useNativeBalances = (
  params: any,
  options: UseCustomResolverOptions,
) => {
  const { account } = useMoralisWeb3Api();
  const { Moralis } = useMoralis();
  const { chainId, walletAddress } = useMoralisDapp();
  const [balance, setBalances] = useState({ inWei: "", formatted: 0 });

  const nativeName = useMemo(
    () => getNativeByChain(params?.chain || chainId),
    [params, chainId],
  );

  const {
    fetch: getBalances,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(
    account.getNativeBalance,
    {
      chain: chainId,
      address: walletAddress,
      ...params,
    },
    options,
  );

  useEffect(() => {
    if (data?.balance) {
      const balances = {
        inWei: data.balance,
        // missing second argument (decimals) in FromWei function,
        formatted: Moralis.Units.FromWei(data.balance, 18),
      };
      setBalances(balances);
    }
  }, [data]);

  return { getBalances, balance, nativeName, error, isLoading };
};

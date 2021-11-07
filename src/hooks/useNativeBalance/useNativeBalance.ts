/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";
import { getNativeByChain } from "../../helpers/networks";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "../useMoralis";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "../useMoralisWeb3Api";

export const useNativeBalance = (options: any) => {
  const { account } = useMoralisWeb3Api();
  const { Moralis } = useMoralis();
  const { chainId, walletAddress } = useMoralisDapp();
  const [balance, setBalance] = useState({ inWei: "", formatted: 0 });

  const nativeName = useMemo(
    () => getNativeByChain(options?.chain || chainId),
    [options, chainId],
  );

  const {
    fetch: getBalance,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getNativeBalance, {
    chain: chainId,
    address: walletAddress,
    ...options,
  });

  useEffect(() => {
    if (data?.balance) {
      const balances = {
        inWei: data.balance,
        // missing second argument (decimals) in FromWei function,
        formatted: Moralis.Units.FromWei(data.balance, 18),
      };
      setBalance(balances);
    }
  }, [data]);

  return { getBalance, balance, nativeName, error, isLoading };
};

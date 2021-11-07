/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "../useMoralis";
import { useMoralisWeb3Api } from "../useMoralisWeb3Api";

export const useERC20Transfers = () => {
  const { account } = useMoralisWeb3Api();
  const { walletAddress, chainId } = useMoralisDapp();
  const { isInitialized } = useMoralis();
  const [ERC20Transfers, setERC20Transfers] = useState([]);

  useEffect(() => {
    if (isInitialized)
      fetchERC20Transfers()
        .then((result: any) => setERC20Transfers(result))
        .catch((e) => alert(e.message));
  }, [isInitialized, chainId, walletAddress]);

  const fetchERC20Transfers = async () => {
    return await account
      .getTokenTransfers({ address: walletAddress, chain: chainId as any })
      .then((result) => result)
      .catch((e) => alert(e.message));
  };
  return { fetchERC20Transfers, ERC20Transfers };
};

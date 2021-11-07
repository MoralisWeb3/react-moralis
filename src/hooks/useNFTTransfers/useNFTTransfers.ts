import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "..";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";

export const useNFTTransfers = (options: any) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const [NFTTransfers, setNFTTransfers] = useState([]);
  const {
    fetch: getNFTTransfers,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getNFTTransfers, {
    chain: chainId,
    ...options,
  });

  useEffect(() => {
    if (data) {
      setNFTTransfers(data?.result as any);
    }
  }, [data]);

  return { getNFTTransfers, NFTTransfers, error, isLoading };
};

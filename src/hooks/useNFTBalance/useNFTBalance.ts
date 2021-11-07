import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useIPFS, useMoralisWeb3ApiCall } from "..";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";

export const useNFTBalance = (options: any) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const { resolveLink } = useIPFS();
  const [NFTBalance, setNFTBalance] = useState([]);
  const {
    fetch: getNFTBalance,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getNFTs, { chain: chainId, ...options });

  useEffect(() => {
    let NFTdata: any = {};
    if (data?.result) {
      const NFTs = data.result;
      for (const NFT of NFTs) {
        if (NFT?.metadata) {
          const metadata = JSON.parse(NFT.metadata);
          // metadata is a string type
          const image = resolveLink(metadata?.image);

          NFTdata = { ...NFT, image };
        }
      }
      setNFTBalance(NFTdata);
    }
  }, [data]);

  return { getNFTBalance, NFTBalance, error, isLoading };
};

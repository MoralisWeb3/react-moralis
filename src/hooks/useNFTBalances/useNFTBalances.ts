/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useIPFS, useMoralisWeb3ApiCall } from "..";
import { DefaultHookParams } from "../../interfaces/default-hook-params";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { UseCustomResolverOptions } from "../useCustomResolver";

export const useNFTBalances = (
  params: DefaultHookParams,
  options?: UseCustomResolverOptions,
) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const { resolveLink } = useIPFS();
  const [NFTBalances, setNFTBalances] = useState([]);

  if (!params.chain) {
    params.chain = chainId as any;
  }

  const {
    fetch: getNFTBalances,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getNFTs, { ...params }, options);

  useEffect(() => {
    let NFTdata: any = {};
    if (data?.result) {
      const NFTs = data.result;
      for (const NFT of NFTs) {
        if (NFT?.metadata) {
          const metadata = JSON.parse(NFT.metadata);
          const image = resolveLink(metadata?.image);
          NFTdata = { ...NFT, image };
        }
      }
      setNFTBalances(NFTdata);
    }
  }, [data]);

  return { getNFTBalances, NFTBalances, error, isLoading };
};

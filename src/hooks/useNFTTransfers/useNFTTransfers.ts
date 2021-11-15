import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "..";
import { DefaultHookParams } from "../../interfaces/default-hook-params";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { UseCustomResolverOptions } from "../useCustomResolver";

export const useNFTTransfers = (
  params: DefaultHookParams,
  options?: UseCustomResolverOptions,
) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const [NFTTransfers, setNFTTransfers] = useState([]);

  if (!params.chain) {
    params.chain = chainId as any;
  }

  const {
    fetch: getNFTTransfers,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(
    account.getNFTTransfers,
    {
      ...params,
    },
    options,
  );

  useEffect(() => {
    if (data) {
      setNFTTransfers(data?.result as any);
    }
  }, [data]);

  return { getNFTTransfers, NFTTransfers, error, isLoading };
};

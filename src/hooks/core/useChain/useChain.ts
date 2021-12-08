import { useMemo } from "react";
import { getChain } from "../../../functions/chains";
import { useMoralis } from "../useMoralis";

export const useChain = () => {
  const { Moralis, chainId, account } = useMoralis();

  const switchNetwork = async (providedChainId: string) => {
    try {
      await Moralis.Web3.switchNetwork(providedChainId);
    } catch (error) {
      if (error.code === 4902) {
        const chainData = getChain(providedChainId);

        if (!chainData) {
          throw new Error(
            `Chain ${providedChainId} not supported or is not specified`,
          );
        }
        const { chainId, name, nativeCurrency, rpc, blockExplorerUrl } =
          chainData;

        await Moralis.Web3.addNetwork(
          chainId,
          name,
          nativeCurrency.name,
          nativeCurrency.symbol,
          rpc[0],
          blockExplorerUrl ?? "",
        );
      }else if(!account){
        throw new Error(
            'Please link the account first',
          );
      } else {
        throw error;
      }
    }
  };

  const chain = useMemo(() => {
    if (!chainId) {
      return null;
    }
    return getChain(chainId);
  }, [chainId]);

  return { switchNetwork, chainId, chain, account };
};

export default useChain;

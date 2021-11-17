import { getChain } from "../../../functions/chains";
import { useMoralis } from "../useMoralis";

export const useChain = () => {
  const { Moralis, isWeb3Enabled, enableWeb3, chainId, account } = useMoralis();

  async function switchNetwork(providedChainId: string) {
    if (isWeb3Enabled) {
      try {
        await Moralis.Web3.switchNetwork(providedChainId);
      } catch (error) {
        if (error.code === 4902) {
          try {
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
          } catch (error) {
            alert(error.message);
          }
        }
      }
    } else {
      enableWeb3();
    }
  }
  return { switchNetwork, chainId, account };
};

export default useChain;

import { supportedChains } from "../config";
import { blockExplorers } from "../data/blockExplorers";
import chains from "../data/chains";
import { decimalToHexString } from "../utils/formatters";

export const getSupportedChains = () => {
  return chains
    .filter((chain) =>
      supportedChains.includes(decimalToHexString(chain.chainId)),
    )
    .map((chainData) => ({
      ...chainData,
      chainId: decimalToHexString(chainData.chainId),
      blockExplorerUrl: blockExplorers[decimalToHexString(chainData.chainId)],
    }));
};

export const getChain = (chainId: string) => {
  return getSupportedChains().find((chain) => chain.chainId === chainId);
};

import { ApiChain } from "../config/";

export const isValidApiChain = (chain?: string | null) => {
  if (!chain) {
    return null;
  }
  // TODO: add check if chain is in provided list
  return chain as ApiChain;
};

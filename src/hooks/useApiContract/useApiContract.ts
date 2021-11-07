/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMoralis } from "../useMoralis";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "../useMoralisWeb3Api";

export interface APIContractOptions {
  chain: string;
  functionName: string;
  address: string;
  abi: Array<Record<string, any>>;
}

export const useAPIContract = (options: APIContractOptions) => {
  const { native } = useMoralisWeb3Api();

  const { functionName, address, abi, chain } = options;

  const payload = {
    chain: chain as any,
    function_name: functionName,
    address,
    abi,
  };

  const {
    fetch: runContractFunction,
    data: contractResponse,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(native.runContractFunction, payload);

  return { runContractFunction, contractResponse, error, isLoading };
};

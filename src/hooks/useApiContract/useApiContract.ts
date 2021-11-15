import { DefaultHookParams } from "../../interfaces/default-hook-params";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "../useMoralisWeb3Api";

export interface APIContractOptions extends DefaultHookParams {
  functionName: string;
  abi: Array<Record<string, unknown>>;
  params: Record<string, unknown>;
}

export const useAPIContract = (options: APIContractOptions) => {
  const { native } = useMoralisWeb3Api();

  const { functionName, address, abi, chain, params } = options;

  const payload = {
    chain,
    function_name: functionName,
    address,
    abi,
    params,
  };

  const {
    fetch: runContractFunction,
    data,
    error,
    isFetching,
    isLoading,
  } = useMoralisWeb3ApiCall(native.runContractFunction, payload);

  return { runContractFunction, data, error, isLoading, isFetching };
};

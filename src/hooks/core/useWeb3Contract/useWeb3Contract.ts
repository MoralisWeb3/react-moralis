import {
  useWeb3ExecuteFunction,
  Web3ExecuteFunctionParameters,
} from "../useWeb3ExecuteFunction";

export const useWeb3Contract = (params: Web3ExecuteFunctionParameters) => {
  const {
    data,
    error,
    fetch: runContractFunction,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction(params);

  return { runContractFunction, data, error, isFetching, isLoading };
};

import {
  useWeb3ExecuteFunction,
  Web3ExecuteFunctionParameters,
} from "../useWeb3ExecuteFunction";

export const useWeb3Contract = (params: Web3ExecuteFunctionParameters) => {
  const {
    data: contractResponse,
    error,
    fetch: runContractFunction,
    isFetching: isRunning,
    isLoading,
  } = useWeb3ExecuteFunction(params);

  return { runContractFunction, contractResponse, error, isRunning, isLoading };
};

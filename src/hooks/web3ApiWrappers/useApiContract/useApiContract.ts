import MoralisType from "moralis/types";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  UseMoralisWeb3ApiCallOptions,
} from "../../core/useMoralisWeb3Api";

export interface ApiContractParams
  extends Omit<
    Parameters<typeof MoralisType.Web3API["native"]["runContractFunction"]>[0],
    "address"
  > {
  address?: string;
  // TODO: fix types
  functionName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}

export const useApiContract = (
  // TODO: fix types
  { functionName, address, abi, chain, params }: ApiContractParams,
  options: UseMoralisWeb3ApiCallOptions = {},
) => {
  const { native } = useMoralisWeb3Api();

  const payload = {
    abi,
    chain,
    function_name: functionName,
    address,
    params,
  };

  const {
    fetch: runContractFunction,
    data,
    error,
    isFetching,
    isLoading,
    // @ts-ignore
    // TODO: fix typings of payload and optional address
  } = useMoralisWeb3ApiCall(native.runContractFunction, payload, {
    autoFetch: options.autoFetch ?? false,
    ...options,
  });

  return { runContractFunction, data, error, isLoading, isFetching };
};

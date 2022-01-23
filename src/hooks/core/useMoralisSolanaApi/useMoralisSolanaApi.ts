import {
  ResolveCallParams,
  UseResolveCallOptions,
  _useResolveCall,
} from "../../internal/_useResolveAsyncCall";
import { useMoralis } from "../useMoralis";

export interface UseMoralisSolanaApiCallOptions extends UseResolveCallOptions {}

export const useMoralisSolanaCall = <Params extends ResolveCallParams, Result>(
  call: (params: Params) => Promise<Result>,
  params?: Params,
  options?: UseMoralisSolanaApiCallOptions,
) => {
  const result = _useResolveCall<Result | null, Params>(
    call,
    null,
    params,
    options,
    false,
  );

  return result;
};

export const useMoralisSolanaApi = () => {
  const { Moralis } = useMoralis();

  return { SolanaAPI: Moralis.SolanaAPI, ...Moralis.SolanaAPI };
};

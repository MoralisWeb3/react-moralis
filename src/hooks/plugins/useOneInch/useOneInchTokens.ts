import { useMoralis } from "../../core/useMoralis";
import { DEFAULT_API_CHAIN, Plugin } from "../../../config";
import { UseResolveCallOptions } from "../../internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";

interface UseOneInchTokensParams {
  chain?: string;
}
interface UseOneInchTokensOptions extends UseResolveCallOptions {}

export const useOneInchTokens = (
  { chain }: UseOneInchTokensParams = {},
  options: UseOneInchTokensOptions = {},
) => {
  const { Moralis, isInitialized } = useMoralis();

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.ONE_INCH,
    Moralis.Plugins?.oneInch?.getSupportedTokens,
    [],
    { chain: chain ?? DEFAULT_API_CHAIN },
    options,
    isInitialized,
  );

  return { getSupportedTokens: fetch, data, isFetching, isLoading, error };
};

import { useMoralis } from "../../core/useMoralis";
import { Plugin } from "../../../config";
import { UseResolveCallOptions } from "../../internal/_useResolveAsyncCall";
import { _useResolvePluginCall } from "../../internal/_useResolvePluginCall";
import { useCallback } from "react";

export interface UseFiatBuyParams {
  coin?: string;
  receiver?: string;
}
export interface UseFiatBuyOptions extends UseResolveCallOptions {
  disableTriggers?: boolean;
}

export const useFiatBuy = (
  params: UseFiatBuyParams = {},
  { disableTriggers, ...options }: UseFiatBuyOptions = {},
) => {
  const { Moralis } = useMoralis();

  const doBuyCall = useCallback(
    (params: { coin?: string; receiver?: string }) => {
      return Moralis.Plugins?.fiat?.buy(params, { disableTriggers });
    },
    [disableTriggers],
  );

  const { fetch, data, isFetching, isLoading, error } = _useResolvePluginCall(
    Plugin.FIAT,
    doBuyCall,
    null,
    {
      coin: params.coin,
      receiver: params.receiver,
    },
    options,
    false,
  );

  return { buy: fetch, data, isFetching, isLoading, error };
};

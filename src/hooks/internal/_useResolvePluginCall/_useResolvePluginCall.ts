import { useCallback } from "react";
import { useMoralis } from "../../core/useMoralis";
import { Plugin } from "../../../config/index";
import {
  ResolveCallParams,
  UseResolveCallOptions,
  _useResolveCall,
} from "../_useResolveAsyncCall";

export const _useResolvePluginCall = <Result, Params extends ResolveCallParams>(
  plugin: Plugin,
  call: (params: Params) => Promise<Result>,
  initialData: Result,
  params?: Params,
  options?: UseResolveCallOptions,
  defaultAutoFetch = true,
  providedValidate?: (params: Params) => string | undefined | null,
) => {
  const { Moralis, isInitialized, isInitializing } = useMoralis();

  const validate = useCallback(
    (params: Params) => {
      if (!isInitialized && isInitializing) {
        return "Plugins are not finished initializing";
      }

      if (!isInitialized) {
        return "Moralis has not been initialized, run Moralis.start first";
      }

      if (!Moralis?.Plugins || !Moralis?.Plugins[plugin]) {
        return `${plugin} plugin has not been installed or initialized`;
      }

      if (providedValidate) {
        return providedValidate(params);
      }
    },
    [plugin, isInitialized, isInitializing, providedValidate],
  );

  return _useResolveCall(
    call,
    initialData,
    params,
    options,
    defaultAutoFetch,
    validate,
  );
};

import { useCallback, useEffect, useMemo, useState } from "react";
import MoralisBrowser from "moralis";
import MoralisNative from "moralis/react-native";
import { ReactMoralisError } from "../../Errors";

export type Environment = "browser" | "native";
// TODO: get type from moralis-sdk
export interface PluginSpecs {
  name: string;
  functions: string[];
}
const getMoralis = (environment: Environment) => {
  switch (environment) {
    case "browser":
      return MoralisBrowser;
      break;
    case "native":
      return MoralisNative;
    default:
      return MoralisBrowser;
  }
};
/**
 * Hook that handles the initialization of Moralis
 */
export const _useMoralisInit = ({
  appId,
  serverUrl,
  jsKey,
  dangerouslyUseOfMasterKey,
  plugins,
  environment = "browser",
}: {
  appId: string;
  serverUrl: string;
  jsKey?: string;
  dangerouslyUseOfMasterKey?: string;
  plugins?: PluginSpecs[];
  environment?: "browser" | "native";
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const Moralis = useMemo(() => getMoralis(environment), [environment]);

  const initialize = useCallback(
    async ({
      serverUrl,
      appId,
      javascriptKey,
      masterKey,
      plugins,
    }: {
      serverUrl: string;
      appId: string;
      javascriptKey?: string;
      masterKey?: string;
      plugins?: PluginSpecs[];
    }) => {
      if (isInitialized) {
        return;
      }

      if (!appId) {
        throw new ReactMoralisError(
          `Provide a "appId" provided to <MoralisProvider>`,
        );
      }

      if (!serverUrl) {
        throw new ReactMoralisError(
          `Provide a "serverUrl" provided to <MoralisProvider>`,
        );
      }

      setIsInitializing(true);
      await Moralis.start({
        serverUrl,
        appId,
        javascriptKey,
        masterKey,
        plugins,
      });
      setIsInitializing(false);
      setIsInitialized(true);
    },
    [],
  );

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    initialize({
      appId,
      serverUrl,
      masterKey: dangerouslyUseOfMasterKey,
      javascriptKey: jsKey,
      plugins,
    });

    setIsInitialized(true);
  }, [
    appId,
    serverUrl,
    dangerouslyUseOfMasterKey,
    jsKey,
    plugins,
    isInitialized,
  ]);

  return { isInitialized, isInitializing, Moralis, environment };
};

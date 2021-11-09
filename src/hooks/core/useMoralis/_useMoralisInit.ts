import { useCallback, useEffect, useRef, useState } from "react";
import MoralisImport from "moralis";
import { ReactMoralisError } from "../../../Errors";

export type Environment = "browser" | "native";
// TODO: get type from moralis-sdk
export interface PluginSpecs {
  name: string;
  functions: string[];
}

// TODO: fix any import (error: Types have separate declarations of a private property '_address)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetMoralis = () => any;

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
  getMoralis = () => MoralisImport,
  web3Library,
}: {
  appId: string;
  serverUrl: string;
  jsKey?: string;
  dangerouslyUseOfMasterKey?: string;
  plugins?: PluginSpecs[];
  environment?: "browser" | "native";
  getMoralis?: GetMoralis;
  web3Library?: unknown;
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const Moralis = useRef(getMoralis());

  const initialize = useCallback(
    async ({
      serverUrl,
      appId,
      javascriptKey,
      masterKey,
      plugins,
      web3Library,
    }: {
      serverUrl: string;
      appId: string;
      javascriptKey?: string;
      masterKey?: string;
      plugins?: PluginSpecs[];
      web3Library?: unknown;
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
      await Moralis.current.start({
        serverUrl,
        appId,
        javascriptKey,
        masterKey,
        plugins,
        web3Library,
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
      web3Library,
    });

    setIsInitialized(true);
  }, [
    appId,
    serverUrl,
    dangerouslyUseOfMasterKey,
    jsKey,
    plugins,
    isInitialized,
    web3Library,
  ]);

  return {
    isInitialized,
    isInitializing,
    Moralis: Moralis.current,
    environment,
  };
};

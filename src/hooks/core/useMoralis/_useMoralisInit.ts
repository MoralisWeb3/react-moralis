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
  initializeOnMount,
}: {
  appId?: string | null;
  serverUrl?: string | null;
  jsKey?: string;
  dangerouslyUseOfMasterKey?: string;
  plugins?: PluginSpecs[];
  environment?: "browser" | "native";
  getMoralis?: GetMoralis;
  initializeOnMount: boolean;
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [shouldInitialize, setShouldInitialize] = useState(false);
  const Moralis = useRef(getMoralis());

  const _initialize = useCallback(
    async ({
      serverUrl,
      appId,
      javascriptKey,
      masterKey,
      plugins,
    }: {
      serverUrl?: null | string;
      appId?: null | string;
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
      await Moralis.current.start({
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
    //@ts-ignore
    if (isInitialized) {
      return;
    }

    if (!initializeOnMount && !shouldInitialize) {
      return;
    }

    _initialize({
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
    initializeOnMount,
    shouldInitialize,
  ]);

  const initialize = useCallback(() => {
    setShouldInitialize(true);
  }, []);

  return {
    isInitialized,
    isInitializing,
    initialize,
    Moralis: Moralis.current,
    environment,
  };
};

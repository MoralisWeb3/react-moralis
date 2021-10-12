import { useCallback, useEffect, useState } from "react";
import { Moralis } from "moralis";
import { ReactMoralisError } from "../../Errors";

/**
 * Hook that handles the initialization of Moralis
 */
export const _useMoralisInit = ({
  appId,
  serverUrl,
  jsKey,
  dangerouslyUseOfMasterKey,
}: {
  appId: string;
  serverUrl: string;
  jsKey?: string;
  dangerouslyUseOfMasterKey?: string;
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const initialize = useCallback(
    async ({ serverUrl, appId }: { serverUrl: string; appId: string }) => {
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
      await Moralis.start({ serverUrl, appId });
      setIsInitializing(false);
      setIsInitialized(true);
    },
    [],
  );

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    initialize({ appId, serverUrl });

    setIsInitialized(true);
  }, [appId, serverUrl, isInitialized]);

  return { isInitialized, isInitializing };
};

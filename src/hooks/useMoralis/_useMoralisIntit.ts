import { useEffect, useState } from "react";
import Moralis from "moralis";
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

  useEffect(() => {
    if (!appId || !serverUrl) {
      throw new ReactMoralisError("Provide a valid key  <MoralisProvider>. ");
    }

    if (isInitialized) {
      return;
    }

    Moralis.initialize(appId, jsKey, dangerouslyUseOfMasterKey);
    Moralis.serverURL = serverUrl;

    setIsInitialized(true);
  }, [appId, serverUrl, isInitialized]);

  return { isInitialized };
};

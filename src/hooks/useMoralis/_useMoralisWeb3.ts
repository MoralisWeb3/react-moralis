import { useState, useCallback, useEffect } from "react";
import { Moralis } from "moralis";

/**
 * Handles enabling of web3 and providing it, as soon as the user is authenticated
 */
export const _useMoralisWeb3 = (isAuthenticated: boolean) => {
  const [web3, setWeb3] = useState<Moralis.Web3 | null>(null);

  /**
   * Enable web3 with the browsers web3Provider (only available when a user has been authenticated)
   */
  const enableWeb3 = useCallback(async () => {
    if (!web3) {
      try {
        const currentWeb3 = await (Moralis as any).Web3.enable();
        setWeb3(currentWeb3);
      } catch (error) {
        console.error("[react-moralis]: Failed to enable web3", error);
      }
    }
  }, []);

  /**
   * Try to enable web as soon as a user is authenticated
   */
  useEffect(() => {
    if (isAuthenticated) {
      enableWeb3();
    }
  }, [isAuthenticated]);

  return { enableWeb3, web3 };
};

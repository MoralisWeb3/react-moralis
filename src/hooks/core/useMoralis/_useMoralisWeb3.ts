import { useState, useCallback, useMemo, useEffect } from "react";
import MoralisType from "moralis";
import { MoralisWeb3 } from "src";

export type Web3Provider = "wc" | "walletconnect";
export interface Web3EnableOptions {
  onError?: (error: Error) => void;
  onSuccess?: (web3: unknown) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  provider?: Web3Provider;
  chainId?: number;
}

/**
 * Handles enabling of web3 and providing it, as soon as the user is authenticated
 */
export const _useMoralisWeb3 = (Moralis: MoralisType) => {
  const [isWeb3Enabled, _setIsWeb3Enabled] = useState(false);
  const [web3EnableError, setEnableWeb3Error] = useState<null | Error>(null);
  const [isWeb3EnableLoading, _setIsWeb3EnableLoading] = useState(false);
  const [web3, setWeb3] = useState<null | MoralisWeb3>(null);
  const [chainId, setChainId] = useState<null | string>(null);
  const [account, setAccount] = useState<null | string>(null);
  const [connector, setConnector] = useState<null | any>(null);

  useEffect(() => {
    const handleWeb3Enabled = ({
      web3,
      chainId,
      account,
      connector,
    }: {
      web3: MoralisWeb3;
      chainId: string | null;
      account: string | null;
      provider: any;
      connector: any;
    }) => {
      setWeb3(web3);
      setChainId(chainId);
      setAccount(account);
      setConnector(connector);
    };

    Moralis.Web3.on("chainChanged", setChainId);
    Moralis.Web3.on("accountChanged", setAccount);
    Moralis.Web3.on("web3Enabled", handleWeb3Enabled);

    return () => {
      Moralis.Web3.removeListener("chainChanged", setChainId);
      Moralis.Web3.removeListener("accountChanged", setAccount);
      Moralis.Web3.removeListener("web3Enabled", handleWeb3Enabled);
    };
  }, [Moralis]);

  /**
   * Enable web3 with the browsers web3Provider (only available when a user has been authenticated)
   */
  const enableWeb3 = useCallback(
    async ({
      throwOnError,
      onComplete,
      onError,
      onSuccess,
      provider,
      chainId,
    }: Web3EnableOptions = {}) => {
      _setIsWeb3EnableLoading(true);
      setEnableWeb3Error(null);

      try {
        const currentWeb3 = await Moralis.Web3.enableWeb3({
          ...(!!provider && { provider }),
          ...(!!chainId && { chainId }),
        });

        // _setWeb3(currentWeb3);
        _setIsWeb3Enabled(true);

        if (onSuccess) {
          onSuccess(currentWeb3);
        }
      } catch (error) {
        setEnableWeb3Error(error);
        if (throwOnError) {
          throw error;
        }
        if (onError) {
          onError(error);
        }
      } finally {
        _setIsWeb3EnableLoading(false);
        if (onComplete) {
          onComplete();
        }
      }
    },
    [],
  );

  const network = connector?.network;
  const connectorType = connector?.type;

  return {
    enableWeb3,
    web3,
    isWeb3Enabled,
    web3EnableError,
    isWeb3EnableLoading,
    _setIsWeb3Enabled,
    _setIsWeb3EnableLoading,
    chainId,
    account,
    network,
    connector,
    connectorType,
  };
};

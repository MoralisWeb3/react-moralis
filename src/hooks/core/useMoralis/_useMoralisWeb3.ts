import { useState, useCallback, useMemo, useEffect } from "react";
import MoralisType from "moralis";
import { MoralisWeb3 } from "src";

// TODO: import from Moralis
const ConnectorEvent = Object.freeze({
  ACCOUNT_CHANGED: "accountChanged",
  CHAIN_CHANGED: "chainChanged",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  WEB3_ENABLED: "web3Enabled",
  WEB3_DEACTIVATED: "web3Deactivated",
});

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
    const handleConnect = ({
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

    const handleDisconnect = () => {
      setWeb3(null);
      setChainId(null);
      setAccount(null);
      setConnector(null);
    };

    const unsubscribe1 = Moralis.Web3.onChainChanged(setChainId);
    const unsubscribe2 = Moralis.Web3.onAccountChanged(setAccount);
    // TODO: Make consistent (use connect/disconnect?)
    const unsubscribe3 = Moralis.Web3.on(
      ConnectorEvent.WEB3_ENABLED,
      handleConnect,
    );
    const unsubscribe4 = Moralis.Web3.on(
      ConnectorEvent.WEB3_DEACTIVATED,
      handleDisconnect,
    );
    const unsubscribe5 = Moralis.Web3.on(
      ConnectorEvent.DISCONNECT,
      handleDisconnect,
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
      // Moralis.Web3.removeListener(ConnectorEvent.CHAIN_CHANGED, setChainId);
      // Moralis.Web3.removeListener(ConnectorEvent.ACCOUNT_CHANGED, setAccount);
      // Moralis.Web3.removeListener(ConnectorEvent.WEB3_ENABLED, handleConnect);
      // Moralis.Web3.removeListener(
      //   ConnectorEvent.WEB3_DEACTIVATED,
      //   handleDisconnect,
      // );
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
      ...rest
    }: Web3EnableOptions = {}) => {
      _setIsWeb3EnableLoading(true);
      setEnableWeb3Error(null);

      try {
        // TODO: fix typechecking when passing ...rest
        // @ts-ignore
        const currentWeb3 = await Moralis.Web3.enableWeb3(rest);

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

  // TODO: resolver errors/loading state
  const deactivateWeb3 = useCallback(async () => {
    await Moralis.Web3.deactivateWeb3();
  }, []);

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
    deactivateWeb3,
  };
};

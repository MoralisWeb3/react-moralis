import { useState, useCallback, useEffect, useMemo } from "react";
import MoralisType from "moralis";

export type Web3Provider = "wc" | "walletconnect";
export interface Web3EnableOptions {
  onError?: (error: Error) => void;
  onSuccess?: (web3: MoralisType.Web3) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  provider?: Web3Provider;
  chainId?: number;
}

/**
 * Handles enabling of web3 and providing it, as soon as the user is authenticated
 */
export const _useMoralisWeb3 = (Moralis: MoralisType) => {
  const [web3, setWeb3] = useState<MoralisType.Web3 | null>(new Moralis.Web3());
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(false);
  const [web3EnableError, setEnableWeb3Error] = useState<null | Error>(null);
  const [isWeb3EnableLoading, setIsWeb3EnableLoading] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);

  // WIP: will be improved after web3 refactor
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribeOnChainChanged = Moralis.Web3.onChainChanged(function (
      chain,
    ) {
      setChainId(chain);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribeOnAccountsChanged = Moralis.Web3.onAccountsChanged(
      function (accounts) {
        const account = accounts && accounts[0] ? accounts[0] : null;
        setAccount(account);
      },
    );

    return () => {
      // TODO: implement removal of listners when implemented in refactor of web3
      // unsubscribeOnChainChanged()
      // unsubscribeOnAccountsChanged()
    };
  }, []);

  const library = useMemo(() => {
    if (!web3?.currentProvider) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return web3.currentProvider as any;
  }, [web3]);

  function fromDecimalToHex(number: number) {
    if (typeof number !== "number")
      throw "The input provided should be a number";
    return `0x${number.toString(16)}`;
  }

  function verifyChainId(chainId: string | number) {
    // Check if chainId is a number, in that case convert to hex
    if (typeof chainId === "number") chainId = fromDecimalToHex(chainId);
    return chainId;
  }

  useEffect(() => {
    if (!library?.chainId) return;
    setChainId(verifyChainId(library.chainId));
  }, [library]);

  useEffect(() => {
    async function getAccount() {
      const account = await (
        await library.request({
          method: "eth_requestAccounts",
        })
      )[0];
      setAccount(account);
    }
    if (library) getAccount();
  }, [library]);

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
      setIsWeb3EnableLoading(true);
      setEnableWeb3Error(null);

      try {
        const currentWeb3 = await Moralis.Web3.enable({
          ...(!!provider && { provider }),
          ...(!!chainId && { chainId }),
        });

        setWeb3(currentWeb3);
        setIsWeb3Enabled(true);

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
        setIsWeb3EnableLoading(false);
        if (onComplete) {
          onComplete();
        }
      }
    },
    [],
  );

  return {
    enableWeb3,
    web3,
    isWeb3Enabled,
    web3EnableError,
    isWeb3EnableLoading,
    chainId,
    account,
  };
};

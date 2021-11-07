import React, { useEffect, useState } from "react";
import { useMoralis } from "../../hooks/useMoralis";

import MoralisDappContext from "./context";

function MoralisDappProvider({ children }:{children?: any}) {
  const { web3, Moralis, user } = useMoralis();

  if(web3 == null) throw new Error("Web3 is not available");

  const [walletAddress, setWalletAddress] = useState('');
  const [chainId, setChainId] = useState('');
  useEffect(() => {
    Moralis.Web3.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.Web3.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
  }, []);

  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(
    () => setWalletAddress(web3.givenProvider?.selectedAddress || user?.get("ethAddress")),
    [web3, user]
  );

  return (
    <MoralisDappContext.Provider value={{ walletAddress, chainId }}>
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };

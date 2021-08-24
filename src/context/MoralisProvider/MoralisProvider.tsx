import React from "react";
import Moralis from "moralis";
import { MoralisContext } from "../MoralisContext";
import {
  OnAccountChanged,
  _useMoralisAuth,
} from "../../hooks/useMoralis/_useMoralisAuth";
import { _useMoralisInit } from "../../hooks/useMoralis/_useMoralisIntit";
import { _useMoralisUser } from "../../hooks/useMoralis/_useMoralisUser";
import { _useMoralisWeb3 } from "../../hooks/useMoralis/_useMoralisWeb3";

interface MoralisProviderOptions {
  onAccountChanged?: OnAccountChanged;
}

export interface MoralisProviderProps {
  children: React.ReactNode;
  appId: string;
  serverUrl: string;
  jsKey?: string;
  dangerouslyUseOfMasterKey?: string;
  options?: MoralisProviderOptions;
}

export const MoralisProvider = ({
  children,
  appId,
  jsKey,
  dangerouslyUseOfMasterKey,
  serverUrl,
  options: { onAccountChanged } = {},
}: MoralisProviderProps) => {
  const moralisInit = _useMoralisInit({
    appId,
    serverUrl,
    jsKey,
    dangerouslyUseOfMasterKey,
  });
  const { setUser, ...moralisUser } = _useMoralisUser();
  const moralisAuth = _useMoralisAuth({ onAccountChanged, setUser });
  const moralisWeb3 = _useMoralisWeb3(moralisAuth.isAuthenticated);

  return (
    <MoralisContext.Provider
      value={{
        Moralis,
        ...moralisInit,
        ...moralisAuth,
        ...moralisUser,
        ...moralisWeb3,
      }}
    >
      {children}
    </MoralisContext.Provider>
  );
};

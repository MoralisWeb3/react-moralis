import React from "react";
import { MoralisContext } from "../MoralisContext";
import {
  OnAccountChanged,
  _useMoralisAuth,
} from "../../hooks/useMoralis/_useMoralisAuth";
import {
  Environment,
  PluginSpecs,
  _useMoralisInit,
} from "../../hooks/useMoralis/_useMoralisInit";
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
  plugins?: PluginSpecs[];
  options?: MoralisProviderOptions;
  environment?: Environment;
}

export const MoralisProvider = ({
  children,
  appId,
  jsKey,
  dangerouslyUseOfMasterKey,
  serverUrl,
  plugins,
  environment,
  options: { onAccountChanged } = {},
}: MoralisProviderProps) => {
  const moralisInit = _useMoralisInit({
    appId,
    serverUrl,
    jsKey,
    dangerouslyUseOfMasterKey,
    plugins,
    environment,
  });
  const { setUser, ...moralisUser } = _useMoralisUser(moralisInit.Moralis);
  const moralisAuth = _useMoralisAuth({
    onAccountChanged,
    setUser,
    Moralis: moralisInit.Moralis,
    environment: moralisInit.environment,
  });
  const moralisWeb3 = _useMoralisWeb3(moralisInit.Moralis);

  return (
    <MoralisContext.Provider
      value={{
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

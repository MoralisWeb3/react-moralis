import React from "react";
import { MoralisContext } from "../MoralisContext";
import {
  OnAccountChanged,
  _useMoralisAuth,
} from "../../hooks/core/useMoralis/_useMoralisAuth";
import {
  Environment,
  GetMoralis,
  PluginSpecs,
  _useMoralisInit,
} from "../../hooks/core/useMoralis/_useMoralisInit";
import { _useMoralisUser } from "../../hooks/core/useMoralis/_useMoralisUser";
import { _useMoralisWeb3 } from "../../hooks/core/useMoralis/_useMoralisWeb3";

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
  getMoralis?: GetMoralis;
}

export const MoralisProvider = ({
  children,
  appId,
  jsKey,
  dangerouslyUseOfMasterKey,
  serverUrl,
  plugins,
  environment,
  getMoralis,
  options: { onAccountChanged } = {},
}: MoralisProviderProps) => {
  const moralisInit = _useMoralisInit({
    appId,
    serverUrl,
    jsKey,
    dangerouslyUseOfMasterKey,
    plugins,
    environment,
    getMoralis,
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

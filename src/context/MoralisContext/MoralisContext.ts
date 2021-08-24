import { createContext } from "react";
import Moralis from "moralis";
import {
  AuthenticateOptions,
  Authentication,
  Login,
  Signup,
} from "../../hooks/useMoralis/_useMoralisAuth";
import { SetUserData } from "src/hooks/useMoralis/utils/setUserData";
import { Web3EnableOptions } from "src/hooks/useMoralis/_useMoralisWeb3";

export interface MoralisContextValue {
  Moralis: Moralis;

  isInitialized: boolean;

  authenticate: (options?: AuthenticateOptions) => Promise<void>;
  logout: () => Promise<void>;
  signup: Signup;
  login: Login;

  auth: Authentication;
  authError: Error | null;
  isAuthenticated: boolean;
  isUnauthenticated: boolean;
  isAuthenticating: boolean;
  hasAuthError: boolean;
  isLoggingOut: boolean;
  isAuthUndefined: boolean;

  setUserData: (data: SetUserData) => Promise<void>;
  user: Moralis.User | null;
  userError: null | Error;
  isUserUpdating: boolean;

  enableWeb3: (options?: Web3EnableOptions) => void;
  web3: Moralis.Web3 | null;
  isWeb3Enabled: boolean;
  web3EnableError: Error | null;
  isWeb3EnableLoading: boolean;
}

export const MoralisContext = createContext<null | MoralisContextValue>(null);

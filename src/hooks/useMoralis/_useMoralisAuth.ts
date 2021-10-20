import { useState, useCallback, useEffect } from "react";
import { setMultipleDataToUser, SetUserData } from "./utils/setUserData";
import { Web3Provider } from "./_useMoralisWeb3";
import { AuthError } from "src";
import MoralisType from "moralis";
import { Environment } from "./_useMoralisInit";

export enum AuthenticationState {
  UNDEFINED = "undefined",
  UNAUTHENTICATED = "unauthenticated",
  AUTHENTICATED = "authenticated",
  AUTHENTICATING = "authenticating",
  LOGGING_OUT = "logging_out",
  ERROR = "error",
}

export type Authentication =
  | {
      state: AuthenticationState.UNDEFINED;
      error: null;
    }
  | {
      state: AuthenticationState.UNAUTHENTICATED;
      error: null;
    }
  | {
      state: AuthenticationState.AUTHENTICATED;
      error: null;
    }
  | {
      state: AuthenticationState.AUTHENTICATING;
      error: null;
    }
  | {
      state: AuthenticationState.ERROR;
      error: Error;
    }
  | {
      state: AuthenticationState.LOGGING_OUT;
      error: null;
    };

const initialAuth: Authentication = {
  state: AuthenticationState.UNDEFINED,
  error: null,
};

export type AuthType = "dot" | "polkadot" | "kusama" | "erd" | "elrond";

export interface AuthenticateOptions {
  onError?: (error: Error) => void;
  onSuccess?: (user: MoralisType.User) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  type?: AuthType;
  provider?: Web3Provider;
  chainId?: number;
  signingMessage?: string;
}

export interface SignupOptions {
  onError?: (error: Error) => void;
  onSuccess?: (user: MoralisType.User) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}
export interface LoginOptions {
  onError?: (error: Error) => void;
  onSuccess?: (user: MoralisType.User) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  usePost?: boolean;
}

export interface LogoutOptions {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}

export type Login = (
  username: string,
  password: string,
  options?: LoginOptions,
) => Promise<void>;

export type Signup = (
  username: string,
  password: string,
  email?: string,
  otherFields?: SetUserData,
  options?: SignupOptions,
) => Promise<void>;

export type OnAccountChanged = (account: string) => void;

export interface UseMoralisAuthOptions {
  onAccountChanged?: OnAccountChanged;
  setUser?: (user: MoralisType.User | null) => void;
  Moralis: MoralisType;
  environment: Environment;
}

const defaultUseMoralisAuthOptions = (
  moralis: MoralisType,
): UseMoralisAuthOptions => ({
  // We will override this right away, we just want to
  setUser: () => {},
  Moralis: moralis,
  environment: "browser",
});

/**
 * Hook that handles all authentication logic and returns the correct auth state
 * and its functions
 */
export const _useMoralisAuth = (options: UseMoralisAuthOptions) => {
  const { onAccountChanged, Moralis, environment } = {
    ...defaultUseMoralisAuthOptions(options.Moralis),
    ...options,
  };

  const setUser = options.setUser!;
  const [auth, setAuth] = useState<Authentication>(initialAuth);
  const [hasOnAccountChangeListener, setHasOnAccountChangeListener] =
    useState(false);

  /**
   * Authenticates the user by calling the Moralis.Web3.authenticate function
   * The auth state will update upon successful/error
   * For direct feedback, a callback can be provided
   */
  const authenticate = useCallback(
    async ({
      onComplete,
      onError,
      onSuccess,
      throwOnError,
      ...rest
    }: AuthenticateOptions = {}) => {
      setAuth({
        state: AuthenticationState.AUTHENTICATING,
        error: null,
      });

      try {
        // @ts-ignore
        const user = await Moralis.authenticate(rest);

        setUser(user);

        setAuth({
          state: AuthenticationState.AUTHENTICATED,
          error: null,
        });

        if (onSuccess) {
          onSuccess(user);
        }
      } catch (error) {
        setAuth({ state: AuthenticationState.ERROR, error });
        if (onError) {
          onError(error);
        }
        if (throwOnError) {
          throw error;
        }
      } finally {
        if (onComplete) {
          onComplete();
        }
      }
    },
    [],
  );

  /**
   * signup the user in with provided credentials
   */
  const signup = useCallback<Signup>(
    async (
      username: string,
      password: string,
      email?: string,
      otherFields = {},
      { throwOnError, onSuccess, onError, onComplete } = {},
    ) => {
      setAuth({
        state: AuthenticationState.AUTHENTICATING,
        error: null,
      });

      const newUser = new Moralis.User();

      setMultipleDataToUser(
        {
          username,
          password,
          email,
          ...otherFields,
        },
        newUser,
      );

      try {
        const user = await newUser.signUp();
        setAuth({
          state: AuthenticationState.AUTHENTICATED,
          error: null,
        });
        setUser(user);
        if (onSuccess) {
          onSuccess(user);
        }
      } catch (error) {
        setAuth({ state: AuthenticationState.ERROR, error });
        if (throwOnError) {
          throw error;
        }
        if (onError) {
          onError(error);
        }
      } finally {
        if (onComplete) {
          onComplete();
        }
      }
    },
    [],
  );
  /**
   * Logs the user in with provided credentials
   */
  const login = useCallback<Login>(
    async (
      username,
      password,
      { usePost, throwOnError, onError, onSuccess, onComplete } = {},
    ) => {
      setAuth({
        state: AuthenticationState.AUTHENTICATING,
        error: null,
      });

      try {
        const user = await Moralis.User.logIn(username, password, {
          // @ts-ignore: missing types
          usePost,
        });
        setAuth({
          state: AuthenticationState.AUTHENTICATED,
          error: null,
        });
        setUser(user);
        if (onSuccess) {
          onSuccess(user);
        }
      } catch (error) {
        setAuth({ state: AuthenticationState.ERROR, error });
        if (throwOnError) {
          throw error;
        }
        if (onError) {
          onError(error);
        }
      } finally {
        if (onComplete) {
          onComplete();
        }
      }
    },
    [],
  );

  /**
   * Logs the user out via Moralis.User.logOut and handles the internal state
   */
  const logout = useCallback(
    async ({
      throwOnError,
      onError,
      onSuccess,
      onComplete,
    }: LogoutOptions = {}) => {
      setAuth({
        state: AuthenticationState.AUTHENTICATING,
        error: null,
      });

      try {
        await Moralis.User.logOut();
        setAuth({ state: AuthenticationState.UNAUTHENTICATED, error: null });
        setUser(null);
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        setAuth({ state: AuthenticationState.ERROR, error });
        // Set user to the currentUser (we don't know if the logout was successfull)
        setUser(Moralis.User.current() ?? null);
        if (throwOnError) {
          throw error;
        }
        if (onError) {
          onError(error);
        }
      } finally {
        if (onComplete) {
          onComplete();
        }
      }
    },
    [],
  );

  /**
   * Update the auth state if the user already ahs authenticated before
   */
  useEffect(() => {
    try {
      const currentUser = Moralis.User.current();
      if (currentUser) {
        setAuth({
          state: AuthenticationState.AUTHENTICATED,
          error: null,
        });
        setUser(currentUser);
      } else {
        throw new Error("Let it catch");
      }
    } catch (error) {
      setAuth({
        state: AuthenticationState.UNAUTHENTICATED,
        error: null,
      });
      setUser(null);
    }
  }, []);

  /**
   * Assign web3 Listener to handle change of accounts
   *
   * Important!: these eventListeners cannot be cleaned up, so don't reassign it
   * See https://github.com/MetaMask/metamask-extension/issues/10873
   *
   * The drawback of this is that we cannot update these function via a React state
   * // TODO: find a way to work around this
   */
  useEffect(() => {
    if (hasOnAccountChangeListener) {
      return;
    }

    if (environment !== "browser") {
      // Currently only support browser environment
      return;
    }

    if (!window) {
      console.warn("No window object found");
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ethereum = (window as any).ethereum;

      if (!ethereum) {
        console.warn("No window.ethereum found");
        return;
      }
      ethereum.on("accountsChanged", async (accounts: string[]) => {
        const account = accounts[0];

        if (onAccountChanged) {
          onAccountChanged(account);
        }
      });
    } catch (error) {
      console.warn(error.message);
    }

    setHasOnAccountChangeListener(true);
  }, [hasOnAccountChangeListener]);

  const isAuthenticated = auth.state === AuthenticationState.AUTHENTICATED;
  const isUnauthenticated = auth.state === AuthenticationState.UNAUTHENTICATED;
  const isAuthenticating = auth.state === AuthenticationState.AUTHENTICATING;
  const hasAuthError = auth.state === AuthenticationState.ERROR;
  const isLoggingOut = auth.state === AuthenticationState.LOGGING_OUT;
  const isAuthUndefined = auth.state === AuthenticationState.UNDEFINED;

  return {
    auth,
    authenticate,
    signup,
    login,
    logout,
    authError: auth.error as AuthError,
    isAuthenticated,
    isUnauthenticated,
    isAuthenticating,
    hasAuthError,
    isLoggingOut,
    isAuthUndefined,
  };
};

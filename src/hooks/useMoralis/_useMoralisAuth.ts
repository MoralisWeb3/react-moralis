import { useState, useCallback, useEffect } from "react";
import { Moralis } from "moralis";
import { setMultipleDataToUser, SetUserData } from "./utils/setUserData";

export enum AuthenticationState {
  UNAUTHENTICATED = "unauthenticated",
  AUTHENTICATED = "authenticated",
  AUTHENTICATING = "authenticating",
  LOGGING_OUT = "logging_out",
  ERROR = "error",
}

export type Authentication =
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
  state: AuthenticationState.UNAUTHENTICATED,
  error: null,
};

export interface AuthenticateOptions {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  onComplete?: () => void;
}

export type Login = (
  username: string,
  password: string,
  options?: { usePost?: boolean }
) => Promise<void>;

export type Signup = (
  username: string,
  password: string,
  email?: string,
  otherFields?: SetUserData
) => Promise<void>;

export type OnAccountChanged = (account: string) => void;

export type AuthType = "dot" | "polkadot" | "kusama" | "erd" | "elrond";
export interface UseMoralisAuthOptions {
  onAccountChanged?: OnAccountChanged;
  authType?: AuthType;
}

const defaultUseMoralisAuthOptions: UseMoralisAuthOptions = {};

/**
 * Hook that handles all authentication logic and returns the correct auth state
 * and its functions
 */
export const _useMoralisAuth = (options: UseMoralisAuthOptions) => {
  const { onAccountChanged, authType } = {
    ...defaultUseMoralisAuthOptions,
    ...options,
  };
  const [auth, setAuth] = useState<Authentication>(initialAuth);
  const [hasOnAccountChangeListener, setHasOnAccountChangeListener] = useState(
    false
  );

  /**
   * Authenticates the user by calling the Moralis.Web3.authenticate function
   * The auth state will update upon successful/error
   * For direct feedback, a callback can be provided
   */
  const authenticate = useCallback(
    async ({ onComplete, onError, onSuccess }: AuthenticateOptions = {}) => {
      setAuth({
        state: AuthenticationState.AUTHENTICATING,
        error: null,
      });

      try {
        await Moralis.Web3.authenticate(
          authType ? { type: authType } : undefined
        );

        setAuth({
          state: AuthenticationState.AUTHENTICATED,
          error: null,
        });
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        setAuth({ state: AuthenticationState.ERROR, error });
        if (onError) {
          onError(error);
        }
      } finally {
        if (onComplete) {
          onComplete();
        }
      }
    },
    [authType]
  );

  /**
   * signup the user in with provided credentials
   */
  const signup = useCallback<Signup>(
    async (
      username: string,
      password: string,
      email?: string,
      otherFields = {}
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
        newUser
      );

      try {
        await newUser.signUp();
        setAuth({
          state: AuthenticationState.AUTHENTICATED,
          error: null,
        });
      } catch (error) {
        setAuth({ state: AuthenticationState.ERROR, error });
      }
    },
    []
  );
  /**
   * Logs the user in with provided credentials
   */
  const login = useCallback<Login>(async (username, password, options) => {
    setAuth({
      state: AuthenticationState.AUTHENTICATING,
      error: null,
    });

    try {
      await Moralis.User.logIn(username, password, {
        // @ts-ignore: missing types
        usePost: options?.usePost,
      });
      setAuth({
        state: AuthenticationState.AUTHENTICATED,
        error: null,
      });
    } catch (error) {
      setAuth({ state: AuthenticationState.ERROR, error });
    }
  }, []);

  /**
   * Logs the user out via Moralis.User.logOut and handles the internal state
   */
  const logout = useCallback(async () => {
    setAuth({
      state: AuthenticationState.AUTHENTICATING,
      error: null,
    });

    try {
      await Moralis.User.logOut();
      setAuth(initialAuth);
    } catch (error) {
      setAuth({ state: AuthenticationState.ERROR, error });
    }
  }, []);

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
      }
    } catch (error) {
      // Do nothing
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
      console.warn("cannot change onAccountChange once its set");
      return;
    }

    (window as any).ethereum.on(
      "accountsChanged",
      async (accounts: string[]) => {
        const account = accounts[0];

        if (onAccountChanged) {
          onAccountChanged(account);
        }
      }
    );

    setHasOnAccountChangeListener(true);
  }, [hasOnAccountChangeListener]);

  const isAuthenticated = auth.state === AuthenticationState.AUTHENTICATED;
  const isUnauthenticated = auth.state === AuthenticationState.UNAUTHENTICATED;
  const isAuthenticating = auth.state === AuthenticationState.AUTHENTICATING;
  const hasAuthError = auth.state === AuthenticationState.ERROR;
  const isLoggingOut = auth.state === AuthenticationState.LOGGING_OUT;

  return {
    auth,
    authenticate,
    signup,
    login,
    logout,
    authError: auth.error,
    isAuthenticated,
    isUnauthenticated,
    isAuthenticating,
    hasAuthError,
    isLoggingOut,
  };
};

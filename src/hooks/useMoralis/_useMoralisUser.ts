import { Moralis } from "moralis";
import { useCallback, useEffect, useState } from "react";
import { NotAuthenticatedError } from "../../Errors";
import { setMultipleDataToUser, SetUserData } from "./utils/setUserData";
import { Authentication, AuthenticationState } from "./_useMoralisAuth";

export const _useMoralisUser = (auth: Authentication) => {
  const [user, setUser] = useState<Moralis.User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  /**s
   * Update the user when the auth state changes to reflect the correct user
   */
  useEffect(() => {
    if (auth.state === AuthenticationState.AUTHENTICATED) {
      const currentUser = Moralis.User.current();
      setUser(currentUser ?? null);
    } else {
      setUser(null);
    }
  }, [auth]);

  /**
   * Function to change the userData, any changes made via this function will sync to Moralis AND the local state
   */
  const setUserData = useCallback(
    async (data: SetUserData) => {
      if (!user) {
        setError(
          new NotAuthenticatedError(
            "User needs to be authenticated before setting new data"
          )
        );
        return;
      }
      setIsUpdating(true);
      setError(null);

      try {
        setMultipleDataToUser(data, user);

        const currentUser = Moralis.User.current();

        if (currentUser && auth.state === AuthenticationState.AUTHENTICATED) {
          setUser(currentUser);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsUpdating(false);
      }
    },
    [user]
  );

  return { setUserData, user, isUserUpdating: isUpdating, userError: error };
};

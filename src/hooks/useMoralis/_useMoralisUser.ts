import { Moralis } from "moralis";
import { useCallback, useEffect, useState } from "react";
import { NotAuthenticatedError } from "../../Errors";
import { setMultipleDataToUser, SetUserData } from "./utils/setUserData";

export interface MoralisSetUserDataOptions {
  throwOnError?: boolean;
}

export const _useMoralisUser = () => {
  const [user, setUser] = useState<Moralis.User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Function to change the userData, any changes made via this function will sync to Moralis AND the local state
   */
  const setUserData = useCallback(
    async (data: SetUserData, options: MoralisSetUserDataOptions = {}) => {
      if (!user) {
        setError(
          new NotAuthenticatedError(
            "User needs to be authenticated before setting new data",
          ),
        );
        return;
      }
      setIsUpdating(true);
      setError(null);

      try {
        setMultipleDataToUser(data, user);

        await user.save();

        const currentUser = Moralis.User.current();

        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        setError(error);
        if (options.throwOnError) {
          throw error;
        }
      } finally {
        setIsUpdating(false);
      }
    },
    [user],
  );

  return {
    setUserData,
    setUser,
    user,
    isUserUpdating: isUpdating,
    userError: error,
  };
};

import { Moralis } from "moralis";
import { useCallback, useEffect, useState } from "react";
import { NotAuthenticatedError, ReactMoralisError } from "../../Errors";
import { setMultipleDataToUser, SetUserData } from "./utils/setUserData";

export interface MoralisSetUserDataOptions {
  onError?: (error: Error) => void;
  onSuccess?: (user: Moralis.User) => void;
  onComplete?: () => void;
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
    async (
      data: SetUserData,
      {
        throwOnError,
        onComplete,
        onError,
        onSuccess,
      }: MoralisSetUserDataOptions = {},
    ) => {
      if (!user) {
        throw new NotAuthenticatedError(
          "User needs to be authenticated before setting new data",
        );
      }

      setIsUpdating(true);
      setError(null);

      try {
        await user.save();

        setMultipleDataToUser(data, user);

        const currentUser = Moralis.User.current();

        if (!currentUser) {
          throw new ReactMoralisError("No user data found after save");
        }

        setUser(currentUser);

        if (onSuccess) {
          onSuccess(user);
        }
      } catch (error) {
        setError(error);
        if (throwOnError) {
          throw error;
        }
        if (onError) {
          onError(error);
        }
      } finally {
        setIsUpdating(false);
        if (onComplete) {
          onComplete();
        }
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

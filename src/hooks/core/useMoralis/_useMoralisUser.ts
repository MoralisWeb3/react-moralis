import MoralisType from "moralis-v1";
import { useCallback, useState } from "react";
import { NotAuthenticatedError, ReactMoralisError } from "../../../Errors";
import { setMultipleDataToUser, SetUserData } from "./utils/setUserData";

export interface MoralisSetUserDataOptions {
  onError?: (error: Error) => void;
  onSuccess?: (user: MoralisType.User) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}

export interface RefetchUserOptions {
  onError?: (error: Error) => void;
  onSuccess?: (user: MoralisType.User) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}

export const _useMoralisUser = (Moralis: MoralisType) => {
  const [user, setUser] = useState<MoralisType.User | null>(null);
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

      let userHasLocallyUpdated = false;

      try {
        setMultipleDataToUser(data, user);
        userHasLocallyUpdated = true;

        await user.save();

        const currentUser = Moralis.User.current();

        if (!currentUser) {
          throw new ReactMoralisError("No user data found after save");
        }

        setUser(currentUser);

        if (onSuccess) {
          onSuccess(user);
        }
        return user;
      } catch (error) {
        if (userHasLocallyUpdated) {
          user.revert();
        }

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

  /**
   * Function to refetch the user and update the user object
   */
  const refetchUserData = useCallback(
    async ({
      throwOnError,
      onComplete,
      onError,
      onSuccess,
    }: RefetchUserOptions = {}) => {
      if (!user) {
        throw new NotAuthenticatedError(
          "User needs to be authenticated before refetching",
        );
      }

      setIsUpdating(true);
      setError(null);

      try {
        const newUserData = await user.fetch();

        if (!newUserData) {
          throw new ReactMoralisError("No user data found after refetch");
        }

        setUser(newUserData);

        if (onSuccess) {
          onSuccess(newUserData);
        }
        return newUserData;
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
    refetchUserData,
    user,
    _setUser: setUser,
    isUserUpdating: isUpdating,
    userError: error,
  };
};

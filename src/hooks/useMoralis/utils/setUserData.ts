import { Moralis } from "moralis";
import { ValidationError } from "src/Errors";

// UserData can accept all these types
// undefined values will be filtered, null values will be set to null
export type UserDataValue =
  | string
  | number
  | boolean
  | Moralis.File
  | undefined
  | null;

export type SetUserData = Record<string, UserDataValue>;

export const setMultipleDataToUser = (
  data: SetUserData,
  user: Moralis.User
) => {
  // We use the specified functions to set password, email, and username
  const { password, email, username, ...restData } = data;

  if (password !== undefined) {
    if (typeof password !== "string") {
      throw new ValidationError("password can only be a string type");
    }
    user.setPassword(password);
  }

  if (email !== undefined) {
    if (typeof email !== "string") {
      throw new ValidationError("email can only be a string type");
    }
    user.setEmail(email);
  }

  if (username !== undefined) {
    if (typeof username !== "string") {
      throw new ValidationError("username can only be a string type");
    }
    user.setUsername(username);
  }

  Object.entries(restData)
    .filter(([, value]) => value !== undefined)
    .forEach(([key, value]) => {
      user.set(key, value);
    });
};

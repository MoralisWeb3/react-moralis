import { useState, useEffect } from "react";
import { useMoralis } from "../../core/useMoralis";

export const useEnsName = (ensName: string) => {
  const { web3 } = useMoralis();
  const [address, setAddress] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (web3) {
      setIsLoading(true);
      setError(null);
      web3
        .getResolver(ensName)
        .then((resolver) => {
          if (!resolver) {
            return;
          }
          Promise.all([
            resolver.getAddress().catch(() => null),
            resolver.getAvatar().catch(() => null),
            resolver.getText("email").catch(() => null),
            resolver.getText("url").catch(() => null),
          ]).then(
            ([resolvedAddress, resolvedAvatar, resolvedEmail, resolvedUrl]) => {
              setAddress(resolvedAddress);
              setAvatar(resolvedAvatar?.url ?? null);
              setEmail(resolvedEmail);
              setUrl(resolvedUrl);
            },
          );
        })
        .catch(setError)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [ensName, web3]);

  return { address, avatar, email, url, isLoading, error };
};

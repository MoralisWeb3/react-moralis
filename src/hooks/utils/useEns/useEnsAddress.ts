import { useState, useEffect } from "react";
import { useMoralis } from "../../core/useMoralis";

export const useEnsAddress = (ensAddress: string) => {
  const { web3 } = useMoralis();
  const [resolved, setResolved] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (web3) {
      setIsLoading(true);
      setError(null);
      web3
        .lookupAddress(ensAddress)
        .then((result) => {
          setResolved(result);
        })
        .catch(setError)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [ensAddress, web3]);

  return { name: resolved, isLoading, error };
};

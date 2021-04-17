import { useContext } from "react";
import { MoralisContext } from "../../context/MoralisContext";
import { NoMoralisContextProviderError } from "../../Errors";

export const useMoralis = () => {
  const moralisContext = useContext(MoralisContext);

  if (!moralisContext) {
    throw new NoMoralisContextProviderError(
      "Make sure to only call useMoralis within a  <MoralisProvider>",
    );
  }

  return moralisContext;
};

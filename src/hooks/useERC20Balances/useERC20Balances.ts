import { DefaultHookParams } from "../../interfaces/default-hook-params";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import {
  useCustomResolver,
  UseCustomResolverOptions,
} from "../useCustomResolver";
import { useMoralisWeb3Api } from "../useMoralisWeb3Api";

interface UseERC20BalancesParams extends DefaultHookParams {}

interface UseERC20BalancesResult {
  token_address: string;
  name: string;
  symbol: string;
  logo?: string | undefined;
  thumbnail?: string | undefined;
  decimals: string;
  balance: string;
}

export const useERC20Balances = (
  params: UseERC20BalancesParams,
  options?: UseCustomResolverOptions,
) => {
  const { account } = useMoralisWeb3Api();
  const { walletAddress, chainId } = useMoralisDapp();

  const { data, isFetching, isLoading, error, operation } = useCustomResolver<
    UseERC20BalancesParams,
    UseERC20BalancesResult[],
    null
  >(
    account.getTokenBalances,
    null,
    {
      address: walletAddress,
      chain: params?.chain || chainId,
    },
    options,
  );

  return {
    fetchERC20Balances: operation,
    data,
    error,
    isLoading,
    isFetching,
  };
};

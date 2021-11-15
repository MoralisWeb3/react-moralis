import { useMoralisWeb3Api } from "..";
import { tokenValueTxt, toUsd } from "../../helpers/formatters";
import { DefaultHookParams } from "../../interfaces/default-hook-params";
import {
  useCustomResolver,
  UseCustomResolverOptions,
} from "../useCustomResolver";

interface TokenPriceResult {
  nativePrice?: NativePriceResult | undefined;
  usdPrice: number;
  exchangeAddress?: string | undefined;
  exchangeName?: string | undefined;
}

interface NativePriceResult {
  value: string;
  decimals: number;
  name: string;
  symbol: string;
}

interface ITokenPriceResult {
  nativePrice: string;
  usdPrice: string;
  exchangeAddress: string;
  exchangeName: string;
}

interface UseTokenPriceParams extends DefaultHookParams {}

export const useTokenPrice = (
  params: UseTokenPriceParams,
  options?: UseCustomResolverOptions,
) => {
  const { token } = useMoralisWeb3Api();

  const formatResponse = (result: TokenPriceResult): ITokenPriceResult => {
    const { value, decimals, symbol } = result.nativePrice as NativePriceResult;
    const response = {
      ...result,
      usdPrice: toUsd(result.usdPrice),
      nativePrice: tokenValueTxt(Number(value), decimals, symbol),
      exchangeAddress: result.exchangeAddress as string,
      exchangeName: result.exchangeName as string,
    };

    return response;
  };

  const { data, isFetching, isLoading, error, operation } = useCustomResolver(
    token.getTokenPrice,
    null,
    params,
    options,
    formatResponse,
  );

  return {
    fetchTokenPrice: operation,
    data,
    error,
    isLoading,
    isFetching,
  };
};

import { useCallback } from "react";
import { useMoralis } from "../useMoralis";
import {
  UseResolveCallOptions,
  _useResolveCall,
} from "../../internal/_useResolveAsyncCall";

export type Web3TransferResult = unknown;

export interface UseWeb3TransferOptions extends UseResolveCallOptions {}

type TransferType = "native" | "erc20" | "erc721" | "erc1155";
type TransferSystem = "evm";
export type Web3TransferParameters = {
  type?: TransferType;
  receiver?: string;
  contractAddress?: string;
  /** @deprecated use contractAddress field instead */
  contract_address?: string;
  amount?: string;
  tokenId?: string;
  /** @deprecated use tokenId field instead */
  token_id?: string;
  system?: TransferSystem;
  awaitReceipt?: boolean;
};

export interface Web3TransferFetchOptions {
  onError?: (error: Error) => void;
  onSuccess?: (results: Web3TransferResult) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  params?: Web3TransferParameters;
}

export const useWeb3Transfer = (
  params?: Web3TransferParameters,
  options?: UseWeb3TransferOptions,
) => {
  const { Moralis } = useMoralis();
  const call = useCallback(async (callParams: Web3TransferParameters) => {
    //@ts-ignore
    const allParams: Web3TransferParameters = {
      ...params,
      ...callParams,
    };

    //@ts-ignore
    return await Moralis.Web3.transfer(allParams);
  }, []);

  return _useResolveCall<Web3TransferResult, Web3TransferParameters>(
    call,
    null,
    params,
    options,
    false,
  );
};

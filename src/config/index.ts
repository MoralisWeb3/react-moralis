import { components } from "moralis-v1/types/generated/web3Api";
export type ApiChain = components["schemas"]["chainList"];

export const DEFAULT_API_CHAIN: ApiChain = "eth";

export enum Plugin {
  ONE_INCH = "oneInch",
  OPEN_SEA = "opensea",
  FIAT = "fiat",
  RARIBLE = "rarible",
}

export const supportedChains = [
  "0x1",
  "0x3",
  "0x4",
  "0x5",
  "0x2a",
  "0x38",
  "0x61",
  "0x89",
  "0x13881",
  "0xfa",
  "0xa86a",
  "0xa869",
  "0x539",
  "0x19",
];

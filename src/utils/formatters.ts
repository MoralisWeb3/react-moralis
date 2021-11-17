const currencyFormatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const decimalFormatter = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 4,
});

export const toUsd = (value: number) => currencyFormatter.format(value);

export const limitDecimals = (value: number) => decimalFormatter.format(value);

export const tokenValue = (value: number, decimals: number) =>
  value / Math.pow(10, decimals);

export const tokenValueTxt = (
  value: number | string,
  decimals: number,
  symbol: string,
) => {
  if (typeof value === "number") {
    return `${limitDecimals(tokenValue(value, decimals))} ${symbol}`;
  }
  // TODO: handle as BN
  return `${limitDecimals(tokenValue(Number(value), decimals))} ${symbol}`;
};

export const decimalToHexString = (decimal: number) =>
  "0x" + decimal.toString(16);

export const hexStringToDecimal = (hexString: string) =>
  parseInt(hexString, 16);

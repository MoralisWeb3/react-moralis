const currencyFormatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const decimalFormatter = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

export const toUsd = (value: number) => currencyFormatter.format(value);

export const limitDecimals = (value: number) => decimalFormatter.format(value);

export const tokenValue = (value: number, decimals?: number) =>
  decimals ? value / Math.pow(10, decimals) : value;

export const tokenValueTxt = (
  value: number,
  decimals: number,
  symbol: string,
) => `${limitDecimals(tokenValue(Number(value), decimals))} ${symbol}`;

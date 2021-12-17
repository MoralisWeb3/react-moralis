import {
  decimalToHexString,
  hexStringToDecimal,
  tokenValueTxt,
  toUsd,
} from "./formatters";

describe("toUsd", () => {
  test.each`
    value       | expected
    ${0}        | ${"$0.00"}
    ${1}        | ${"$1.00"}
    ${1.5}      | ${"$1.50"}
    ${1.33333}  | ${"$1.33"}
    ${1.666666} | ${"$1.67"}
    ${-1}       | ${"-$1.00"}
  `("returns $expected for $value", ({ value, expected }) => {
    expect(toUsd(value)).toBe(expected);
  });
});

describe("tokenValueTxt", () => {
  test.each`
    value                   | decimals | symbol    | expected
    ${0}                    | ${18}    | ${"WETH"} | ${"0 WETH"}
    ${1000000000000000000}  | ${18}    | ${"WETH"} | ${"1 WETH"}
    ${50000000000000000}    | ${18}    | ${"WETH"} | ${"0.05 WETH"}
    ${500000000000000}      | ${18}    | ${"WETH"} | ${"0.0005 WETH"}
    ${543211111000000}      | ${18}    | ${"WETH"} | ${"0.0005432 WETH"}
    ${10000000}             | ${6}     | ${"USDC"} | ${"10 USDC"}
    ${-1000000000000000000} | ${18}    | ${"WETH"} | ${"-1 WETH"}
    ${10}                   | ${0}     | ${"TEST"} | ${"10 TEST"}
    ${10}                   | ${1}     | ${"TEST"} | ${"1 TEST"}
  `(
    "returns $expected for $value, $decimals, $symbol",
    ({ value, decimals, symbol, expected }) => {
      expect(tokenValueTxt(value, decimals, symbol)).toBe(expected);
    },
  );
});

describe("decimalToHexString", () => {
  test.each`
    value | expected
    ${0}  | ${"0x0"}
    ${1}  | ${"0x1"}
    ${2}  | ${"0x2"}
    ${42} | ${"0x2a"}
  `("convert hex $value to decimal $expected", ({ value, expected }) => {
    expect(decimalToHexString(value)).toBe(expected);
  });
});

describe("hexStringToDecimal", () => {
  test.each`
    value     | expected
    ${"0x0"}  | ${0}
    ${"0x1"}  | ${1}
    ${"0x2"}  | ${2}
    ${"0x2a"} | ${42}
  `("convert decimal $value for hex $expected", ({ value, expected }) => {
    expect(hexStringToDecimal(value)).toBe(expected);
  });
});

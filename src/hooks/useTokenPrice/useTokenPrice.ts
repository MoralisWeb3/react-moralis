import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralis } from "..";
import { c2, tokenValueTxt } from "../../helpers/formatters";

export const useTokenPrice = (options: any) => {
  const { token } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();
  const [tokenPrice, setTokenPrice] = useState();

  useEffect(() => {
    if (isInitialized)
      fetchTokenPrice(options)
        .then((price: any) => {
          // usdPrice is a number, format() returns a string
          price.usdPrice = c2.format(price.usdPrice);
          const { value, decimals, symbol } = price.nativePrice;
          // nativePrice is an Object
          // {value: string, decimals: number, name: string, symbol: string},
          // tokenValueTxt returns a string
          price.nativePrice = tokenValueTxt(value, decimals, symbol);
          setTokenPrice(price);
        })
        .catch((e) => alert(e.message));
  }, [isInitialized]);

  const fetchTokenPrice = async (options: any) => {
    const { chain, address } = options;
    return await token
      .getTokenPrice({ chain, address })
      .then((result) => result)
      .catch((e) => alert(e.message));
  };
  return { fetchTokenPrice, tokenPrice };
};

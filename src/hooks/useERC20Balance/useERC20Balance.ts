import { useEffect, useState } from "react";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "../useMoralis";
import { useMoralisWeb3Api } from "../useMoralisWeb3Api";

export const useERC20Balance = (params: any) => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();

  const [assets, setAssets] = useState([]);

  // [s
  //   {
  //     token_address: "",
  //     name: "",
  //     symbol: "",
  //     // logo: "",
  //     // thumbnail: "",
  //     decimals: "",
  //     balance: "",
  //   },
  // ]

  useEffect(() => {
    if (isInitialized) {
      fetchERC20Balance()
        .then((balance: any) => {
          // eslint-disable-next-line no-console
          console.log(balance);
          setAssets(balance);
        })
        .catch((e) => alert(e.message));
    }
  }, [isInitialized, chainId, walletAddress]);

  const fetchERC20Balance = async () => {
    return await account
      .getTokenBalances({
        address: walletAddress,
        chain: params?.chain || chainId,
      })
      .then((result) => result)
      .catch((e) => alert(e.message));
  };

  return { fetchERC20Balance, assets };
};

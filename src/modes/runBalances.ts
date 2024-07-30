import { Account } from "../utils/types";
import { Wallet } from "../modules/wallet";
import {
  BGTT,
  BHONEY,
  HONEY,
  WBERA,
  WBTC,
  WETH,
} from "../blockchain_data/tokens";

export const runBalances = async (accounts: Account[]) => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet: Wallet = new Wallet(account.key);

      const beraBalance: string = (Number(await wallet.getBalance()) / 10 ** 18)
        .toString()
        .slice(0, 8);
      const honeyBalance: string = (await wallet.getTokenBalance(HONEY))
        .toString()
        .slice(0, 8);

      const wberaBalance: string = (await wallet.getTokenBalance(WBERA))
        .toString()
        .slice(0, 8);
      const bgtBalance: string = (await wallet.getTokenBalance(BGTT))
        .toString()
        .slice(0, 8);
      const bHoneyBalance: string = (await wallet.getTokenBalance(BHONEY))
        .toString()
        .slice(0, 8);

      const wbtcBalance: string = (await wallet.getTokenBalance(WBTC))
        .toString()
        .slice(0, 8);
      const wethBalance: string = (await wallet.getTokenBalance(WETH))
        .toString()
        .slice(0, 8);

      console.log(
        `${wallet.address.slice(0, 4)}...${wallet.address.slice(
          -4
        )} | ${beraBalance} BERA | ${honeyBalance} HONEY | ${wberaBalance} WBERA | ${bgtBalance} BGT | ${bHoneyBalance} bHONEY | ${wbtcBalance} WBTC | ${wethBalance} WETH |`
      );
    })
  );
};

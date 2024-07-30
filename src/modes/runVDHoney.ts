import { Account } from "../utils/types";
import {
  BERA,
  BHONEY,
  HONEY,
  WBTC,
  WETH,
  WBERA,
} from "../blockchain_data/tokens";
import { Wallet } from "../modules/classes/wallet";
import { randomChoice, rint, sleep } from "../utils/utils";
import config from "../config";
import { Bend } from "../modules/dapps/bend";
import logger from "../utils/logger";
import { BexSwap } from "../modules/dapps/bexSwap";

export const runVDHoney = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet = new Wallet(account.key);
      const bend = new Bend(wallet);
      const bex = new BexSwap(wallet);

      const tokenToDeposit = randomChoice([WBTC, WETH]);

      try {
        if ((await wallet.getTokenBalance(tokenToDeposit)) < 0.000001) {
          logger.info(
            `You don't have enough ${tokenToDeposit} to deposit! trying to swap...`
          );
          const beraAmount: number =
            Number(
              (Number(await wallet.getBalance()) / 10 ** 18)
                .toString()
                .slice(0, 10)
            ) * 0.95;

          await sleep(rint(1000, config.delayOnChainTo * 1000));
          await bex.swapByApi(BERA, tokenToDeposit, beraAmount);
        }

        await sleep(rint(1000, config.delayOnChainTo * 1000));

        await bend.deposit(
          tokenToDeposit,
          await wallet.getTokenBalance(tokenToDeposit)
        );

        await sleep(rint(1000, config.delayOnChainTo * 1000));
        await bend.borrow(0.1);
      } catch (error) {
        logger.error(error);
        return;
      }
    })
  );
};

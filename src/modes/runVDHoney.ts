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
import tokenNames from "../blockchain_data/tokenNames";

export const runVDHoney = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet = new Wallet(account.key);
      const bend = new Bend(wallet);
      const bex = new BexSwap(wallet);

      await sleep(rint(1000, config.delayOnChainTo * 1000));

      const tokenToDeposit = randomChoice([WBTC, WETH]);

      try {
        if ((await wallet.getTokenBalance(tokenToDeposit)) < 0.000001) {
          logger.info(
            `You don't have enough ${tokenNames[tokenToDeposit]} to deposit! trying to swap...`
          );
          const beraAmount: number =
            Number(
              (Number(await wallet.getBalance()) / 10 ** 18)
                .toString()
                .slice(0, 10)
            ) * 0.95;

          // await bex.swapByApi(BERA, tokenToDeposit, beraAmount * rint(0.1, 0.5));
          await bex.swapByApi(BERA, tokenToDeposit, 0.1);
        }
      } catch (error) {
        logger.error(error);
        return;
      }

      try {
        logger.info(`Trying to deposit ${tokenNames[tokenToDeposit]}...`);
        await bend.deposit(
          tokenToDeposit,
          await wallet.getTokenBalance(tokenToDeposit)
        );

        await bend.borrow(0.1);
      } catch (error) {
        logger.error(error);
        return;
      }
    })
  );
};

import { Account } from "../utils/types";
import { BERA, WBTC, WETH } from "../blockchain_data/tokens";
import { Wallet } from "../modules/classes/wallet";
import config from "../config";
import { BendApp } from "../modules/dapps/bend";
import { BexApp } from "../modules/dapps/bex";
import tokenNames from "../blockchain_data/tokenNames";
import { DataHelper } from "../modules/classes/dataHelper";
import logger from "../modules/classes/logger";
const { randomChoice, rint, sleep } = DataHelper;

export const runVDHoney = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet = new Wallet(account.key);
      const bend = new BendApp(wallet);
      const bex = new BexApp(wallet);

      await sleep(rint(1000, config.delayOnChainTo * 1000));

      const tokenToDeposit = randomChoice([WBTC, WETH]);

      try {
        if ((await wallet.getTokenBalance(tokenToDeposit)) < 0.000001) {
          logger.info(
            `You don't have enough ${tokenNames[tokenToDeposit]} to deposit! trying to swap...`
          );
          const beraAmount: number = await wallet.getFormattedEtherBalance();

          await bex.swapByApi(
            BERA,
            tokenToDeposit,
            beraAmount * rint(0.1, 0.5)
          );
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

import config from "../config";
import { Faucet } from "../modules/misc/faucet";
import { Account } from "../utils/types";
import logger from "../modules/classes/logger";
import { DataHelper } from "../modules/classes/dataHelper";
const { rint, sleep } = DataHelper;

export const runFaucet = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      await sleep(rint(1000, config.delayFaucet * 1000));

      try {
        await Faucet.dripFaucetToWallet(account);
        logger.info(`Success! Wallet: ${account.wallet}`);
        return;
      } catch (error) {
        logger.error(error);
        return;
      }
    })
  );
};

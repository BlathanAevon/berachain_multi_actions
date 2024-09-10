import config from "../config";
import { Faucet } from "../modules/misc/faucet";
import { Account } from "../utils/types";
import { rint, sleep } from "../utils/utils";
import logger from "../utils/logger";

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

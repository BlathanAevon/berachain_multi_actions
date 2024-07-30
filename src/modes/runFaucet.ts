import config from "../config";
import { Faucet } from "../modules/faucet";
import { Account } from "../utils/types";
import { rint, sleep } from "../utils/utils";
import logger from "../utils/logger";

export const runFaucet = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      try {
        const token = await Faucet.solveCaptcha();
        await sleep(rint(500, config.delayFaucet * 1000));
        await Faucet.dripTokens(account, token);

        logger.info(`Success! Wallet: ${account.wallet}`);
      } catch (error) {
        logger.error(error);
        return;
      }
    })
  );
};

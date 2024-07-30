import { Account } from "../utils/types";
import { Wallet } from "../modules/wallet";
import { Deployer } from "../modules/deployer";
import config from "../config";
import { rint, sleep } from "../utils/utils";
import logger from "../utils/logger";

export const runDeploy = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet = new Wallet(account.key);
      const deployer = new Deployer(wallet);

      await sleep(rint(1000, config.delayOnChainTo * 1000));
      try {
        await deployer.deployContract();
      } catch (error) {
        logger.error(error);
        return;
      }
    })
  );
};

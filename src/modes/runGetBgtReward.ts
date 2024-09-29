import config from "../config";
import { BGTApp } from "../modules/dapps/bgt";
import { Wallet } from "../modules/classes/wallet";
import { Account } from "../utils/types";
import logger from "../modules/classes/logger";
import { DataHelper } from "../modules/classes/dataHelper";
const { shuffleArray, rint, sleep } = DataHelper;

export const runGetBgtRewards = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet: Wallet = new Wallet(account.key);
      const bgt: BGTApp = new BGTApp(wallet);

      const actions = [
        async () => await bgt.getBendBgtReward(),
        async () => await bgt.getBerpsBgtReward(),
        async () => await bgt.getHoneyUsdcBgtReward(),
        async () => await bgt.getHoneyWberaBgtReward(),
      ];

      shuffleArray(actions);

      for (let i = 0; i != actions.length; i++) {
        try {
          const action = actions[i];
          sleep(rint(1000, config.delayOnChainTo * 1000));
          await action();
        } catch (error) {
          logger.error(error);
        }
      }
    })
  );
};

import config from "../config";
import { BGT } from "../modules/bgt";
import { Wallet } from "../modules/wallet";
import { Account } from "../utils/types";
import { rint, shuffleArray, sleep } from "../utils/utils";
import logger from "../utils/logger";

export const runGetBgtRewards = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet = new Wallet(account.key);
      const bgt = new BGT(wallet);

      const actions = [
        async () => await bgt.getBendBgtReward(),
        async () => await bgt.getBerpsBgtReward(),
        async () => await bgt.getBexBgtReward(),
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

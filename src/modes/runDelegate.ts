import config from "../config";
import { BGT } from "../modules/dapps/bgt";
import { Wallet } from "../modules/classes/wallet";
import { Account } from "../utils/types";
import { rint, sleep } from "../utils/utils";
import logger from "../utils/logger";
import { BGTT } from "../blockchain_data/tokens";

export const runDelegate = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet = new Wallet(account.key);
      const bgt = new BGT(wallet);

      await sleep(rint(1000, config.delayOnChainTo * 1000));
      try {
        const bgtBalance = await wallet.getTokenBalance(BGTT);
        await bgt.delegateBGT(bgtBalance * rint(0.2, 0.9));
      } catch (error) {
        logger.error(error);
        return;
      }
    })
  );
};

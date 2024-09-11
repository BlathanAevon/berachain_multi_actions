import config from "../config";
import { BGT } from "../modules/dapps/bgt";
import { Wallet } from "../modules/classes/wallet";
import { Account, Delegation } from "../utils/types";
import logger from "../modules/classes/logger";
import { BGTT } from "../blockchain_data/tokens";
import validators from "../blockchain_data/validators";
import { JsonWorker } from "../modules/classes/jsonWorker";
import { DataHelper } from "../modules/classes/dataHelper";
const { randomChoice, rint, sleep } = DataHelper;

export const runDelegate = async (accounts: Account[]): Promise<void> => {
  let delegations: Delegation[] = [];

  JsonWorker.cleanDelegationState();

  await Promise.all(
    accounts.map(async (account) => {
      const wallet = new Wallet(account.key);
      const bgt = new BGT(wallet);

      await sleep(rint(1000, config.delayOnChainTo * 1000));
      const bgtBalance = await wallet.getTokenBalance(BGTT);

      const randomValidator = randomChoice(validators);

      delegations.push({
        wallet: wallet.address,
        delegatedTo: randomValidator,
      });

      try {
        await bgt.delegateBGT(bgtBalance * 0.99, randomValidator);
      } catch (error) {
        logger.error(error);
        return;
      } finally {
        JsonWorker.writeDelegationState(delegations);
      }
    })
  );
};

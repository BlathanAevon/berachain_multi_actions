import config from "../config";
import { BGT } from "../modules/dapps/bgt";
import { Wallet } from "../modules/classes/wallet";
import { Account } from "../utils/types";
import { JsonWorker } from "../modules/classes/jsonWorker";
import logger from "../modules/classes/logger";
import { DataHelper } from "../modules/classes/dataHelper";
const { rint, sleep } = DataHelper;

export const runActivateBoost = async (accounts: Account[]): Promise<void> => {
  const delegations: Map<string, string> = new Map(
    JsonWorker.readDelegationState().map((d) => [d.wallet, d.delegatedTo])
  );

  await Promise.all(
    accounts.map(async (account) => {
      const wallet = new Wallet(account.key);
      const bgt = new BGT(wallet);

      await sleep(rint(1000, config.delayOnChainTo * 1000));

      const validator = delegations.get(wallet.address) || "";

      try {
        await bgt.activateBoost(validator);
      } catch (error) {
        logger.error(error);
      }
    })
  );
};

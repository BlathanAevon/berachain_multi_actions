import config from "../config";
import { BGT } from "../modules/dapps/bgt";
import { Wallet } from "../modules/classes/wallet";
import { Account, Delegation } from "../utils/types";
import { readDelegationState, rint, sleep } from "../utils/utils";
import logger from "../utils/logger";

export const runActivateBoost = async (accounts: Account[]): Promise<void> => {
  const delegations: Map<string, string> = new Map(
    readDelegationState().map((d) => [d.wallet, d.delegatedTo])
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
        throw error;
      }
    })
  );
};

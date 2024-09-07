import { Account } from "../utils/types";
import { BERA, BHONEY, HONEY } from "../blockchain_data/tokens";
import { Wallet } from "../modules/classes/wallet";
import { rint, sleep } from "../utils/utils";
import { BexSwap } from "../modules/dapps/bexSwap";
import { Berps } from "../modules/dapps/berps";
import { Vault } from "../modules/dapps/vault";
import config from "../config";
import logger from "../utils/logger";

export const runBHoney = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet: Wallet = new Wallet(account.key);
      const vault: Vault = new Vault(wallet);
      const berps: Berps = new Berps(wallet);
      const bex: BexSwap = new BexSwap(wallet);

      try {
        await sleep(rint(1000, config.delayOnChainTo * 1000));
        await bex.swapByApi(
          BERA,
          HONEY,
          (await wallet.getFormattedEtherBalance()) * rint(0.5, 0.9)
        );
        await sleep(rint(1000, config.delayOnChainTo * 1000));
        await vault.stakeHoney(await wallet.getTokenBalance(HONEY));
        await sleep(rint(1000, config.delayOnChainTo * 1000));
        await berps.stakeBHoney(await wallet.getTokenBalance(BHONEY));
      } catch (error) {
        logger.error(error);
        return;
      }
    })
  );
};

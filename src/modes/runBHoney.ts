import { Account } from "../utils/types";
import { BERA, BHONEY, HONEY } from "../blockchain_data/tokens";
import { Wallet } from "../modules/classes/wallet";
import { BexApp } from "../modules/dapps/bex";
import { BerpsApp } from "../modules/dapps/berps";
import { VaultApp } from "../modules/dapps/vault";
import config from "../config";
import logger from "../modules/classes/logger";
import { DataHelper } from "../modules/classes/dataHelper";
const { sleep, rint } = DataHelper;

export const runBHoney = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet: Wallet = new Wallet(account.key);
      const vault: VaultApp = new VaultApp(wallet);
      const berps: BerpsApp = new BerpsApp(wallet);
      const bex: BexApp = new BexApp(wallet);

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

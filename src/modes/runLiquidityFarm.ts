import { Account, AddLiquidityParameters } from "../utils/types";
import { BERA, BHONEY, HONEY, STGUSDC } from "../blockchain_data/tokens";
import { Wallet } from "../modules/classes/wallet";
import { rint, sleep } from "../utils/utils";
import { BexSwap } from "../modules/dapps/bexSwap";
import { Berps } from "../modules/dapps/berps";
import { Vault } from "../modules/dapps/vault";
import config from "../config";
import logger from "../utils/logger";
import { HONEY_USDC, HONEY_WBERA } from "../blockchain_data/pools";
import { HONEY_WBERA_LP_TOKEN } from "../blockchain_data/liquidityTokens.ts";
import { HONEY_WBERA_VAULT } from "../blockchain_data/vaults.ts";

export const runLiquidityFarm = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet: Wallet = new Wallet(account.key);
      const vault: Vault = new Vault(wallet);
      const bex: BexSwap = new BexSwap(wallet);

      const beraBalance: number =
        Number(
          (Number(await wallet.getBalance()) / 10 ** 18).toString().slice(0, 10)
        ) * 0.98;

      await bex.swapByApi(BERA, HONEY, beraBalance * 0.45);

      const honeyBalance = await wallet.getTokenBalance(HONEY);

      const addLiquidityChoices = [
        {
          firstTokenAddress: HONEY,
          secondTokenAddress: BERA,
          amountToAdd: honeyBalance,
          poolAddress: HONEY_WBERA,
        },
        {
          firstTokenAddress: HONEY,
          secondTokenAddress: STGUSDC,
          amountToAdd: honeyBalance,
          poolAddress: HONEY_USDC,
        },
      ];

      const addLiquidityData: AddLiquidityParameters = addLiquidityChoices[0];

      try {
        await bex.addLiquidity(addLiquidityData);

        await vault.depositLiquidityTokens(
          HONEY_WBERA_LP_TOKEN,
          HONEY_WBERA,
          HONEY_WBERA_VAULT,
          await wallet.getTokenBalance(HONEY_WBERA_LP_TOKEN)
        );
      } catch (error) {
        logger.error(error);
        return;
      }
    })
  );
};

import {
  Account,
  AddLiquidityParameters,
  lpTokenDepositParameters,
} from "../utils/types";
import { BERA, HONEY, STGUSDC } from "../blockchain_data/tokens";
import { Wallet } from "../modules/classes/wallet";
import { randomChoice, rint, sleep } from "../utils/utils";
import { BexSwap } from "../modules/dapps/bexSwap";
import { Vault } from "../modules/dapps/vault";
import config from "../config";
import logger from "../utils/logger";
import { HONEY_USDC, HONEY_WBERA } from "../blockchain_data/pools";
import {
  HONEY_USDC_LP_TOKEN,
  HONEY_WBERA_LP_TOKEN,
} from "../blockchain_data/liquidityTokens.ts";
import {
  HONEY_USDC_VAULT,
  HONEY_WBERA_VAULT,
} from "../blockchain_data/vaults.ts";

export const runLiquidityFarm = async (accounts: Account[]): Promise<void> => {
  await Promise.all(
    accounts.map(async (account) => {
      const wallet: Wallet = new Wallet(account.key);
      const vault: Vault = new Vault(wallet);
      const bex: BexSwap = new BexSwap(wallet);

      await sleep(rint(1000, config.delayOnChainTo * 1000));

      const beraBalance: number = await wallet.getFormattedEtherBalance();

      const pairs = ["honeyWbera", "honeyUsdc"];
      const pairChoice = randomChoice(pairs);

      try {
        switch (pairChoice) {
          case "honeyWbera":
            await bex.swapByApi(BERA, HONEY, beraBalance * rint(0.1, 0.5));
            break;
          case "honeyUsdc":
            await bex.swapByApi(BERA, HONEY, beraBalance * rint(0.1, 0.5));
            await bex.swapByApi(BERA, STGUSDC, beraBalance * rint(0.1, 0.5));
            break;
          default:
            break;
        }
      } catch (error) {
        logger.error(error);
        return;
      }

      const addLiquidityParameters = {
        honeyWbera: {
          firstTokenAddress: HONEY,
          secondTokenAddress: BERA,
          amountToAdd: beraBalance * rint(0.2, 0.5),
          poolAddress: HONEY_WBERA,
        },
        honeyUsdc: {
          firstTokenAddress: HONEY,
          secondTokenAddress: STGUSDC,
          amountToAdd: (await wallet.getTokenBalance(STGUSDC)) * rint(0.1, 0.9),
          poolAddress: HONEY_USDC,
        },
      };

      const depositParameters = {
        honeyWbera: {
          liquidityTokenAddress: HONEY_WBERA_LP_TOKEN,
          poolAddress: HONEY_WBERA,
          vaultAddress: HONEY_WBERA_VAULT,
          amountToAdd:
            (await wallet.getTokenBalance(HONEY_WBERA_LP_TOKEN)) * 0.99,
        },
        honeyUsdc: {
          liquidityTokenAddress: HONEY_USDC_LP_TOKEN,
          poolAddress: HONEY_USDC,
          vaultAddress: HONEY_USDC_VAULT,
          amountToAdd:
            (await wallet.getTokenBalance(HONEY_USDC_LP_TOKEN)) * 0.99,
        },
      };

      const liquidityChoice: AddLiquidityParameters =
        addLiquidityParameters[pairChoice];

      const depositParametersChoice: lpTokenDepositParameters =
        depositParameters[pairChoice];

      try {
        await bex.addLiquidity(liquidityChoice);
        await vault.depositLiquidityTokens(depositParametersChoice);
      } catch (error) {
        logger.error(error);
        return;
      }
    })
  );
};

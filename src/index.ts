import {
    WBTC_HONEY,
    STGUSDC_HONEY,
    WBERA_HONEY,
    WETH_HONEY,
    STGUSDC_BERA,
    BERA_HONEY,
    HONEY_WBERA_WETH_WBTC,
    BERA_WETH
} from "./blockchain_data/pools";

import {
    STGUSDC,
    HONEY,
    WETH,
    WBERA,
    WBTC,
    BERA
} from "./blockchain_data/tokens";

import { Wallet } from "./modules/wallet";
import { BexSwap } from "./modules/bexSwap";
import { Honey } from "./modules/honey";
import { Bend } from "./modules/bend";
import { HoneyJar } from "./modules/honeyjar";
import { Deployer } from "./modules/deployer";
import { Faucet } from "./modules/faucet";
import { Account } from "./utils/types";
import { rint, shuffleArray, createAccounts } from "./utils/utils"
import logger from "./modules/logger";
import config from "./config";

const main = async () => {

    const accounts: Account[] = shuffleArray(await createAccounts())

    switch (process.argv.slice(2)[0]) {
        case "faucet":
            logger.info("Launching faucet...")
            await Promise.all(accounts.map(async account => {
                const token = await Faucet.solveCaptcha(account.proxy)
                await Faucet.dripTokens(account, token)
                new Promise(resolve => setTimeout(() => { }, config.delayFaucet * 1000))
            }))

            break
        case "chain":
            logger.info("Launching onchain actions...")

            await Promise.all(accounts.map(async account => {
                const wallet = new Wallet(account.key);

                const bex = new BexSwap(wallet);
                const bend = new Bend(wallet);
                const honey = new Honey(wallet);
                const honeyjar = new HoneyJar(wallet);
                const deployer = new Deployer(wallet);


                const swapCombinations = [
                    async () => await bex.swapByPool(STGUSDC, HONEY, STGUSDC_HONEY, await wallet.getTokenBalance(STGUSDC) * 0.5),
                    async () => await bex.swapByPool(HONEY, WETH, WETH_HONEY, await wallet.getTokenBalance(HONEY) * 0.5),
                    async () => await bex.swapByPool(WBERA, HONEY, WBERA_HONEY, await wallet.getTokenBalance(WBERA) * 0.5),
                    async () => await bex.swapByPool(WETH, HONEY, WETH_HONEY, await wallet.getTokenBalance(WETH) * 0.5),
                    async () => await bex.swapByPool(STGUSDC, BERA, STGUSDC_BERA, await wallet.getTokenBalance(STGUSDC) * 0.5),
                    async () => await bex.swapByPool(BERA, HONEY, BERA_HONEY, rint(0.05, 0.5)),
                    async () => await bex.swapByPool(HONEY, WBERA, HONEY_WBERA_WETH_WBTC, await wallet.getTokenBalance(HONEY) * 0.5),
                    async () => await bex.swapByPool(BERA, WETH, BERA_WETH, rint(0.05, 0.5)),
                    async () => await bex.swapByPool(WBTC, HONEY, WBTC_HONEY, await wallet.getTokenBalance(WBTC) * 0.5),
                    async () => await bex.swapByPool(WETH, BERA, BERA_WETH, await wallet.getTokenBalance(WETH) * 0.5),
                    async () => await bex.swapByPool(STGUSDC, BERA, STGUSDC_BERA, await wallet.getTokenBalance(STGUSDC) * 0.5),
                    async () => await bex.swapByPool(STGUSDC, BERA, STGUSDC_BERA, await wallet.getTokenBalance(STGUSDC) * 0.5),
                    async () => await bex.swapByPool(HONEY, BERA, BERA_HONEY, await wallet.getTokenBalance(HONEY) * 0.5),
                    async () => await bex.wrapBera(rint(0.01, 1)),
                    async () => await bex.unwrapBera(rint(0.01, 1)),
                    async () => await bend.deposit(WETH, await wallet.getTokenBalance(WETH) * 0.5),
                    async () => await bend.withdraw(WETH, rint(0.001, 0.02)),
                    async () => await bend.borrow(HONEY, rint(0.1, 5)),
                    async () => await bend.repay(HONEY, await wallet.getTokenBalance(HONEY) * 0.5),
                    async () => await honey.mintHoney(rint(1, rint(5, 20))),
                    async () => await honey.redeemHoney(rint(1, rint(5, 20))),
                    async () => await honeyjar.mintHoneyJar(),
                    async () => await deployer.deployContract()
                ];

                for (let i = 0; i < config.onChainSteps; i++) {
                    const randomAction = swapCombinations[Math.floor(Math.random() * swapCombinations.length)];
                    await randomAction();
                    await new Promise(resolve => setTimeout(resolve, config.delayOnChain * 1000));
                }

            }));
            break

        case "warmup":
            logger.info("Launching warmup...")

            await Promise.all(accounts.map(async account => {
                const wallet = new Wallet(account.key);
                const bex = new BexSwap(wallet);

                await bex.swapByPool(BERA, STGUSDC, STGUSDC_BERA, rint(0.05, 1))
                await bex.swapByPool(BERA, HONEY, BERA_HONEY, rint(0.05, 1))
            }))


            break
        case "deploy":
            logger.info("Launching deploy...")

            await Promise.all(accounts.map(async account => {
                const wallet = new Wallet(account.key);
                const deployer = new Deployer(wallet)


                await deployer.deployContract()
                await new Promise(resolve => setTimeout(resolve, config.delayOnChain * 1000));
            }))

            break
        default:
            logger.warn(`\nWrong or empty arguments.\n\nExamples:\n"npm run main faucet"\n"npm run main chain"\n"npm run main warmup"\n"npm run main deploy"`)
            break
    }

}

main();

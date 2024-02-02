import logger from "./logger";
import { ethers } from "ethers-ts"
import { Swap } from "../utils/types"
import { BERA, WBERA } from '../blockchain_data/tokens';
import { DEXABI, WBERA_CONTRACT_ABI } from "../blockchain_data/abi";
import { DEXADDRESS, WBERA_CONTRACT, APPROVE_LIQUIDITY } from "../blockchain_data/contracts"
import { Wallet } from "./wallet"
import { BaseWeb3App } from "./web3app"
import axios from "axios";

export class BexSwap extends BaseWeb3App {

    wallet: Wallet
    dexContract: ethers.Contract

    constructor(wallet: Wallet) {
        super()
        this.wallet = wallet
        this.dexContract = new ethers.Contract(DEXADDRESS, DEXABI, this.wallet.wallet);
    }

    async swapByPool(tokenFrom: string, tokenTo: string, pool: string, amount: number): Promise<any> {

        const swapAmount = ethers.utils.parseUnits(amount.toString(), 18);

        if (tokenFrom != BERA) {
            const tokenFromBalance = await this.wallet.getTokenBalance(tokenFrom);
            if (tokenFromBalance < amount || tokenFromBalance < 0) {
                logger.error(`Balance is not enough to swap. BALANCE: ${tokenFromBalance}`);
                return
            } else if (Number(await this.wallet.getAllowance(tokenFrom, APPROVE_LIQUIDITY)) < amount) {
                await this.wallet.approve(APPROVE_LIQUIDITY, tokenFrom, 999999999)
            } else if (Number(await this.wallet.getAllowance(tokenFrom, DEXADDRESS)) < amount) {
                await this.wallet.approve(DEXADDRESS, tokenFrom, 999999999)
            }
        }


        const swaps: Swap[] = [
            {
                poolId: pool,
                assetIn: tokenFrom,
                assetOut: tokenTo,
                amountIn: swapAmount,
                amountOut: 0,
                userData: new Uint8Array(0),
            },
        ]


        const gasPrice = ethers.utils.formatUnits(await this.provider.getGasPrice(), 'gwei');
        const increasedGasPrice = parseFloat(gasPrice) + 10;

        try {
            const transaction: any = await this.dexContract.batchSwap(0, swaps, Math.floor(Date.now() / 1000) + 3600, {
                gasLimit: 300000 + Math.floor(Math.random() * 10000),
                value: swapAmount,
                nonce: await this.provider.getTransactionCount(this.wallet.wallet.address),
                gasPrice: ethers.utils.parseUnits(increasedGasPrice.toString(), 'gwei'),
            });

            await this.waitForTx("Swap", transaction)

            return

        } catch (error) {
            logger.error(`Error occurred when tried to swap ${tokenFrom}`);
        }


    }

    async swapByApi(tokenFrom: string, tokenTo: string, amount: number): Promise<any> {

        const swapAmount = ethers.utils.parseUnits(amount.toString(), 18)

        if (tokenFrom != BERA) {
            const tokenFromBalance = await this.wallet.getTokenBalance(tokenFrom);
            if (tokenFromBalance < amount || tokenFromBalance < 0) {
                logger.error(`Balance is not enough to swap. BALANCE: ${tokenFromBalance}`);
                return
            } else if (Number(await this.wallet.getAllowance(tokenFrom, APPROVE_LIQUIDITY)) < amount) {
                await this.wallet.approve(APPROVE_LIQUIDITY, tokenFrom, 999999999)
            }
        }

        const headers = {
            'authority': 'artio-80085-dex-router.berachain.com', 'accept': '*/*', 'cache-control': 'no-cache',
            'origin': 'https://artio.bex.berachain.com', 'pragma': 'no-cache',
            'referer': 'https://artio.bex.berachain.com/', 'user-agent': "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_3; en-US) AppleWebKit/601.6 (KHTML, like Gecko) Chrome/54.0.2569.133 Safari/537"
        }

        const params = {
            'quoteAsset': tokenTo, 'baseAsset': tokenFrom, 'amount': swapAmount,
            'swap_type': 'given_in'
        }

        const response = await axios.get('https://artio-80085-dex-router.berachain.com/dex/route', {
            headers: headers,
            params: params
        })


        if (response.data.steps == null) {
            logger.error("Such swap is not available at the moment")
            return
        } else {
            const swaps: Swap[] = []
            const data = response.data.steps

            for (let swap of data) {

                swaps.push(
                    {
                        poolId: swap.pool,
                        assetIn: swap.assetIn,
                        assetOut: swap.assetOut,
                        amountIn: swap.amountIn,
                        amountOut: swap.amountOut,
                        userData: new Uint8Array(0),
                    },
                )

            }


            const gasPrice = ethers.utils.formatUnits(await this.provider.getGasPrice(), 'gwei');
            const increasedGasPrice = parseFloat(gasPrice) + 10;

            try {
                const transaction: any = await this.dexContract.batchSwap(0, swaps, Math.floor(Date.now() / 1000) + 3600, {
                    gasLimit: 300000 + Math.floor(Math.random() * 10000),
                    value: swapAmount,
                    nonce: await this.provider.getTransactionCount(this.wallet.wallet.address),
                    gasPrice: ethers.utils.parseUnits(increasedGasPrice.toString(), 'gwei'),
                });


                await this.waitForTx("Swap", transaction)

            } catch (error) {
                logger.error(`Error occurred when tried to swap ${tokenFrom}`);
            }
        }

    }

    async wrapBera(amount: number): Promise<any> {
        try {

            const transaction = {
                to: WBERA_CONTRACT,
                value: ethers.utils.parseEther(amount.toString()), // Convert amount to wei
                gasLimit: 300000 + Math.floor(Math.random() * 10000),
            };

            const sentTransaction: ethers.providers.TransactionResponse = await this.wallet.wallet.sendTransaction(transaction);

            await this.waitForTx("Wrap", sentTransaction)

            return
        } catch (error) {
            logger.error(`Error when trying to wrap BERA`)
            return
        }
    }

    async unwrapBera(amount: number): Promise<any> {
        try {

            const wberaContract: ethers.Contract = new ethers.Contract(WBERA_CONTRACT, WBERA_CONTRACT_ABI, this.wallet.wallet);

            const unwrapTransaction: ethers.providers.TransactionResponse = await wberaContract.withdraw(ethers.utils.parseUnits(amount.toString(), 18), {
                gasLimit: 300000 + Math.floor(Math.random() * 10000),
                nonce: this.provider.getTransactionCount(this.wallet.wallet.address)
            })

            await this.waitForTx("Unwrap", unwrapTransaction)

            return
        } catch (error) {
            logger.error(`Error when trying to unwrap WBERA`)
            return
        }
    }


    async addLiquidity(poolAddress: string, assetsIn: string[], amountsIn: number[]): Promise<any> {

        const amounts = amountsIn.map(amount => {
            return ethers.utils.parseUnits(amount.toFixed(18).toString(), 18)
        })

        try {

            const addLiquidityTransaction: ethers.providers.TransactionResponse = await this.dexContract.addLiquidity(poolAddress, this.wallet.wallet.address, assetsIn, amounts, {
                gasLimit: 300000 + Math.floor(Math.random() * 10000),
                nonce: this.provider.getTransactionCount(this.wallet.wallet.address)
            })

            await this.waitForTx("Add Liquidity", addLiquidityTransaction)

            return
        } catch (error) {
            logger.error(`Error when trying to Add Liquidity`)
            return
        }


    }

}






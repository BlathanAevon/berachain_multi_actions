import logger from "./logger";
import { ethers } from "ethers-ts"
import { HONEYABI } from "../blockchain_data/abi";
import { HONEY_CONTRACT } from "../blockchain_data/contracts"
import { Wallet } from "./wallet"
import { HONEY, STGUSDC } from "../blockchain_data/tokens";
import { BaseWeb3App } from "./web3app";

export class Honey extends BaseWeb3App {
    wallet: Wallet
    honeyContract: ethers.Contract

    constructor(wallet: Wallet) {
        super()
        this.wallet = wallet
        this.honeyContract = new ethers.Contract(HONEY_CONTRACT, HONEYABI, this.wallet.wallet);
    }

    async mintHoney(amountInUsdc: number): Promise<any> {
        if (await this.wallet.getTokenBalance(STGUSDC) < amountInUsdc) {
            logger.error(this.mintHoney.name, "Amount exceeds available USDC balance")
            return
        } else if (Number(await this.wallet.getAllowance(STGUSDC, HONEY_CONTRACT)) < amountInUsdc) {
            await this.wallet.approve(HONEY_CONTRACT, STGUSDC, 999999999)
        }

        try {

            const transaction = await this.honeyContract.mint(this.wallet.wallet.address, STGUSDC, ethers.utils.parseUnits(amountInUsdc.toString(), 18), {
                gasLimit: 300000 + Math.floor(Math.random() * 10000)
            })

            this.waitForTx("Mint Honey", transaction)
            
            return
        } catch (error) {
            logger.error(`Error when trying to mint HONEY`)
            return
        }
    }

    async redeemHoney(amountInHoney: number): Promise<any> {
        if (await this.wallet.getTokenBalance(HONEY) < amountInHoney) {
            logger.error(this.redeemHoney.name, "Amount exceeds available HONEY balance")
            return
        } else if (Number(await this.wallet.getAllowance(HONEY, HONEY_CONTRACT)) < amountInHoney) {
            await this.wallet.approve(HONEY_CONTRACT, HONEY, 999999999)
        }

        try {

            const transaction = await this.honeyContract.redeem(this.wallet.wallet.address, ethers.utils.parseUnits(amountInHoney.toString(), 18), STGUSDC, {
                gasLimit: 300000 + Math.floor(Math.random() * 10000)
            })

            this.waitForTx("Redeem Honey", transaction)
            return
        } catch (error) {
            logger.error(`Error when trying to redeem STGUSDC`)
            return
        }
    }


}
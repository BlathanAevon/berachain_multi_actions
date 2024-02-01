import { BEND_ABI } from "../blockchain_data/abi";
import { BEND_ADDRESS } from "../blockchain_data/contracts";
import { Wallet } from "./wallet";
import { ethers } from "ethers-ts";
import logger from "./logger";
import { BaseWeb3App } from "./web3app";

export class Bend extends BaseWeb3App {
    wallet: Wallet
    bendContract: ethers.Contract

    constructor(wallet: Wallet) {
        super()
        this.wallet = wallet
        this.bendContract = new ethers.Contract(BEND_ADDRESS, BEND_ABI, this.wallet.wallet);
    }


    async deposit(depositTokenAddress: string, amountIn: number): Promise<void> {

        if (await this.wallet.getTokenBalance(depositTokenAddress) < amountIn) {
            logger.error(`${this.deposit.name} "Amount exceeds available token balance"`)
            return
        } else if (Number(await this.wallet.getAllowance(depositTokenAddress, BEND_ADDRESS)) < amountIn) {
            await this.wallet.approve(BEND_ADDRESS, depositTokenAddress, 999999999)
        }

        try {

            const transaction = await this.bendContract.supply(depositTokenAddress, ethers.utils.parseUnits(amountIn.toString(), 18), this.wallet.wallet.address, 0, {
                gasLimit: 300000 + Math.floor(Math.random() * 10000)
            })

            await this.waitForTx("Deposit", transaction)

            return
        } catch (error) {
            logger.error(`Error when trying to deposit ${depositTokenAddress}`)
            return
        }

    }

    async withdraw(withdrawTokenAddress: string, amountOut: number): Promise<void> {

        try {
            const transaction = await this.bendContract.withdraw(withdrawTokenAddress, ethers.utils.parseUnits(amountOut.toString(), 18), this.wallet.wallet.address, {
                gasLimit: 300000 + Math.floor(Math.random() * 10000)
            })

            await this.waitForTx("Withdraw", transaction)
            return
        } catch (error) {
            logger.error(`Error when trying to withdraw ${withdrawTokenAddress}`)
            return
        }
    }


    async borrow(borrowTokenAddress: string, borrowAmount: number): Promise<void> {

        try {
            const transaction = await this.bendContract.borrow(borrowTokenAddress, ethers.utils.parseUnits(borrowAmount.toString(), 18), 2, 0, this.wallet.wallet.address, {
                gasLimit: 300000 + Math.floor(Math.random() * 10000)
            })

            await this.waitForTx("Borrow", transaction)
            return
        } catch (error) {
            logger.error(`Error when trying to borrow ${borrowTokenAddress}`)
            return
        }
    }


    async repay(repayTokenAddres: string, repayAmount: number): Promise<void> {

        if (Number(await this.wallet.getAllowance(repayTokenAddres, BEND_ADDRESS)) < repayAmount) {
            await this.wallet.approve(BEND_ADDRESS, repayTokenAddres, 999999999)
        }

        try {
            const transaction = await this.bendContract.repay(repayTokenAddres, ethers.utils.parseUnits(repayAmount.toString(), 18), 2, this.wallet.wallet.address, {
                gasLimit: 300000 + Math.floor(Math.random() * 10000)
            })

            await this.waitForTx("Repay", transaction)
            return
        } catch (error) {
            logger.error(`Error when trying to repay ${repayTokenAddres}`)
            return
        }
    }

}
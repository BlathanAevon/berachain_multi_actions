import logger from "./logger";
import { ethers } from "ethers-ts"
import { ERC20ABI } from "../blockchain_data/abi";
import { BaseWeb3App } from "./web3app";

export class Wallet extends BaseWeb3App {

    wallet: ethers.Wallet

    constructor(privateKey: string) {
        super()
        this.wallet = new ethers.Wallet(privateKey, this.provider)
    }

    async approve(spender: string, tokenToApprove: string, amount: number): Promise<any> {
        const approveContract = new ethers.Contract(tokenToApprove, ERC20ABI, this.wallet);
        const approveAmount = ethers.utils.parseUnits(amount.toString(), 18);

        try {

            const result = await approveContract.approve(spender, approveAmount);

            await this.waitForTx("Approve", result)

            return

        } catch (error: any) {
            logger.error(`Failed approval of ${tokenToApprove}`)
            return { transactionHash: null }
        }

    }


    async getTokenBalance(tokenAddress: string): Promise<number | any> {

        try {

            const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, this.wallet)
            const tokenBalance = await tokenContract.balanceOf(this.wallet.address)

            return parseFloat(((Number(tokenBalance) / 10 ** 18)).toFixed(10));
        } catch (error) {
            logger.error(`Error when trying to get balance of ${tokenAddress}`)
            return
        }
    }

    async getAllowance(tokenAddress: string, spender: string): Promise<number | any> {
        try {

            const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, this.wallet)
            const tokenAllowance = await tokenContract.allowance(this.wallet.address, spender)

            return parseFloat(((Number(tokenAllowance) / 10 ** 18)).toFixed(10));
        } catch (error) {
            logger.error(`Error when trying to get allowance of ${tokenAddress}`)
            return
        }
    }

}
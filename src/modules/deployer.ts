import { Wallet } from "./wallet";
import { ethers } from "ethers-ts";
import logger from "./logger";
import { BaseWeb3App } from "./web3app";
import { CONTRACT_ABI, CONTRACT_BYTECODE } from "../blockchain_data/abi";


export class Deployer extends BaseWeb3App {
    wallet: Wallet

    constructor(wallet: Wallet) {
        super()
        this.wallet = wallet
    }


    async deployContract(): Promise<void> {
        try {

            let factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE, this.wallet.wallet);
            let contract = await factory.deploy();

            this.waitForTx("Deploy", contract.deployTransaction)

        } catch (error) {
            logger.error(`Error when trying to deploy contract`)
            return
        }
    }

}
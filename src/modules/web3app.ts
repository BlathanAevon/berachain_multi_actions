import { ethers } from "ethers-ts";
import logger from "./logger";
import config from "../config";

export class BaseWeb3App {
    provider: ethers.providers.JsonRpcProvider;

    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider("https://artio.rpc.berachain.com");
    }


    async waitForTx(description: string, transaction: ethers.providers.TransactionResponse): Promise<any> {

        logger.warn(`${description} created, waiting for confirmation`);

        try {

            const receipt = await this.provider.waitForTransaction(transaction.hash, 1, config.transactionTimeout * 1000)

            if (receipt.status === 1) {
                logger.info(`${description} confirmed! Hash: ${receipt.transactionHash}`);
                return receipt;
            } else {
                logger.error(`${description} failed! Transaction hash: ${receipt.transactionHash}`);
                return;
            }
        } catch (error) {

            if (error.code) {
                logger.error(`${description} timeout exceeded.`);
                return
            }

        }


    }

}
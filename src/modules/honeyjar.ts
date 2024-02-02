import { HONEYJAR_ABI, HONEYABI, ERC20ABI } from "../blockchain_data/abi";
import { HONEYJAR_ADDRESS, HONEY_CONTRACT } from "../blockchain_data/contracts";
import { Wallet } from "./wallet";
import { ethers } from "ethers-ts";
import logger from "./logger";
import { HONEY } from "../blockchain_data/tokens";
import { BaseWeb3App } from "./web3app";


export class HoneyJar extends BaseWeb3App {
    wallet: Wallet
    honeyJarContract: ethers.Contract

    constructor(wallet: Wallet) {
        super()
        this.wallet = wallet
        this.honeyJarContract = new ethers.Contract(HONEYJAR_ADDRESS, HONEYJAR_ABI, this.wallet.wallet);
    }


    async mintHoneyJar(): Promise<void> {


        const honeyContract = new ethers.Contract(HONEY, ERC20ABI, this.wallet.wallet)
        if (Number(await honeyContract.allowance(this.wallet.wallet.address, HONEYJAR_ADDRESS)) / 10 ** 18 < 5) {
            await this.wallet.approve(HONEYJAR_ADDRESS, HONEY, 9999999)
        }

        try {

            const hasMint = await this.honeyJarContract.functions.hasMinted(this.wallet.wallet.address);

            if (hasMint[0]) {
                logger.info("Wallet already minted the honeyjar")
                return
            }

            const transaction = {
                chainId: 80085,
                nonce: await this.provider.getTransactionCount(this.wallet.wallet.address),
                gasPrice: ethers.utils.parseUnits((await this.provider.getGasPrice()).toString(), 'wei'),
                gasLimit: 300000 + Math.floor(Math.random() * 10000),
                to: ethers.utils.getAddress(HONEYJAR_ADDRESS),
                data: '0xa6f2ae3a',
            };


            const signedTx = await this.wallet.wallet.signTransaction(transaction)
            const txhash = await this.provider.sendTransaction(signedTx)

            await this.waitForTx("HoneyJar Mint", txhash)
            return

        } catch (error) {
            logger.error(`Error when trying to Honey Jar Mint`)
            return
        }

    }

}
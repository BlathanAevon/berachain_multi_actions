import logger from "../utils/logger";
import { BigNumber, ethers } from "ethers-ts";
import { ERC20ABI } from "../blockchain_data/abi";
import config from "../config";
import { formatAmount } from "../utils/utils";

export class Wallet extends ethers.Wallet {
  constructor(privateKey: string) {
    const network = new ethers.providers.JsonRpcProvider(config.provider_url);
    super(privateKey, network);
  }

  async approve(
    spender: string,
    tokenToApprove: string,
    amount: number
  ): Promise<any> {
    const approveContract = new ethers.Contract(tokenToApprove, ERC20ABI, this);
    const approveAmount = ethers.utils.parseUnits(
      amount.toString(),
      await this.getTokenDecimals(tokenToApprove)
    );

    try {
      const result = await approveContract.approve(spender, approveAmount);

      await this.waitForTx("Approve", result);

      return;
    } catch (error: any) {
      throw new Error(`Failed approval of ${tokenToApprove}`);
    }
  }

  async getTokenBalance(tokenAddress: string): Promise<number | any> {
    try {
      const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, this);
      const tokenBalance: BigNumber = await tokenContract.balanceOf(
        this.address
      );

      return await formatAmount(tokenBalance, tokenContract);
    } catch (error) {
      throw new Error(`Error when trying to get balance of ${tokenAddress}`);
    }
  }

  async getAllowance(
    tokenAddress: string,
    spender: string
  ): Promise<number | any> {
    try {
      const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, this);
      const tokenAllowance: BigNumber = await tokenContract.allowance(
        this.address,
        spender
      );

      return await formatAmount(tokenAllowance, tokenContract);
    } catch (error) {
      logger.error(
        `Error when trying to get allowance of ${error} ${tokenAddress}`
      );
      throw error;
    }
  }

  async waitForTx(
    description: string,
    transaction: ethers.providers.TransactionResponse
  ): Promise<any> {
    logger.warn(`${description} created, waiting for confirmation`);

    try {
      const receipt = await this.provider.waitForTransaction(
        transaction.hash,
        1,
        config.transactionTimeout * 1000
      );

      if (receipt.status === 1) {
        logger.info(
          `${description} confirmed! Hash: ${receipt.transactionHash}`
        );
        return receipt;
      } else {
        throw new Error(
          `${description} failed! Transaction hash: ${receipt.transactionHash}`
        );
      }
    } catch (error) {
      if (error.code) {
        throw new Error(`${description} timeout exceeded.`);
      }
      throw error;
    }
  }

  async getTokenDecimals(tokenAddress: string): Promise<number> {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, this);
    return await tokenContract.decimals();
  }
}

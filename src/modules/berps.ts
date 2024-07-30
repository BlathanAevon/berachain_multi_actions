import { BERPS_ABI } from "../blockchain_data/abi";
import { BERPS } from "../blockchain_data/contracts";
import { Wallet } from "./wallet";
import { ethers } from "ethers-ts";
import { BHONEY } from "../blockchain_data/tokens";
import { BaseApp } from "./classes";

export class Berps extends BaseApp {
  constructor(wallet: Wallet) {
    super(wallet, BERPS, BERPS_ABI);
  }

  async stakeBHoney(amount: number): Promise<void> {
    if ((await this.wallet.getTokenBalance(BHONEY)) < amount || amount < 0.01) {
      throw new Error(
        `${this.stakeBHoney.name} "Amount exceeds available token balance or not enough for transaction"`
      );
    } else if (Number(await this.wallet.getAllowance(BHONEY, BERPS)) < amount) {
      await this.wallet.approve(BERPS, BHONEY, 999999999);
    }

    const stakeAmount = ethers.utils.parseUnits(
      amount.toString(),
      await this.wallet.getTokenDecimals(BHONEY)
    );

    try {
      const transaction = await this.contract.stake(stakeAmount, {
        gasLimit: 400000 + Math.floor(Math.random() * 10000),
      });

      await this.wallet.waitForTx("Stake bHONEY", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }
}

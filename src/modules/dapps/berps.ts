import { BERPS_ABI } from "../../blockchain_data/abi";
import { BERPS } from "../../blockchain_data/contracts";
import { Wallet } from "../classes/wallet";
import { ethers } from "ethers-ts";
import { BHONEY } from "../../blockchain_data/tokens";
import { DApp } from "../classes/DApp";
import { DEFAULT_APPROVE_AMOUNT, DEFAULT_GAS_LIMIT } from "../constants/dapps";

export class BerpsApp extends DApp {
  constructor(wallet: Wallet) {
    super(wallet, BERPS, BERPS_ABI);
  }

  async stakeBHoney(amount: number): Promise<void> {
    if ((await this.wallet.getTokenBalance(BHONEY)) < amount || amount < 0.01) {
      throw new Error(
        `${this.stakeBHoney.name} "Amount exceeds available token balance or not enough for transaction"`
      );
    } else if (Number(await this.wallet.getAllowance(BHONEY, BERPS)) < amount) {
      await this.wallet.approve(BERPS, BHONEY, DEFAULT_APPROVE_AMOUNT);
    }

    const stakeAmount = ethers.utils.parseUnits(
      amount.toString(),
      await this.wallet.getTokenDecimals(BHONEY)
    );

    const gasLimit = await this.contract.estimateGas.stake(stakeAmount);

    const args = [
      stakeAmount,
      {
        gasLimit: gasLimit,
      },
    ];

    try {
      const transaction = await this.contract.stake(...args);
      await this.wallet.waitForTx("Stake bHONEY", transaction);
      return;
    } catch (error) {
      throw error;
    }
  }
}

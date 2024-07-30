import { BEND_ABI } from "../../blockchain_data/abi";
import { BEND_ADDRESS } from "../../blockchain_data/contracts";
import { Wallet } from "../classes/wallet";
import { ethers } from "ethers-ts";
import { BaseApp } from "../classes/baseApp";
import { HONEY } from "../../blockchain_data/tokens";

export class Bend extends BaseApp {
  constructor(wallet: Wallet) {
    super(wallet, BEND_ADDRESS, BEND_ABI);
  }

  async deposit(token: string, amount: number): Promise<void> {
    if ((await this.wallet.getTokenBalance(token)) < amount) {
      throw `${this.deposit.name} "Amount exceeds available token balance"`;
    } else if (
      Number(await this.wallet.getAllowance(token, BEND_ADDRESS)) < amount
    ) {
      await this.wallet.approve(BEND_ADDRESS, token, 999999999);
    }

    try {
      const transaction = await this.contract.supply(
        token,
        ethers.utils.parseUnits(
          amount.toString(),
          await this.wallet.getTokenDecimals(token)
        ),
        this.wallet.address,
        18,
        {
          gasLimit: 600000 + Math.floor(Math.random() * 10000),
        }
      );

      await this.wallet.waitForTx("Deposit", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }

  async withdraw(token: string, amount: number): Promise<void> {
    try {
      const transaction = await this.contract.withdraw(
        token,
        ethers.utils.parseUnits(
          amount.toString(),
          await this.wallet.getTokenDecimals(token)
        ),
        this.wallet.address,
        {
          gasLimit: 600000 + Math.floor(Math.random() * 10000),
        }
      );

      await this.wallet.waitForTx("Withdraw", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }

  async borrow(amount: number): Promise<void> {
    try {
      const decimals = await this.wallet.getTokenDecimals(HONEY);
      const transaction = await this.contract.borrow(
        HONEY,
        ethers.utils.parseUnits(amount.toString(), decimals),
        2,
        0,
        this.wallet.address,
        {
          gasLimit: 600000 + Math.floor(Math.random() * 10000),
        }
      );

      await this.wallet.waitForTx("Borrow", transaction);
      return;
    } catch (error) {
      throw error;
    }
  }

  async repay(amount: number): Promise<void> {
    if ((await this.wallet.getTokenBalance(HONEY)) < amount) {
      throw new Error(
        `${this.deposit.name} "Amount exceeds available token balance"`
      );
    } else if (
      Number(await this.wallet.getAllowance(HONEY, BEND_ADDRESS)) < amount
    ) {
      await this.wallet.approve(BEND_ADDRESS, HONEY, 999999999);
    }

    try {
      const decimals = await this.wallet.getTokenDecimals(HONEY);
      const transaction = await this.contract.repay(
        HONEY,
        ethers.utils.parseUnits(amount.toString(), decimals),
        2,
        this.wallet.address,
        {
          gasLimit: 600000 + Math.floor(Math.random() * 10000),
        }
      );

      await this.wallet.waitForTx("Repay", transaction);
      return;
    } catch (error) {
      throw error;
    }
  }
}

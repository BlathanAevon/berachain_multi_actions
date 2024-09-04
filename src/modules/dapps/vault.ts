import { VAULT_ABI } from "../../blockchain_data/abi";
import { VAULT } from "../../blockchain_data/contracts";
import { Wallet } from "../classes/wallet";
import { ethers } from "ethers-ts";
import { HONEY } from "../../blockchain_data/tokens";
import { BaseApp } from "../classes/baseApp";

export class Vault extends BaseApp {
  constructor(wallet: Wallet) {
    super(wallet, VAULT, VAULT_ABI);
  }

  async stakeHoney(amount: number): Promise<void> {
    if ((await this.wallet.getTokenBalance(HONEY)) < amount) {
      throw new Error(
        `${this.stakeHoney.name} "Amount exceeds available token balance"`
      );
    } else if (Number(await this.wallet.getAllowance(HONEY, VAULT)) < amount) {
      await this.wallet.approve(VAULT, HONEY, 999999999);
    }

    const stakeAmount = ethers.utils.parseUnits(
      amount.toString(),
      await this.wallet.getTokenDecimals(HONEY)
    );

    try {
      const transaction = await this.contract.deposit(
        stakeAmount,
        this.wallet.address,
        {
          gasLimit: 600000 + Math.floor(Math.random() * 10000),
        }
      );

      await this.wallet.waitForTx("Stake HONEY", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }

  async requestWithdraw(amount: number): Promise<void> {
    const withdrawAmount = ethers.utils.parseUnits(
      amount.toString(),
      await this.wallet.getTokenDecimals(HONEY)
    );

    try {
      const transaction = await this.contract.makeWithdrawRequest(
        withdrawAmount,
        {
          gasLimit: 300000 + Math.floor(Math.random() * 10000),
        }
      );

      await this.wallet.waitForTx("Withdraw staked HONEY", transaction);

      return;
    } catch (error) {
      throw new Error(`Error when trying to withdraw bHONEY ${error}`);
    }
  }

  async depositLiquidityTokens(
    liquidityTokenAddress: string,
    poolAddress: string,
    vaultAddress: string,
    amountToAdd: number
  ): Promise<any> {
    if (
      (await this.wallet.getTokenBalance(liquidityTokenAddress)) < amountToAdd
    ) {
      throw `${this.depositLiquidityTokens.name} "Amount exceeds available token balance"`;
    } else if (
      Number(
        await this.wallet.getAllowance(liquidityTokenAddress, poolAddress)
      ) < amountToAdd
    ) {
      await this.wallet.approve(poolAddress, liquidityTokenAddress, 999999999);
    }

    const contract = new ethers.Contract(vaultAddress, VAULT_ABI, this.wallet);

    try {
      const transaction = await contract.stake(
        ethers.utils.parseEther(amountToAdd.toString()),
        {
          gasLimit: 600000 + Math.floor(Math.random() * 10000),
        }
      );

      await this.wallet.waitForTx("Deposit LP tokens", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }
}

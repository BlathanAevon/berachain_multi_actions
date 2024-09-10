import { ethers } from "ethers-ts";
import { HONEYABI } from "../../blockchain_data/abi";
import { HONEY_CONTRACT } from "../../blockchain_data/contracts";
import { Wallet } from "../classes/wallet";
import { HONEY, STGUSDC } from "../../blockchain_data/tokens";
import { BaseApp } from "../classes/baseApp";
import { DEFAULT_APPROVE_AMOUNT, DEFAULT_GAS_LIMIT } from "../constants/dapps";

export class Honey extends BaseApp {
  constructor(wallet: Wallet) {
    super(wallet, HONEY_CONTRACT, HONEYABI);
  }

  async mintHoney(amountInUsdc: number): Promise<any> {
    const usdcBalance = await this.wallet.getTokenBalance(STGUSDC);
    if (usdcBalance < amountInUsdc) {
      throw new Error(
        `${this.mintHoney.name}: Amount exceeds available USDC balance. Balance: ${usdcBalance}`
      );
    } else if (
      Number(await this.wallet.getAllowance(STGUSDC, HONEY_CONTRACT)) <
      amountInUsdc
    ) {
      await this.wallet.approve(
        HONEY_CONTRACT,
        STGUSDC,
        DEFAULT_APPROVE_AMOUNT
      );
    }

    try {
      const transaction = await this.contract.mint(
        STGUSDC,
        ethers.utils.parseUnits(amountInUsdc.toString().slice(0, 6), 6),
        this.wallet.address,
        {
          gasLimit: DEFAULT_GAS_LIMIT,
        }
      );

      await this.wallet.waitForTx("Mint HONEY for USDC", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }

  async redeemHoney(amountInHoney: number): Promise<any> {
    if ((await this.wallet.getTokenBalance(HONEY)) < amountInHoney) {
      throw new Error(
        `${this.redeemHoney.name} Amount exceeds available HONEY balance`
      );
    } else if (
      Number(await this.wallet.getAllowance(HONEY, HONEY_CONTRACT)) <
      amountInHoney
    ) {
      await this.wallet.approve(HONEY_CONTRACT, HONEY, DEFAULT_APPROVE_AMOUNT);
    }

    try {
      const transaction = await this.contract.redeem(
        STGUSDC,
        ethers.utils.parseUnits(
          amountInHoney.toString(),
          await this.wallet.getTokenDecimals(HONEY)
        ),
        this.wallet.address,
        {
          gasLimit: DEFAULT_GAS_LIMIT,
        }
      );

      await this.wallet.waitForTx("Redeem USDC for HONEY", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }
}

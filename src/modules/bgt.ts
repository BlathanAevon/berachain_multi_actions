import { ethers } from "ethers-ts";
import { BGT_REWARD_ABI, ERC20ABI } from "../blockchain_data/abi";
import { BEND_BGT_REWARD, BERPS, BEX } from "../blockchain_data/contracts";
import { BGTT, HONEY } from "../blockchain_data/tokens";
import { BaseApp } from "./classes";
import { StationContract } from "../utils/types";
import { Wallet } from "./wallet";

export class BGT extends BaseApp {
  bendRewardContract: ethers.Contract;
  berpsRewardContract: ethers.Contract;
  bexRewardContract: ethers.Contract;

  constructor(wallet: Wallet) {
    super(wallet, BGTT, ERC20ABI);
    this.bendRewardContract = new ethers.Contract(
      BEND_BGT_REWARD,
      BGT_REWARD_ABI,
      this.wallet
    );
    this.berpsRewardContract = new ethers.Contract(
      BERPS,
      BGT_REWARD_ABI,
      this.wallet
    );
    this.bexRewardContract = new ethers.Contract(
      BEX,
      BGT_REWARD_ABI,
      this.wallet
    );
  }

  async getBendBgtReward(): Promise<void> {
    try {
      const transaction = await this.bendRewardContract.getReward(
        this.wallet.address
      );

      await this.wallet.waitForTx("Get BGT reward FROM BEND", transaction);
      return;
    } catch (error) {
      throw error;
    }
  }

  async getBexBgtReward(): Promise<void> {
    try {
      const transaction = await this.bexRewardContract.getReward(
        this.wallet.address
      );

      await this.wallet.waitForTx("Get BGT reward FROM BEX", transaction);
      return;
    } catch (error) {
      throw error;
    }
  }

  async getBerpsBgtReward(): Promise<void> {
    try {
      const transaction = await this.berpsRewardContract.getReward(
        this.wallet.address
      );

      await this.wallet.waitForTx("Get BGT reward FROM BERPS", transaction);
      return;
    } catch (error) {
      throw error;
    }
  }

  async delegate(
    amountToDelegate: number,
    contract: StationContract
  ): Promise<any> {
    const honeyBalance = await this.wallet.getTokenBalance(HONEY);

    const delegateContract = new ethers.Contract(
      contract,
      BGT_REWARD_ABI,
      this.wallet
    );
    if (amountToDelegate < 1) {
      amountToDelegate = 1;
    }

    if (honeyBalance < amountToDelegate) {
      throw new Error(
        `${this.delegate.name}: Amount exceeds available HONEY balance. Balance: ${honeyBalance}`
      );
    }

    await this.wallet.approve(contract, HONEY, 999999999);

    try {
      const amount = ethers.utils.parseUnits(
        amountToDelegate.toString(),
        await this.wallet.getTokenDecimals(HONEY)
      );
      const transaction = await delegateContract.addIncentive(
        HONEY,
        amount,
        amount,
        {
          gasLimit: 600000 + Math.floor(Math.random() * 10000),
        }
      );

      await this.wallet.waitForTx("Delegate HONEY", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }
}

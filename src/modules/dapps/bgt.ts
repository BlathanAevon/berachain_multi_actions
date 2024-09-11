import { BigNumber, ethers } from "ethers-ts";
import { BGT_REWARD_ABI, ERC20ABI } from "../../blockchain_data/abi";
import { BEND_BGT_REWARD, BERPS, BEX } from "../../blockchain_data/contracts";
import { BGTT, HONEY } from "../../blockchain_data/tokens";
import { DApp } from "../classes/DApp";
import { StationContract } from "../../utils/types";
import { Wallet } from "../classes/wallet";
import { DEFAULT_APPROVE_AMOUNT, DEFAULT_GAS_LIMIT } from "../constants/dapps";

export class BGTApp extends DApp {
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
        this.wallet.address,
        {
          gasLimit: DEFAULT_GAS_LIMIT,
        }
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
        this.wallet.address,
        {
          gasLimit: DEFAULT_GAS_LIMIT,
        }
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
        this.wallet.address,
        {
          gasLimit: DEFAULT_GAS_LIMIT,
        }
      );

      await this.wallet.waitForTx("Get BGT reward FROM BERPS", transaction);
      return;
    } catch (error) {
      throw error;
    }
  }

  async delegateHoney(
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
        `${this.delegateHoney.name}: Amount exceeds available HONEY balance. Balance: ${honeyBalance}`
      );
    }

    await this.wallet.approve(contract, HONEY, DEFAULT_APPROVE_AMOUNT);

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
          gasLimit: DEFAULT_GAS_LIMIT,
        }
      );

      await this.wallet.waitForTx("Delegate HONEY", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }

  async delegateBGT(amountToDelegate: number, validator: string): Promise<any> {
    const balance: number = await this.wallet.getTokenBalance(BGTT);

    const delegateContract: ethers.Contract = new ethers.Contract(
      BGTT,
      BGT_REWARD_ABI,
      this.wallet
    );

    if (balance < amountToDelegate) {
      throw new Error(
        `${this.delegateBGT.name}: Amount exceeds available BGT balance. Balance: ${balance}`
      );
    }

    try {
      const amount: BigNumber = ethers.utils.parseUnits(
        amountToDelegate.toString(),
        await this.wallet.getTokenDecimals(BGTT)
      );
      const transaction = await delegateContract.queueBoost(validator, amount, {
        gasLimit: DEFAULT_GAS_LIMIT,
      });

      await this.wallet.waitForTx(
        `Delegating ${amountToDelegate} BGT to Validator`,
        transaction
      );

      return;
    } catch (error) {
      throw error;
    }
  }

  async activateBoost(validator): Promise<any> {
    const contract = new ethers.Contract(BGTT, BGT_REWARD_ABI, this.wallet);

    try {
      const transaction = await contract.activateBoost(validator, {
        gasLimit: DEFAULT_GAS_LIMIT,
      });

      await this.wallet.waitForTx("Activate Boost", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }
}

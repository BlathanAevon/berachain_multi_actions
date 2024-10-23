import { BigNumber, ethers } from "ethers-ts";
import { BGT_REWARD_ABI, ERC20ABI } from "../../blockchain_data/abi";
import { BEND_BGT_REWARD, BERPS } from "../../blockchain_data/contracts";
import { BGTT, HONEY } from "../../blockchain_data/tokens";
import { DApp } from "../classes/DApp";
import { StationContract } from "../../utils/types";
import { Wallet } from "../classes/wallet";
import { DEFAULT_APPROVE_AMOUNT } from "../constants/dapps";
import {
  HONEY_USDC_VAULT,
  HONEY_WBERA_VAULT,
} from "../../blockchain_data/vaults";

export class BGTApp extends DApp {
  bendRewardContract: ethers.Contract;
  berpsRewardContract: ethers.Contract;
  bexRewardHoneyWberaContract: ethers.Contract;
  bexRewardHoneyUsdcContract: ethers.Contract;

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
    this.bexRewardHoneyWberaContract = new ethers.Contract(
      HONEY_WBERA_VAULT,
      BGT_REWARD_ABI,
      this.wallet
    );
    this.bexRewardHoneyUsdcContract = new ethers.Contract(
      HONEY_USDC_VAULT,
      BGT_REWARD_ABI,
      this.wallet
    );
  }

  async getBendBgtReward(): Promise<void> {
    const gasLimit = await this.bendRewardContract.estimateGas.getReward(
      this.wallet.address
    );

    const args = [
      this.wallet.address,
      {
        gasLimit: gasLimit,
      },
    ];

    try {
      const transaction = await this.bendRewardContract.getReward(...args);

      await this.wallet.waitForTx("Get BGT reward FROM BEND", transaction);
      return;
    } catch (error) {
      throw error;
    }
  }

  async getHoneyUsdcBgtReward(): Promise<void> {
    const gasLimit =
      await this.bexRewardHoneyUsdcContract.estimateGas.getReward(
        this.wallet.address
      );

    const args = [
      this.wallet.address,
      {
        gasLimit: gasLimit,
      },
    ];

    try {
      const transaction = await this.bexRewardHoneyUsdcContract.getReward(
        ...args
      );

      await this.wallet.waitForTx(
        "Get BGT reward FROM HONEY/USDC",
        transaction
      );
      return;
    } catch (error) {
      throw error;
    }
  }

  async getHoneyWberaBgtReward(): Promise<void> {
    const gasLimit =
      await this.bexRewardHoneyWberaContract.estimateGas.getReward(
        this.wallet.address
      );

    const args = [
      this.wallet.address,
      {
        gasLimit: gasLimit,
      },
    ];

    try {
      const transaction = await this.bexRewardHoneyWberaContract.getReward(
        ...args
      );

      await this.wallet.waitForTx(
        "Get BGT reward FROM HONEY/WBERA",
        transaction
      );
      return;
    } catch (error) {
      throw error;
    }
  }

  async getBerpsBgtReward(): Promise<void> {
    const gasLimit = await this.berpsRewardContract.estimateGas.getReward(
      this.wallet.address
    );

    const args = [
      this.wallet.address,
      {
        gasLimit: gasLimit,
      },
    ];

    try {
      const transaction = await this.berpsRewardContract.getReward(...args);

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

      const gasLimit = await delegateContract.estimateGas.addIncentive(
        HONEY,
        amount,
        amount
      );

      const args = [
        HONEY,
        amount,
        amount,
        {
          gasLimit: gasLimit,
        },
      ];

      const transaction = await delegateContract.addIncentive(...args);

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

    const boostedBgtAmount =
      (await delegateContract.boosts(this.wallet.address)) / 10 ** 18;

    amountToDelegate -= boostedBgtAmount * 0.99;

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

      const gasLimit = await delegateContract.estimateGas.queueBoost(
        validator,
        amount
      );

      const args = [
        validator,
        amount,
        {
          gasLimit: gasLimit,
        },
      ];

      const transaction = await delegateContract.queueBoost(...args);

      await this.wallet.waitForTx(
        `Delegating ${amountToDelegate.toFixed(4)} BGT to Validator`,
        transaction
      );

      return;
    } catch (error) {
      throw error;
    }
  }

  async activateBoost(validator: string): Promise<any> {
    const contract = new ethers.Contract(BGTT, BGT_REWARD_ABI, this.wallet);

    const gasLimit = await contract.estimateGas.activateBoost(validator);

    const args = [
      validator,
      {
        gasLimit: gasLimit,
      },
    ];

    try {
      const transaction = await contract.activateBoost(...args);

      await this.wallet.waitForTx("Activate Boost", transaction);

      return;
    } catch (error) {
      throw error;
    }
  }
}

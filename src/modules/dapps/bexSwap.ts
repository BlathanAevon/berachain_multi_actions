import { ethers } from "ethers-ts";
import { Swap } from "../../utils/types";
import { BERA, WBERA } from "../../blockchain_data/tokens";
import { DEXABI, WBERA_CONTRACT_ABI } from "../../blockchain_data/abi";
import { DEXADDRESS, WBERA_CONTRACT } from "../../blockchain_data/contracts";
import { Wallet } from "../classes/wallet";
import { BaseApp } from "../classes/baseApp";
import { getSwapPath } from "../../utils/utils";

export class BexSwap extends BaseApp {
  constructor(wallet: Wallet) {
    super(wallet, DEXADDRESS, DEXABI);
  }

  async wrapBera(amount: number): Promise<any> {
    try {
      const transaction = {
        to: WBERA_CONTRACT,
        value: ethers.utils.parseEther(amount.toString()),
        gasLimit: 300000 + Math.floor(Math.random() * 10000),
      };

      const sentTransaction: ethers.providers.TransactionResponse =
        await this.wallet.sendTransaction(transaction);

      await this.wallet.waitForTx("Wrap", sentTransaction);

      return;
    } catch (error) {
      throw error;
    }
  }

  async unwrapBera(amount: number): Promise<any> {
    try {
      const wberaContract: ethers.Contract = new ethers.Contract(
        WBERA_CONTRACT,
        WBERA_CONTRACT_ABI,
        this.wallet
      );

      const unwrapTransaction: ethers.providers.TransactionResponse =
        await wberaContract.withdraw(
          ethers.utils.parseUnits(amount.toString(), 18),
          {
            gasLimit: 300000 + Math.floor(Math.random() * 10000),
            nonce: this.wallet.provider.getTransactionCount(
              this.wallet.address
            ),
          }
        );

      await this.wallet.waitForTx("Unwrap", unwrapTransaction);

      return;
    } catch (error) {
      throw error;
    }
  }

  async swapByApi(
    tokenFrom: string,
    tokenTo: string,
    amount: number
  ): Promise<any> {
    const unwrap: boolean = tokenTo == BERA ? true : false;
    const wrap: boolean = tokenFrom == BERA ? true : false;

    if (tokenFrom == BERA) {
      tokenFrom = WBERA;
      if (wrap) {
        try {
          await this.wrapBera(amount);
        } catch (error) {
          throw error;
        }
      }
    }

    const tokenFromBalance = await this.wallet.getTokenBalance(tokenFrom);

    if (wrap) {
      amount = amount - (amount - tokenFromBalance);
    }

    if (tokenFromBalance < amount || tokenFromBalance == 0) {
      throw new Error(
        `Balance is not enough to swap. BALANCE: ${tokenFromBalance}`
      );
    } else if (
      Number(await this.wallet.getAllowance(tokenFrom, DEXADDRESS)) < amount
    ) {
      await this.wallet.approve(DEXADDRESS, tokenFrom, 999999999);
    }

    const swapAmount = ethers.utils.parseUnits(
      amount.toString(),
      await this.wallet.getTokenDecimals(tokenFrom)
    );

    const response = await getSwapPath(tokenFrom, tokenTo, swapAmount);

    if (response.data.steps == null) {
      throw new Error("Such swap is not available at the moment");
    } else {
      const swaps: Swap[] = [];
      const data = response.data.steps;

      for (let swap of data) {
        swaps.push({
          poolIdx: swap.poolIdx,
          base: swap.base,
          quote: swap.quote,
          isBuy: swap.isBuy,
        });
      }

      try {
        const transaction: any = await this.contract.multiSwap(
          swaps,
          swapAmount,
          0,
          {
            gasLimit: 900000 + Math.floor(Math.random() * 10000),
            value: 0,
          }
        );

        await this.wallet.waitForTx("Swap", transaction);

        if (unwrap) {
          const tokenBalance = await this.wallet.getTokenBalance(WBERA);
          await this.unwrapBera(tokenBalance);
        }
      } catch (error) {
        throw error;
      }
    }
  }
}

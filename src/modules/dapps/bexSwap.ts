import { ethers } from "ethers-ts";
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
    let tokenFromBalance;
    let swapAmount;
    let swapsArray;

    if (tokenFrom !== BERA) {
      tokenFromBalance = await this.wallet.getTokenBalance(tokenFrom);

      if (
        Number(await this.wallet.getAllowance(tokenFrom, DEXADDRESS)) < amount
      ) {
        await this.wallet.approve(DEXADDRESS, tokenFrom, 999999999);
      }

      swapAmount = ethers.utils.parseUnits(
        amount.toString(),
        await this.wallet.getTokenDecimals(tokenFrom)
      );
    } else {
      tokenFromBalance = await this.wallet.getBalance();

      swapAmount = ethers.utils.parseEther(amount.toString());
    }

    if (tokenFromBalance < amount || tokenFromBalance == 0) {
      throw new Error(
        `Balance is not enough to swap. BALANCE: ${tokenFromBalance}`
      );
    }

    const response = await getSwapPath(
      tokenFrom == BERA ? WBERA : tokenFrom,
      tokenTo == BERA ? WBERA : tokenTo,
      Number(swapAmount).toString()
    );

    if (response.data.steps == null) {
      throw new Error("Such swap is not available at the moment");
    } else {
      if (tokenFrom !== BERA) {
        swapsArray = response.data.steps;
      } else {
        swapsArray = [
          {
            poolIdx: "36000",
            base: tokenTo.toString(),
            quote: "0x0000000000000000000000000000000000000000",
            isBuy: false,
          },
        ];
      }

      try {
        const transaction: any = await this.contract.multiSwap(
          swapsArray,
          swapAmount,
          0,
          {
            gasLimit: 2000000,
            value: tokenFrom != BERA ? 0 : swapAmount,
          }
        );

        await this.wallet.waitForTx("Swap", transaction);
      } catch (error) {
        throw error;
      }
    }
  }
}

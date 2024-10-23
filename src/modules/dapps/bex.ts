import { ethers } from "ethers-ts";
import { BERA, STGUSDC, WBERA, WBTC } from "../../blockchain_data/tokens";
import {
  DEXABI,
  LIQUIDITY_ABI,
  WBERA_CONTRACT_ABI,
} from "../../blockchain_data/abi";
import {
  APPROVE_LIQUIDITY,
  DEXADDRESS,
  WBERA_CONTRACT,
} from "../../blockchain_data/contracts";
import { Wallet } from "../classes/wallet";
import { DApp } from "../classes/DApp";
import { AddLiquidityParameters } from "../../utils/types";
import tokenNames from "../../blockchain_data/tokenNames";
import logger from "../classes/logger";
import { DEFAULT_APPROVE_AMOUNT, DEFAULT_GAS_LIMIT } from "../constants/dapps";
import { DataHelper } from "../classes/dataHelper";
const randomUseragent = require("random-useragent");
import axios from "axios";

export class BexApp extends DApp {
  constructor(wallet: Wallet) {
    super(wallet, DEXADDRESS, DEXABI);
  }

  public async wrapBera(amount: number): Promise<any> {
    try {
      const transaction = {
        to: WBERA_CONTRACT,
        value: ethers.utils.parseEther(amount.toString()),
        gasLimit: 21000,
      };

      const sentTransaction: ethers.providers.TransactionResponse =
        await this.wallet.sendTransaction(transaction);

      await this.wallet.waitForTx("Wrap", sentTransaction);

      return;
    } catch (error) {
      throw error;
    }
  }

  public async unwrapBera(amount: number): Promise<any> {
    const wberaContract: ethers.Contract = new ethers.Contract(
      WBERA_CONTRACT,
      WBERA_CONTRACT_ABI,
      this.wallet
    );

    const nonce = this.wallet.provider.getTransactionCount(this.wallet.address);
    const formattedAmount = ethers.utils.parseUnits(amount.toString(), 18);
    const gasLimit = await wberaContract.estimateGas.withdraw(formattedAmount, {
      nonce,
    });

    const args = [formattedAmount, { nonce, gasLimit }];

    try {
      const unwrapTransaction: ethers.providers.TransactionResponse =
        await wberaContract.withdraw(...args);

      await this.wallet.waitForTx("Unwrap", unwrapTransaction);

      return;
    } catch (error) {
      throw error;
    }
  }

  private async getSwapPath(
    tokenFrom: string,
    tokenTo: string,
    amount
  ): Promise<any> {
    const headers = {
      authority: "https://bartio-bex-router.berachain.com",
      accept: "*/*",
      "cache-control": "no-cache",
      origin: "https://bartio.bex.berachain.com/",
      pragma: "no-cache",
      referer: "https://bartio.bex.berachain.com/",
      "user-agent": randomUseragent.getRandom(),
    };

    const params = {
      fromAsset: tokenTo,
      toAsset: tokenFrom,
      amount: amount,
    };

    const response = await axios.get(
      `https://bartio-bex-router.berachain.com/dex/route?fromAsset=${tokenFrom}&toAsset=${tokenTo}&amount=${amount}`,
      {
        headers: headers,
        params: params,
      }
    );

    return response;
  }

  public async swapByApi(
    tokenFrom: string,
    tokenTo: string,
    amount: number
  ): Promise<any> {
    let tokenFromBalance;
    let swapAmount;
    let swapsArray;
    let gasLimit;

    if (tokenFrom !== BERA) {
      tokenFromBalance = await this.wallet.getTokenBalance(tokenFrom);

      if (
        Number(await this.wallet.getAllowance(tokenFrom, DEXADDRESS)) < amount
      ) {
        await this.wallet.approve(
          DEXADDRESS,
          tokenFrom,
          DEFAULT_APPROVE_AMOUNT
        );
      }

      swapAmount = ethers.utils.parseUnits(
        amount.toString(),
        await this.wallet.getTokenDecimals(tokenFrom)
      );
    } else {
      tokenFromBalance = await this.wallet.getBalance();

      swapAmount = ethers.utils.parseEther(amount.toString());
    }

    if (
      tokenFromBalance < amount ||
      tokenFromBalance == 0 ||
      tokenFromBalance < 0.01
    ) {
      throw new Error(
        `Balance is not enough or too low for swap. BALANCE: ${tokenFromBalance}`
      );
    }

    const response = await this.getSwapPath(
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
        if (tokenTo == STGUSDC) {
          swapsArray = [
            {
              poolIdx: "36000",
              base: BERA,
              quote: STGUSDC,
              isBuy: true,
            },
          ];
        } else {
          swapsArray = [
            {
              poolIdx: tokenTo == WBTC ? "36001" : "36000",
              base: tokenTo.toString(),
              quote: "0x0000000000000000000000000000000000000000",
              isBuy: false,
            },
          ];
        }
      }

      const value = tokenFrom != BERA ? 0 : swapAmount;

      try {
        gasLimit = await this.contract.estimateGas.multiSwap(
          swapsArray,
          swapAmount,
          0,
          { value: value }
        );
      } catch (e) {
        gasLimit = DEFAULT_GAS_LIMIT;
      }

      const args = [
        swapsArray,
        swapAmount,
        0,
        {
          value: value,
          gasLimit: gasLimit,
        },
      ];

      try {
        const transaction: any = await this.contract.multiSwap(...args);
        await this.wallet.waitForTx("Swap", transaction);
        return;
      } catch (error) {
        throw error;
      }
    }
  }

  public async addLiquidity(parameters: AddLiquidityParameters): Promise<any> {
    const contract = new ethers.Contract(
      APPROVE_LIQUIDITY,
      LIQUIDITY_ABI,
      this.wallet
    );

    const abiCoder = ethers.utils.defaultAbiCoder;
    const firstTokenAddress = parameters.firstTokenAddress;
    const secondTokenAddress = parameters.secondTokenAddress;
    let modeCode;

    if (firstTokenAddress !== BERA) {
      const firstTokenToAddBalance = await this.wallet.getTokenBalance(
        firstTokenAddress
      );

      if (firstTokenToAddBalance < parameters.amountToAdd) {
        throw new Error(
          `Balance of the first token is not enough to add. BALANCE: ${firstTokenToAddBalance}`
        );
      }

      if (
        Number(
          await this.wallet.getAllowance(firstTokenAddress, APPROVE_LIQUIDITY)
        ) < parameters.amountToAdd
      ) {
        await this.wallet.approve(
          APPROVE_LIQUIDITY,
          firstTokenAddress,
          DEFAULT_APPROVE_AMOUNT
        );
      }
    }
    if (secondTokenAddress !== BERA) {
      const secondTokenToAddBalance = await this.wallet.getTokenBalance(
        secondTokenAddress
      );

      if (secondTokenToAddBalance < parameters.amountToAdd) {
        throw new Error(
          `Balance of the second token is not enough to add liquidity. BALANCE: ${secondTokenToAddBalance}`
        );
      }

      if (
        Number(
          await this.wallet.getAllowance(secondTokenAddress, APPROVE_LIQUIDITY)
        ) < parameters.amountToAdd
      ) {
        await this.wallet.approve(
          APPROVE_LIQUIDITY,
          secondTokenAddress,
          DEFAULT_APPROVE_AMOUNT
        );
      }
    }

    if (firstTokenAddress == BERA || secondTokenAddress == BERA) {
      const beraBalance: number = await this.wallet.getFormattedEtherBalance();

      if (beraBalance < parameters.amountToAdd) {
        throw new Error(
          `Balance of the BERA is not enough to add liquidity. BALANCE: ${beraBalance}`
        );
      }
    }

    // If you don't understand values below, please refer here: https://docs.ambient.finance/developers/dex-contract-interface/flat-lp-calls

    // code,          // uint8
    // base,          // address
    // quote,         // address
    // poolIdx,       // uint256
    // bidTick,       // int24
    // askTick,       // int24
    // qty,           // uint128
    // limitLower,    // uint128
    // limitHigher,   // uint128
    // settleFlags,   // uint8
    // lpConduit      // address

    if (secondTokenAddress == BERA) {
      modeCode = 32;
    } else {
      modeCode = 31;
    }

    const poolCmdData = abiCoder.encode(
      [
        "uint8",
        "address",
        "address",
        "uint256",
        "int24",
        "int24",
        "uint128",
        "uint128",
        "uint128",
        "uint8",
        "address",
      ],

      // modeCodes
      //31 - Fixed in base tokens
      //32 - Fixed in quote tokens

      [
        modeCode,
        parameters.firstTokenAddress,
        parameters.secondTokenAddress,
        36000,
        0,
        0,
        ethers.utils.parseEther(parameters.amountToAdd.toString()),
        (1).toString(),
        BigInt(100000000000000000000000000000).toString(),
        0,
        parameters.poolAddress,
      ]
    );
    const value =
      parameters.secondTokenAddress == BERA
        ? ethers.utils.parseEther(parameters.amountToAdd.toString())
        : 0;

    const gasLimit = await contract.estimateGas.userCmd(128, poolCmdData, {
      value: value,
    });

    const args = [
      128,
      poolCmdData,
      {
        value: value,
        gasLimit: gasLimit,
      },
    ];

    try {
      logger.warn(
        `Trying to add ${tokenNames[firstTokenAddress]} and ${tokenNames[secondTokenAddress]} to pool`
      );
      const transaction: any = await contract.userCmd(...args);

      await this.wallet.waitForTx("Add liquidity", transaction);
    } catch (error) {
      throw error;
    }
  }
}

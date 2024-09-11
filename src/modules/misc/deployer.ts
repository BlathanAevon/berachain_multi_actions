import { Wallet } from "../classes/wallet";
import { ethers } from "ethers-ts";
import { CONTRACT_ABI, CONTRACT_BYTECODE } from "../../blockchain_data/abi";

export class Deployer {
  private wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  async deployContract(): Promise<void> {
    try {
      let factory = new ethers.ContractFactory(
        CONTRACT_ABI,
        CONTRACT_BYTECODE,
        this.wallet
      );
      let contract = await factory.deploy();

      await this.wallet.waitForTx("Deploy", contract.deployTransaction);
    } catch (error) {
      throw error;
    }
  }
}

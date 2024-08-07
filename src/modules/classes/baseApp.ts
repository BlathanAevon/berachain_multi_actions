import { ethers } from "ethers";
import { Wallet } from "../classes/wallet";

export class BaseApp {
  protected wallet: Wallet;
  protected contract: ethers.Contract;

  constructor(wallet: Wallet, address: string, abi: any) {
    this.wallet = wallet;
    this.contract = new ethers.Contract(address, abi, this.wallet);
  }
}

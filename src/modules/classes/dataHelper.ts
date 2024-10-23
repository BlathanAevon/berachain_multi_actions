import { BigNumber, ethers } from "ethers-ts";

export class DataHelper {
  public static rint(from: number, to: number): number {
    if (from > to) {
      throw new Error("TO is bigger than FROM!");
    }

    const randomValue = from + Math.random() * (to - from);
    const areIntegers = Number.isInteger(from) && Number.isInteger(to);

    return areIntegers ? Math.round(randomValue) : randomValue;
  }

  public static randomChoice(values: any[]) {
    return values[Math.floor(Math.random() * values.length)];
  }

  public static formatAmount = async (
    amount: BigNumber,
    contract: ethers.Contract,
    decimalsFormat: number = 10
  ) => {
    const decimals = await contract.decimals();
    const balanceInUnits = ethers.utils.formatUnits(amount, decimals);

    return balanceInUnits.slice(0, decimalsFormat);
  };

  public static shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  public static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

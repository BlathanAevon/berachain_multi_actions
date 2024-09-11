import { Account, Proxy } from "../../utils/types";
import { readFileSync } from "fs";
import { ethers } from "ethers";
import path from "path";
import { DataHelper } from "./dataHelper";

export class AccountsWorker {
  private static WALLETS_FILE_PATH = path.join(__dirname, "../../wallets.txt");
  private static PROXIES_FILE_PATH = path.join(__dirname, "../../proxies.txt");

  public static getDataFromFile = (filepath: string): string[] => {
    try {
      return readFileSync(filepath, "utf8")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    } catch (error) {
      throw error;
    }
  };

  public static createProxy(proxyString: string): Proxy {
    try {
      const [ipAddress, port, username, password] = proxyString.split(":");
      return {
        ip: ipAddress,
        port: Number(port),
        login: username,
        password: password,
      };
    } catch (error) {
      throw new Error(
        "Wrong proxy format! Proxy should be in format ip:port:login:pass"
      );
    }
  }

  public static async createAccounts(
    shuffle: boolean
  ): Promise<Account[] | any> {
    try {
      const walletsData = this.getDataFromFile(this.WALLETS_FILE_PATH);
      const proxiesData = this.getDataFromFile(this.PROXIES_FILE_PATH);

      if (walletsData.length != proxiesData.length) {
        throw new Error(
          `\nAmount of wallets and proxies should be the same!\nWallets: ${walletsData.length}\nProxies: ${proxiesData.length}\n\nIf you don't want to use proxies, just fill proxies.txt with blank lines: 0:0:a:a`
        );
      }

      const proxies: Proxy[] = proxiesData.map(this.createProxy);

      const accounts: Account[] = walletsData
        .map((key, index) => {
          try {
            const wallet = new ethers.Wallet(key);

            let proxy: Proxy = proxies[index];
            const account: Account = {
              wallet: wallet.address,
              key: key,
              proxy: proxy,
            };
            return account;
          } catch (error) {
            console.error("Error processing key:", key, error);
            return null;
          }
        })
        .filter((account): account is Account => Boolean(account));

      if (shuffle) {
        DataHelper.shuffleArray(accounts);
      }
      return accounts;
    } catch (error) {
      throw error;
    }
  }
}

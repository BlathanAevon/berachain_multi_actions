import { readFileSync } from "fs";
import { BigNumber, ethers } from "ethers";
import { Proxy, Account } from "./types";
const randomUseragent = require("random-useragent");
import axios from "axios";

export function rint(from: number, to: number): number {
  if (from > to) {
    throw new Error("TO is bigger than FROM!");
  }

  const randomValue = from + Math.random() * (to - from);
  const areIntegers = Number.isInteger(from) && Number.isInteger(to);

  return areIntegers ? Math.round(randomValue) : randomValue;
}

export function randomChoice(values: any[]) {
  return values[Math.floor(Math.random() * values.length)];
}

export const formatAmount = async (
  amount: BigNumber,
  contract: ethers.Contract,
  decimalsFormat: number = 10
) => {
  const decimals = await contract.decimals();
  const balanceInUnits = ethers.utils.formatUnits(amount, decimals);

  return balanceInUnits.slice(0, decimalsFormat);
};

export function shuffleArray(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const getDataFromFile = (filepath: string): string[] => {
  try {
    return readFileSync(filepath, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  } catch (error) {
    throw error;
  }
};

function createProxy(proxyString: string): Proxy {
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

export async function createAccounts(
  shuffle: boolean
): Promise<Account[] | any> {
  try {
    const walletsData = getDataFromFile(__dirname + "/../data/wallets.txt");
    const proxiesData = getDataFromFile(__dirname + "/../data/proxies.txt");

    if (walletsData.length != proxiesData.length) {
      throw new Error(
        `\nAmount of wallets and proxies should be the same!\nWallets: ${walletsData.length}\nProxies: ${proxiesData.length}\n\nIf you don't want to use proxies, just fill proxies.txt with blank lines: 0:0:a:a`
      );
    }

    const proxies: Proxy[] = proxiesData.map(createProxy);

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
      shuffleArray(accounts);
    }
    return accounts;
  } catch (error) {
    throw error;
  }
}

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getSwapPath(
  tokenFrom: string,
  tokenTo: string,
  amount
): Promise<any> {
  const headers = {
    authority: "https://bartio-bex-router.berachain-devnet.com",
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
    `https://bartio-bex-router.berachain-devnet.com/dex/route?fromAsset=${tokenFrom}&toAsset=${tokenTo}&amount=${amount}`,
    {
      headers: headers,
      params: params,
    }
  );

  return response;
}

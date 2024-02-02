const fs = require("fs")
const { promisify } = require('util');
import { Proxy, Account } from "./types"
import { ethers } from "ethers-ts"

const readFileAsync = promisify(fs.readFile);

export function rint(from: number, to: number): number {
    if (from > to) {
        throw new Error("TO is bigger than FROM!");
    }
    return from + Math.random() * (to - from);
}

export function shuffleArray(array: any[]): any[] {
    try {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    } catch (error) {
        throw error
    }
}

async function readDataFromFile(filePath: string): Promise<string> {
    try {
        const data = await readFileAsync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(`Error reading file ${filePath}: ${err}`);
        throw err;
    }
}

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
        throw error
    }
}

export async function createAccounts(): Promise<Account[] | any> {
    try {
        const walletsData = await readDataFromFile(__dirname + '/../data/wallets.txt');
        const proxiesData = await readDataFromFile(__dirname + '/../data/proxies.txt');

        const proxies: Proxy[] = proxiesData.split('\n').map(createProxy);

        const accounts: Account[] = walletsData.split('\n').map((key, index) => {

            if (proxies[index]) {
                const wallet = new ethers.Wallet(key);
                let proxy: Proxy = proxies[index];
                const account: Account = { wallet: wallet.address, key: key, proxy: proxy };
                return account;
            }
        }).filter((account): account is Account => Boolean(account));

        return accounts;
    } catch (error) {
        throw error
    }
}

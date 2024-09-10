const randomUseragent = require("random-useragent");
import { CaptchaResponse, Account } from "../../utils/types";
import axios from "axios";
import config from "../../config";

const COOLDOWN_STATUS = 429;
const LOW_BALANCE_STATUS = 402;

export class Faucet {
  static async solveCaptcha(): Promise<any> {
    try {
      let result;
      const task = await axios.post("https://api.capsolver.com/createTask", {
        clientKey: config.capsolverKey,
        task: {
          type: "AntiTurnstileTaskProxyLess",
          websiteURL: "https://bartio.faucet.berachain.com/",
          websiteKey: "0x4AAAAAAARdAuciFArKhVwt",
        },
      });

      do {
        try {
          result = await axios.post("https://api.capsolver.com/getTaskResult", {
            clientKey: config.capsolverKey,
            taskId: task.data.taskId,
          });

          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
          console.log(error);
          break;
        }
      } while (result.data.status != "ready");

      return result.data.solution.token;
    } catch (error) {
      throw new Error("Error with captcha");
    }
  }

  static async dripTokens(account: Account, bearer: string): Promise<void> {
    try {
      await axios.post(
        `https://bartio-faucet.berachain-devnet.com/api/claim?address=${account.wallet}`,
        { address: account.wallet },
        {
          headers: {
            Authorization: `Bearer ${bearer}`,
            "User-Agent": randomUseragent.getRandom(),
          },
          proxy: {
            protocol: "http",
            host: account.proxy.ip,
            port: account.proxy.port,
            auth: {
              username: account.proxy.login,
              password: account.proxy.password,
            },
          },
        }
      );

      return;
    } catch (error) {
      const shortWallet = `${account.wallet.slice(
        0,
        4
      )}...${account.wallet.slice(-4)}`;

      const walletMessage = `Wallet: ${shortWallet}`;

      if (error.response) {
        if (error.response.status == LOW_BALANCE_STATUS) {
          throw new Error(`${walletMessage} You don't have 0.001 ETH.`);
        } else if (error.response.status == COOLDOWN_STATUS) {
          throw new Error(`${walletMessage} Is in cooldown, try again later`);
        }
        throw new Error(`${walletMessage} Unknown error: ${error}`);
      }
      throw new Error(`${walletMessage} Could not make a response ${error}`);
    }
  }
}

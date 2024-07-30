const randomUseragent = require("random-useragent");
import { CaptchaResponse, Account } from "../../utils/types";
import axios from "axios";
import config from "../../config";

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
      const response: CaptchaResponse = await axios.post(
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
      if (error.response) {
        if (error.response.status == 402) {
          throw new Error(
            `Wallet: ${account.wallet.slice(0, 4)}...${account.wallet.slice(
              -4
            )} You don't have 0.001 ETH.`
          );
        }
        throw new Error(
          `Wallet: ${account.wallet.slice(0, 4)}...${account.wallet.slice(
            -4
          )} ${error.response.data.msg}`
        );
      }
      throw new Error(
        `Wallet: ${account.wallet.slice(0, 4)}...${account.wallet.slice(
          -4
        )} Could not make a response ${error}`
      );
    }
  }
}

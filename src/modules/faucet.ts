const randomUseragent = require('random-useragent');
import { CaptchaResponse, Account, Proxy } from "../utils/types";
import axios from "axios"
import config from "../config"
import logger from "./logger";

export class Faucet {

    static async solveCaptcha(proxy: Proxy): Promise<any> {
        try {

            const task = await axios.post("https://api.capsolver.com/createTask", {
                clientKey: config.capsolverKey,
                task: {
                    type: "ReCaptchaV3TaskProxyLess",
                    websiteURL: "https://artio.faucet.berachain.com/",
                    websiteKey: "6LfOA04pAAAAAL9ttkwIz40hC63_7IsaU2MgcwVH",
                    pageAction: "submit",
                }

            }, {
                proxy: {
                    protocol: "http",
                    host: proxy.ip,
                    port: proxy.port,
                    auth: {
                        username: proxy.login,
                        password: proxy.password,
                    },
                },
            })

            let result


            do {
                try {

                    result = await axios.post("https://api.capsolver.com/getTaskResult", {
                        clientKey: config.capsolverKey,
                        taskId: task.data.taskId
                    })

                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (error) {
                    console.log(error)
                    break
                }

            } while (result.data.status != "ready")

            return result.data.solution.gRecaptchaResponse

        } catch (error) {
            console.log("Error with captcha")
            return
        }
    }



    static async dripTokens(account: Account, bearer: string): Promise<void> {
        try {
            const response: CaptchaResponse = await axios.post(
                `https://artio-80085-faucet-api-recaptcha.berachain.com/api/claim?address=${account.wallet}`, { "address": account.wallet },
                {
                    headers: {
                        "Authorization": `Bearer ${bearer}`,
                        "User-Agent": randomUseragent.getRandom()
                    },
                    proxy: {
                        protocol: "http",
                        host: account.proxy.ip,
                        port: account.proxy.port,
                        auth: {
                            username: account.proxy.login,
                            password: account.proxy.password,
                        },
                    }
                }
            );

            logger.info(`Success! Wallet: ${account.wallet}`);
            return

        } catch (err: any) {
            logger.error(`Wallet: ${account.wallet.slice(0, 4)}...${account.wallet.slice(-4)} Error: ${err}`)
        }
        return
    }
};


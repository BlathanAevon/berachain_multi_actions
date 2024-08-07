import { Account } from "./utils/types";
import { createAccounts } from "./utils/utils";
import logger from "./utils/logger";
import inquirer from "inquirer";
import { runDeploy } from "./modes/runDeploy";
import { runFaucet } from "./modes/runFaucet";
import config from "./config";
import { runBalances } from "./modes/runBalances";
import { runBHoney } from "./modes/runBHoney";
import { choices } from "./utils/choices";
import { runGetBgtRewards } from "./modes/runGetBgtReward";
import { runVDHoney } from "./modes/runVDHoney";

const main = async () => {
  let accounts: Account[];

  try {
    accounts = await createAccounts(config.shuffleWallets);
  } catch (error) {
    logger.error(error);
    return;
  }

  while (true) {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedOption",
        message: "Choose an action:",
        choices: choices,
      },
    ]);

    switch (answer.selectedOption) {
      case "faucet":
        logger.info("Launching faucet...");
        await runFaucet(accounts);
        break;
      case "deploy":
        logger.info("Launching deploy...");
        await runDeploy(accounts);
        break;
      case "bhoney":
        await runBHoney(accounts);
        break;
      case "vdhoney":
        await runVDHoney(accounts);
        break;
      case "bgt":
        await runGetBgtRewards(accounts);
        break;
      case "balance":
        logger.info("Getting balances...");
        await runBalances(accounts);
        break;
      case "exit":
        logger.info("Goodbye!");
        process.exit(1);
      default:
        logger.warn("\nWrong or empty arguments.");
        break;
    }
  }
};

main().catch((error) => {
  console.error(error);
});

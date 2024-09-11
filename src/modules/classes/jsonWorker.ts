import fs from "fs";
import { delegationState, Delegation } from "../../utils/types";
import path from "path";

export class JsonWorker {
  private static DELEGATION_FILE_PATH: string = path.join(
    __dirname,
    "../../data/delegationState.json"
  );

  public static cleanDelegationState(): void {
    try {
      const delegationStateData = fs.readFileSync(
        this.DELEGATION_FILE_PATH,
        "utf-8"
      );

      let delegationState: delegationState = JSON.parse(delegationStateData);

      delegationState.delegations = [];

      fs.writeFile(
        this.DELEGATION_FILE_PATH,
        JSON.stringify(delegationState, null, 2),
        function (err) {
          if (err) throw err;
        }
      );
    } catch (error) {
      throw new Error("Could now clean the delegation state file");
    }
  }

  public static writeDelegationState(delegations: Delegation[]) {
    try {
      const delegationStateData = fs.readFileSync(
        this.DELEGATION_FILE_PATH,
        "utf-8"
      );

      let delegationState: delegationState = JSON.parse(delegationStateData);

      delegationState.delegations = delegations;

      fs.writeFile(
        this.DELEGATION_FILE_PATH,
        JSON.stringify(delegationState, null, 2),
        function (err) {
          if (err) throw err;
        }
      );
    } catch (error) {
      throw error;
    }
  }

  public static readDelegationState(): Delegation[] {
    try {
      const delegationStateData = fs.readFileSync(
        this.DELEGATION_FILE_PATH,
        "utf-8"
      );

      let delegationState: delegationState = JSON.parse(delegationStateData);

      return delegationState.delegations;
    } catch (error) {
      throw error;
    }
  }
}

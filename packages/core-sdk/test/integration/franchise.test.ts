import { Client } from "../../src/types/client";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryConfig, Environment } from "../../src";
import * as dotenv from "dotenv";
import { goerli } from "viem/chains";
import {getAddress, Hex, http} from "viem";
import { privateKeyToAccount } from "viem/accounts";

dotenv.config();
chai.use(chaiAsPromised);

describe("Franchise Functions", () => {
  let client: Client;

  before(function () {
    const config: StoryConfig = {
      environment: Environment.TEST,
      chain: goerli,
      transport: http(process.env.RPC_PROVIDER_URL),
      account: privateKeyToAccount((process.env.WALLET_PRIVATE_KEY || "0x") as Hex),
    };

    client = StoryClient.newClient(config);
  });

  describe("Create Franchise", async function () {
    it("should not throw error when creating a franchise", async () => {
      await expect(
        client.franchise.create({
          franchiseName: "Star War",
          franchiseSymbol: "star",
          franchiseDescription:
            "A timeless space opera franchise created by George Lucas, depicting the battle between the heroic Rebel Alliance and the evil Galactic Empire, entwined with themes of hope, destiny, and the enduring struggle between light and dark.",
        }),
      ).to.not.be.rejected;
    });
  });

  describe("List Franchises", async function () {
    it("should return a list of franchises successfully upon query", async () => {
      const response = await client.franchise.list();
      expect(response).is.not.null;
    });
  });

  // This test requires the wallet to be the same as the franchise owner.
  describe("Configure Franchise", async function () {
    it("should not throw error when configuring a franchise", async () => {
      await expect(
        client.franchise.configure({
          franchiseId: "78",
        }),
      ).to.not.be.rejected;
    });
  });
});

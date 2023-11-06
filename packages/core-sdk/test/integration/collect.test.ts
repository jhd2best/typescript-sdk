import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryConfig, Environment } from "../../src/index";
import * as dotenv from "dotenv";
import { Client } from "../../src/types/client";
import {createPublicClient, getAddress, http} from "viem";
import {fantom} from "viem/chains";
import {privateKeyToAccount} from "viem/accounts";

dotenv.config();
chai.use(chaiAsPromised);

describe("Collect client integration tests", () => {
  let client: Client;

  beforeEach(function () {
    const config: StoryConfig = {
      environment: Environment.TEST,
      chain: fantom,
      transport: http(process.env.RPC_PROVIDER_URL),
      account: privateKeyToAccount(getAddress(process.env.WALLET_PRIVATE_KEY || '')),
    };

    client = StoryClient.newClient(config);
  });

  describe("Collect an IP Asset", async function () {
    it("should return txHash when the collect transaction is successful", async () => {
      const response = await client.collect.collect({
        franchiseId: 78n,
        ipAssetId: 1n,
        collector: "0xe17aA3E4BFe9812b64354e5275A211216F1dee2a",
      });

      expect(response).to.have.property("txHash");
      expect(response.txHash).to.be.a("string");
    });
  });
});

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryConfig, Environment } from "../../src";
import * as dotenv from "dotenv";
import { IPAssetType } from "../../src/enums/IPAssetType";

import { Client } from "../../src/types/client";
import { goerli } from "viem/chains";
import {getAddress, Hex, http} from "viem";
import { privateKeyToAccount } from "viem/accounts";

dotenv.config();
chai.use(chaiAsPromised);

describe("IP Asset Functions", () => {
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

  describe("Create IP Asset", async function () {
    it("should not throw error when creating an IP Asset", async () => {
      await expect(
        client.ipAsset.create({
          franchiseId: "78",
          ipAssetType: IPAssetType.CHARACTER,
          ipAssetName: "Darth Vader",
          description: "fake desc",
          mediaUrl: "/",
          to: "0xf398C12A45Bc409b6C652E25bb0a3e702492A4ab",
          parentIpAssetId: "0",
        }),
      ).to.not.be.rejected;
    });
  });
});

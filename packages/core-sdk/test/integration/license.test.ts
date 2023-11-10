import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryConfig, Environment } from "../../src/index";
import * as dotenv from "dotenv";
import { Client } from "../../src/types/client";
import { privateKeyToAccount } from "viem/accounts";
import {getAddress, Hex, http} from "viem";
import {goerli} from "viem/chains";

dotenv.config();
chai.use(chaiAsPromised);

describe("License Functions", () => {
  let client: Client;

  before(async function () {
    const config: StoryConfig = {
      environment: Environment.TEST,
      chain: goerli,
      transport: http(process.env.RPC_PROVIDER_URL),
      account: privateKeyToAccount((process.env.WALLET_PRIVATE_KEY || "0x") as Hex),
    };

    client = StoryClient.newClient(config);
  });

  describe("Create License", async function () {
    it("should create a license", async () => {
      await expect(
        client.license.create({
          franchiseId: "78",
          ipAssetId: "1000000000001",
          licenseURI:
            "https://project-nova-content-staging.s3.us-east-2.amazonaws.com/kbw/movie.png",
        }),
      ).to.not.be.rejected;
    });
  });
});

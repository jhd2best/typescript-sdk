import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryConfig, Environment } from "../../src/index";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { Client } from "../../src/types/client";

dotenv.config();
chai.use(chaiAsPromised);

describe("License Functions", () => {
  let client: Client;

  before(async function () {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY as string, provider);

    const config: StoryConfig = {
      environment: Environment.TEST,
      account: wallet,
    };

    client = StoryClient.newClient(config);
  });

  describe("Create License", async function () {
    it("should create a license", async () => {
      await expect(
        client.license.create({
          franchiseId: "66",
          ipAssetId: "1000000000001",
          licenseURI:
            "https://project-nova-content-staging.s3.us-east-2.amazonaws.com/kbw/movie.png",
        }),
      ).to.not.be.rejected;
    });
  });
});

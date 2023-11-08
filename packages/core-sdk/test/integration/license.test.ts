import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryConfig, Environment } from "../../src/index";
import * as dotenv from "dotenv";
import { Client } from "../../src/types/client";
import { privateKeyToAccount } from "viem/accounts";
import { getAddress } from "viem";

dotenv.config();
chai.use(chaiAsPromised);

describe("License Functions", () => {
  let client: Client;

  before(async function () {
    const config: StoryConfig = {
      environment: Environment.TEST,
      account: privateKeyToAccount(getAddress(process.env.WALLET_PRIVATE_KEY || "")),
    };

    client = StoryClient.newClient(config);
  });

  describe("Create License", async function () {
    it("should create a license", async () => {
      await expect(
        client.license.create({
          franchiseId: 78n,
          ipAssetId: 1000000000001n,
          licenseURI:
            "https://project-nova-content-staging.s3.us-east-2.amazonaws.com/kbw/movie.png",
        }),
      ).to.not.be.rejected;
    });
  });
});

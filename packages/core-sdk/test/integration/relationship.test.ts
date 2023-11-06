import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryConfig, Environment } from "../../src/index";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { Client } from "../../src/types/client";

dotenv.config();
chai.use(chaiAsPromised);

describe("Relationship Functions", () => {
  let client: Client;
  // TODO: need actually IPAsset data for it to work
  const mockRequest = {
    sourceIPAsset: {
      franchiseId: "66",
      ipAssetId: "1000000000001",
    },
    destIPAsset: {
      franchiseId: "66",
      ipAssetId: "1",
    },
  };

  before(function () {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY as string, provider);

    const config: StoryConfig = {
      environment: Environment.TEST,
      account: wallet,
    };

    client = StoryClient.newClient(config);
  });

  describe("Is Relationship Expired", async function () {
    it("should check if relationship is expired and return result", async () => {
      await expect(client.relationship.isRelationshipExpired(mockRequest)).to.not.be.rejected;
    });
  });

  describe("Is Related", async function () {
    it("should check if two entities are related and return result", async () => {
      await expect(client.relationship.isRelated(mockRequest)).to.not.be.rejected;
    });
  });

  describe("Relate", async function () {
    it("should create a relationship and return txHash", async () => {
      await client.relationship.relate(mockRequest);
      await expect(client.relationship.relate(mockRequest)).to.not.be.rejected;
    });
  });

  describe.skip("Unrelate", async function () {
    it("should unrelate and return txHash", async () => {
      await client.relationship.unrelate(mockRequest);
    });
  });
});

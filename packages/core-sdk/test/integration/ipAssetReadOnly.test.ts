import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryReadOnlyConfig, Environment } from "../../src";
import * as dotenv from "dotenv";
import { ReadOnlyClient } from "../../src/types/client";

dotenv.config();
chai.use(chaiAsPromised);

describe("IP Asset Read Only Functions", () => {
  let client: ReadOnlyClient;

  before(function () {
    const config: StoryReadOnlyConfig = {
      environment: Environment.TEST,
    };

    client = StoryClient.newReadOnlyClient(config);
  });

  describe("Get IP Asset", async function () {
    it("should return asset when the asset id is valid", async () => {
      const response = await client.ipAsset.get({
        ipAssetId: "42",
      });
      expect(response.ipAsset).is.not.null;
    });
  });

  describe("List IP assets", async function () {
    it("should return a list of IP assets successfully upon query", async () => {
      const response = await client.ipAsset.list({
        ipOrgId: "0xb422E54932c1dae83E78267A4DD2805aa64A8061",
        options: {
          pagination: {
            limit: 10,
            offset: 0,
          },
        },
      });
      console.log(response);
      expect(response).is.not.null;
    });

    it("should return a list of IP assets whit pagination", async () => {
      const response = await client.ipAsset.list({
        ipOrgId: "0xb422E54932c1dae83E78267A4DD2805aa64A8061",
        options: {
          pagination: {
            limit: 1,
            offset: 0,
          },
        },
      });

      expect(response).is.not.null;
      expect(response.ipAssets.length).to.equal(1);
    });
  });
});

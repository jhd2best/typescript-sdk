import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryReadOnlyConfig, Environment } from "../../src";
import * as dotenv from "dotenv";
import { ReadOnlyClient } from "../../src/types/client";
import { ListIPOrgRequest } from "../../src/types/resources/IPOrg";

dotenv.config();
chai.use(chaiAsPromised);

describe("IPOrg Read Only Functions", () => {
  let client: ReadOnlyClient;

  before(function () {
    const config: StoryReadOnlyConfig = {
      environment: Environment.TEST,
    };

    client = StoryClient.newReadOnlyClient(config);
  });

  describe("Get IPOrg", async function () {
    it("should return ipOrg when the ipOrg id is valid", async () => {
      const response = await client.ipOrg.get({
        ipOrgId: "0xde493e03d2de0cd7820b4f580beced57296b0009",
      });

      // Only assert the immutable fields
      expect(response.ipOrg.id).to.equal("0xde493e03d2de0cd7820b4f580beced57296b0009");
    });
  });

  describe("List IPOrgs", async function () {
    it("should return a list of ipOrgs successfully upon query", async () => {
      const options = {
        options: {
          pagination: {
            limit: 10,
            offset: 0,
          },
        },
      } as ListIPOrgRequest;
      const response = await client.ipOrg.list(options);
      expect(response).is.not.null;
    });

    it("should return a list of ipOrgs with pagination", async () => {
      const options = {
        options: {
          pagination: {
            limit: 1,
            offset: 0,
          },
        },
      } as ListIPOrgRequest;
      const response = await client.ipOrg.list(options);

      expect(response).is.not.null;
      expect(response.ipOrgs.length).to.equal(1);
    });
  });
});

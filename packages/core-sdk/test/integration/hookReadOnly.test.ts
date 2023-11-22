import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryReadOnlyConfig, Environment, GetHookRequest, ListHookRequest } from "../../src";
import * as dotenv from "dotenv";
import { ReadOnlyClient } from "../../src/types/client";

dotenv.config();
chai.use(chaiAsPromised);

describe("Hook client integration tests", () => {
  let client: ReadOnlyClient;

  beforeEach(function () {
    const config: StoryReadOnlyConfig = {
      environment: Environment.TEST,
    };

    client = StoryClient.newReadOnlyClient(config);
  });

  describe("List Hooks", async function () {
    it("should return array of all hooks", async () => {
      const req = {
        options: {
          limit: 10,
          offset: 0,
        },
      } as ListHookRequest;

      const response = await client.hook.list(req);
      console.log(response);

      expect(response).to.have.property("hooks");
      expect(response.hooks).to.be.an("array");

      const hook1 = response.hooks[0];
      expect(hook1).to.have.property("id");
      expect(hook1).to.have.property("ipOrgId");
      expect(hook1).to.have.property("hookKey");
      expect(hook1.id).to.be.a("string");
      // expect(hook1.ipOrgId).to.be.a("string");
      // expect(hook1.hookKey).to.be.a("string");
    });

    it("should return array of limited amount of hooks", async () => {
      const req = {
        options: {
          limit: 1,
          offset: 0,
        },
      } as ListHookRequest;

      const response = await client.hook.list(req);

      expect(response).to.have.property("hooks");
      expect(response.hooks).to.be.an("array");
      expect(response.hooks.length).to.equal(1);
    });
  });

  describe("Get Hook", async function () {
    it("should return array of all hooks", async () => {
      const req = {
        hookId: "0x0000000000000000000000000000000000000000:LICENSING_MODULE",
      } as GetHookRequest;

      const response = await client.hook.get(req);
      console.log(response);

      // expect(response).to.have.property("hooks");
      // expect(response.hooks).to.be.an("array");
      //
      // const hook1 = response.hooks[0];
      // expect(hook1).to.have.property("id");
      // expect(hook1).to.have.property("ipOrgId");
      // expect(hook1).to.have.property("hookKey");
      // expect(hook1.id).to.be.a("string");
      // expect(hook1.ipOrgId).to.be.a("string");
      // expect(hook1.hookKey).to.be.a("string");
    });
  });
});
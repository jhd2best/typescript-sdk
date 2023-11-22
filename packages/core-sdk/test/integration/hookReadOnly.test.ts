import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  StoryClient,
  StoryReadOnlyConfig,
  Environment,
  GetHookRequest,
  ListHookRequest,
} from "../../src";
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
          pagination: {
            limit: 10,
            offset: 0,
          },
        },
      } as ListHookRequest;

      const response = await client.hook.list(req);

      expect(response).to.have.property("hooks");
      expect(response.hooks).to.be.an("array");

      const hook1 = response.hooks[0];
      expect(hook1).to.have.property("id");
      expect(hook1).to.have.property("moduleId");
      expect(hook1).to.have.property("registryKey");
      expect(hook1).to.have.property("txHash");
      expect(hook1.id).to.be.a("string");
      expect(hook1.moduleId).to.be.a("string");
      expect(hook1.registryKey).to.be.a("string");
      expect(hook1.txHash).to.be.a("string");
    });

    it("should return array of limited amount of hooks", async () => {
      const req = {
        options: {
          pagination: {
            limit: 1,
            offset: 0,
          },
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
        hookId: "0xc0f6e387ac0b324ec18eacf22ee7271207dce3d5",
      } as GetHookRequest;

      const response = await client.hook.get(req);

      expect(response).to.have.property("hook");

      const hook = response.hook;
      expect(hook).to.have.property("id");
      expect(hook).to.have.property("moduleId");
      expect(hook).to.have.property("registryKey");
      expect(hook).to.have.property("txHash");
      expect(hook.id).to.be.a("string");
      expect(hook.moduleId).to.be.a("string");
      expect(hook.registryKey).to.be.a("string");
      expect(hook.txHash).to.be.a("string");
    });
  });
});

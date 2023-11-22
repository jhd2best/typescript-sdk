import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { StoryClient, StoryReadOnlyConfig, Environment,GetModuleRequest, ListModuleRequest } from "../../src";
import * as dotenv from "dotenv";
import { ReadOnlyClient } from "../../src/types/client";

dotenv.config();
chai.use(chaiAsPromised);

describe("Module client integration tests", () => {
  let client: ReadOnlyClient;

  beforeEach(function () {
    const config: StoryReadOnlyConfig = {
      environment: Environment.TEST,
    };

    client = StoryClient.newReadOnlyClient(config);
  });

  describe("List Modules", async function () {
    it("should return array of all modules", async () => {
      const req = {
        // ipOrgId: "0xb422E54932c1dae83E78267A4DD2805aa64A8061",
        options: {
          limit: 10,
          offset: 0,
        },
      } as ListModuleRequest;

      const response = await client.module.list(req);
      console.log(response);

      expect(response).to.have.property("modules");
      expect(response.modules).to.be.an("array");

      const module1 = response.modules[0];
      expect(module1).to.have.property("id");
      expect(module1).to.have.property("ipOrgId");
      expect(module1).to.have.property("moduleKey");
      expect(module1.id).to.be.a("string");
      expect(module1.ipOrgId).to.be.a("string");
      expect(module1.moduleKey).to.be.a("string");
    });

    it("should return array of limited amount of modules", async () => {
      const req = {
        options: {
          limit: 1,
          offset: 0,
        },
      } as ListModuleRequest;

      const response = await client.module.list(req);

      expect(response).to.have.property("modules");
      expect(response.modules).to.be.an("array");
      expect(response.modules.length).to.equal(1);
    });
  });

  describe("Get Module", async function () {
    it("should return array of all modules", async () => {
      const req = {
        moduleId: "0x091e5f55135155bb8cb5868adb39e5c34eb32cfd",
      } as GetModuleRequest;

      const response = await client.module.get(req);
      console.log(response);

      // expect(response).to.have.property("modules");
      // expect(response.modules).to.be.an("array");
      //
      // const module1 = response.modules[0];
      // expect(module1).to.have.property("id");
      // expect(module1).to.have.property("ipOrgId");
      // expect(module1).to.have.property("moduleKey");
      // expect(module1.id).to.be.a("string");
      // expect(module1.ipOrgId).to.be.a("string");
      // expect(module1.moduleKey).to.be.a("string");
    });
  });
});
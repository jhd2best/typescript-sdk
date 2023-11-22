import { expect } from "chai";
import { ModuleReadOnlyClient } from "../../../src/resources/moduleReadOnly";
import { AxiosInstance } from "axios";
import { createMock } from "../testUtils";
import * as sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { PublicClient } from "viem";

chai.use(chaiAsPromised);

describe("Test ModuleReadOnlyClient", function () {
  let moduleClient: ModuleReadOnlyClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    moduleClient = new ModuleReadOnlyClient(axiosMock, rpcMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test moduleClient.get", function () {
    it("should return module when the module id is valid", async function () {
      axiosMock.get = sinon.stub().returns({
        data: {
          module: {
            id: "2",
            ipOrgId: "7",
            interface: "(uint,uint)",
            preHooks: [
              {
                id: "1",
                moduleId: "0x1234514e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
                interface: "(uint,uint)",
                registeredAt: "0001-01-01T00:00:00Z",
                txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
              },
            ],
            postHooks: [
              {
                id: "1",
                moduleId: "0x1234514e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
                interface: "(uint,uint)",
                registeredAt: "0001-01-01T00:00:00Z",
                txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
              },
            ],
          },
        },
      });

      const response = await moduleClient.get({
        moduleId: "0x1234514e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      });

      expect(response.module.ipOrgId).to.equal("7");
      expect(response.module.preHooks![0].moduleId).to.equal(
        "0x1234514e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );
    });

    it("should throw error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("http 500"));
      await expect(
        moduleClient.get({
          moduleId: "0x1234514e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
        }),
      ).to.be.rejectedWith("http 500");
    });

    it("should throw error if asset id is invalid", async function () {
      try {
        await moduleClient.get({
          moduleId: "fake module id",
        });
        expect.fail(`Function should not get here, it should throw an error `);
      } catch (error) {
        // function is expected to throw.
      }
    });
  });

  describe("Test moduleClient.list", async function () {
    it("should return modules on a successful query", async function () {
      axiosMock.post = sinon.stub().returns({
        data: {
          modules: [
            {
              id: "1",
              ipOrgId: "7",
              interface: "(address,uint)",
              preHooks: [
                {
                  id: "1",
                  moduleId: "0x1234514e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
                  interface: "(uint,uint)",
                  registeredAt: "0001-01-01T00:00:00Z",
                  txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
                },
              ],
              postHooks: [
                {
                  id: "1",
                  moduleId: "0x1234514e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
                  interface: "(uint,uint)",
                  registeredAt: "0001-01-01T00:00:00Z",
                  txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
                },
              ],
            },
          ],
        },
      });

      const response = await moduleClient.list({
        ipOrgId: "7",
      });

      expect(response.modules[0].ipOrgId).to.equal("7");
      expect(response.modules[0].preHooks![0].moduleId).to.equal(
        "0x1234514e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );
    });

    it("should throw error", async function () {
      axiosMock.post = sinon.stub().rejects(new Error("HTTP 500"));
      await expect(
        moduleClient.list({
          ipOrgId: "abc",
        }),
      ).to.be.rejectedWith("HTTP 500");
    });
  });
});

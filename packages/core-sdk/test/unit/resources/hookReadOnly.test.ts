import { expect } from "chai";
import { HookReadOnlyClient } from "../../../src/resources/hookReadOnly";
import { AxiosInstance } from "axios";
import { createMock } from "../testUtils";
import * as sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { PublicClient } from "viem";
import { HookType } from "../../../src/enums/HookType";

chai.use(chaiAsPromised);

describe("Test HookReadOnlyClient", function () {
  let hookClient: HookReadOnlyClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    hookClient = new HookReadOnlyClient(axiosMock, rpcMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test hookClient.get", function () {
    it("should return hook when the hook id is valid", async function () {
      axiosMock.get = sinon.stub().returns({
        data: {
          hook: {
            id: "0xc0f6e387ac0b324ec18eacf22ee7271207dce3d5",
            moduleId: "0x091e5f55135155bb8cb5868adb39e5c34eb32cfd",
            registryKey: "0xac909466a23bec9adaf8b5f1cdfec2fb87df8a07765d813250eee97ecd862dcf",
            registeredAt: "1700289864",
            txHash: "0xfe06c299ab53f44a98e925d4d50904783284de80d105afc3ab73b2908322fe93",
            hookType: HookType.POST_ACTION,
          },
        },
      });

      const response = await hookClient.get({
        hookId: "0xc0f6e387ac0b324ec18eacf22ee7271207dce3d5",
      });

      expect(response.hook.id).to.equal("0xc0f6e387ac0b324ec18eacf22ee7271207dce3d5");
      expect(response.hook.moduleId).to.equal("0x091e5f55135155bb8cb5868adb39e5c34eb32cfd");
    });

    it("should throw error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("http 500"));
      await expect(
        hookClient.get({
          hookId: "0x1234514e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
        }),
      ).to.be.rejectedWith("http 500");
    });

    it("should throw error if asset id is invalid", async function () {
      try {
        await hookClient.get({
          hookId: "fake hook id",
        });
        expect.fail(`Function should not get here, it should throw an error `);
      } catch (error) {
        // function is expected to throw.
      }
    });
  });

  describe("Test hookClient.list", async function () {
    it("should return hooks on a successful query", async function () {
      axiosMock.post = sinon.stub().returns({
        data: {
          hooks: [
            {
              id: "0xc0f6e387ac0b324ec18eacf22ee7271207dce3d5",
              moduleId: "0x091e5f55135155bb8cb5868adb39e5c34eb32cfd",
              registryKey: "0xac909466a23bec9adaf8b5f1cdfec2fb87df8a07765d813250eee97ecd862dcf",
              registeredAt: "1700289864",
              txHash: "0xfe06c299ab53f44a98e925d4d50904783284de80d105afc3ab73b2908322fe93",
              hookType: HookType.POST_ACTION,
            },
          ],
        },
      });

      const response = await hookClient.list({
        moduleId: "0x091e5f55135155bb8cb5868adb39e5c34eb32cfd",
      });

      expect(response.hooks[0].id).to.equal("0xc0f6e387ac0b324ec18eacf22ee7271207dce3d5");
      expect(response.hooks[0].moduleId).to.equal("0x091e5f55135155bb8cb5868adb39e5c34eb32cfd");
    });

    it("should throw error", async function () {
      axiosMock.post = sinon.stub().rejects(new Error("HTTP 500"));
      await expect(
        hookClient.list({
          moduleId: "fake module id",
        }),
      ).to.be.rejectedWith("HTTP 500");
    });
  });
});

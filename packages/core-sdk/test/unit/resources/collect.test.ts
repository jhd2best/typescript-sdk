import { AxiosInstance } from "axios";
import * as sinon from "sinon";
import { CollectClient } from "../../../src/resources/collect";
import { createMock } from "../testUtils";
import chai from "chai";
import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { PublicClient, WalletClient } from "viem";

chai.use(chaiAsPromised);

describe("Test CollectClient", function () {
  let collectClient: CollectClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;
  let walletMock: WalletClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    walletMock = createMock<WalletClient>();
    collectClient = new CollectClient(axiosMock, rpcMock, walletMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test collect.collect", function () {
    it("should return txHash when the collect transaction is successful", async function () {
      // Stub the CollectModule collect transaction call
      rpcMock.simulateContract = sinon.stub().resolves({request: null})
      walletMock.writeContract = sinon.stub().resolves("0x129f7dd802200f096221dd89d5b086e4bd3ad6eafb378a0c75e3b04fc375f997");

      const response = await collectClient.collect({
        franchiseId: "6",
        ipAssetId: "1",
        collector: "0x1234567890123456789012345678901234567890",
      });

      expect(response.txHash).to.equal(
        "0x129f7dd802200f096221dd89d5b086e4bd3ad6eafb378a0c75e3b04fc375f997",
      );
    });

    it("should throw error", async function () {
      rpcMock.simulateContract = sinon.stub().rejects(new Error("revert"));

      await expect(
        collectClient.collect({
          franchiseId: "0",
          ipAssetId: "0",
          collector: "0x0000000000000000000000000000000000000000",
        }),
      ).to.be.rejectedWith("revert");
    });
  });
});

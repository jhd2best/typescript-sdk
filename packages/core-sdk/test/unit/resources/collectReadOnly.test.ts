import { AxiosInstance } from "axios";
import * as sinon from "sinon";
import { createMock } from "../testUtils";
import chai from "chai";
import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { CollectReadOnlyClient } from "../../../src/resources/collectReadOnly";
import { PublicClient } from "viem";

chai.use(chaiAsPromised);

describe("Test CollectReadOnlyClient", function () {
  let collectClient: CollectReadOnlyClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    collectClient = new CollectReadOnlyClient(axiosMock, rpcMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test collect.list", function () {
    it("should return list of collections", async function () {
      axiosMock.get = sinon.stub().resolves({
        data: {
          data: [
            {
              franchiseId: "1",
              ipAssetId: "1",
              totalCollected: 100,
            },
            {
              franchiseId: "100",
              ipAssetId: "5000",
              totalCollected: 1,
            },
          ],
        },
      });

      const response = await collectClient.list({
        franchiseId: "78",
      });

      expect(response.data).to.be.an("array");
      expect(response.data).to.have.lengthOf(2);
      expect(response.data[0].franchiseId).to.equal("1");
      expect(response.data[0].ipAssetId).to.equal("1");
      expect(response.data[0].totalCollected).to.equal(100);
      expect(response.data[1].franchiseId).to.equal("100");
      expect(response.data[1].ipAssetId).to.equal("5000");
      expect(response.data[1].totalCollected).to.equal(1);
    });

    it("should throw an error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("HTTP 500"));
      await expect(
        collectClient.list({
          franchiseId: "78",
        }),
      ).to.be.rejectedWith("HTTP 500");
    });
  });
});

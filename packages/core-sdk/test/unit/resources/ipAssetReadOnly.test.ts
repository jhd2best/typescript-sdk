import { expect } from "chai";
import { IPAssetReadOnlyClient } from "../../../src/resources/ipAssetReadOnly";
import { AxiosInstance } from "axios";
import { createMock } from "../testUtils";
import * as sinon from "sinon";
import { IPAssetType } from "../../../src";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {PublicClient} from "viem";

chai.use(chaiAsPromised);

describe("Test IpAssetReadOnlyClient", function () {
  let ipAssetClient: IPAssetReadOnlyClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    ipAssetClient = new IPAssetReadOnlyClient(axiosMock, rpcMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test ipAssetClient.get", function () {
    it("should return asset when the franchise id is valid", async function () {
      axiosMock.get = sinon.stub().returns({
        data: {
          data: {
            franchiseId: "6",
            ipAssetId: "6",
            ipAssetName: "test",
            ipAssetType: IPAssetType.CHARACTER,
          },
        },
      });

      const response = await ipAssetClient.get({
        ipAssetId: "6",
        franchiseId: "78",
      });

      expect(response.data.franchiseId).to.equal("6");
      expect(response.data.ipAssetName).to.equal("test");
      expect(response.data.ipAssetType).to.equal(IPAssetType.CHARACTER);
    });

    it("should throw error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("http 500"));
      await expect(
        ipAssetClient.get({
          ipAssetId: "6",
          franchiseId: "78",
        }),
      ).to.be.rejectedWith("http 500");
    });

    it("should throw error if asset id is invalid", async function () {
      try {
        await ipAssetClient.get({ipAssetId: "Bogus ID", franchiseId: "78"});
        expect.fail(`Function should not get here, it should throw an error `);
      } catch (error) {
        // function is expected to throw.
      }
    });
  });

  describe("Test ipAssetRegistry.list", async function () {
    it("should return franchises on a successful query", async function () {
      axiosMock.get = sinon.stub().returns({
        data: {
          data: [
            {
              franchiseId: "6",
              ipAssetType: IPAssetType.CHARACTER,
              ipAssetName: "Darth Vader",
              description: "fake desc",
              mediaUrl: "/",
            },
            {
              franchiseId: "6",
              ipAssetType: IPAssetType.CHARACTER,
              ipAssetName: "Luke Skywalker",
              description: "fake desc",
              mediaUrl: "/",
            },
          ],
        },
      });

      const response = await ipAssetClient.list({
        franchiseId: "78",
      });

      expect(response.data[0].franchiseId).to.equal("6");
      expect(response.data[1].ipAssetName).to.equal("Luke Skywalker");
    });

    it("should throw error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("HTTP 500"));
      await expect(
        ipAssetClient.list({
          franchiseId: "78",
        }),
      ).to.be.rejectedWith("HTTP 500");
    });
  });
});

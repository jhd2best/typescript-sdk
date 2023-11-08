import chai, { expect } from "chai";
import { FranchiseReadOnlyClient } from "../../../src/resources/franchiseReadOnly";
import { AxiosInstance } from "axios";
import { createMock } from "../testUtils";
import * as sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import {PublicClient} from "viem";

chai.use(chaiAsPromised);

describe(`Test FranchiseReadOnlyClient`, function () {
  let franchise: FranchiseReadOnlyClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    franchise = new FranchiseReadOnlyClient(axiosMock, rpcMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test franchise.get", function () {
    it("should return franchise when the franchise id is valid", async function () {
      axiosMock.get = sinon.stub().returns({
        data: {
          data: {
            franchiseId: "6",
            franchiseName: "AAA",
            franchiseSymbol: "A",
            tokenUri: "asfddsf",
          },
        },
      });

      const response = await franchise.get({
        franchiseId: "6",
      });

      expect(response.data.franchiseId).to.equal("6");
      expect(response.data.franchiseName).to.equal("AAA");
    });

    it("should throw error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("http 500"));
      await expect(
        franchise.get({
          franchiseId: "6",
        }),
      ).to.be.rejectedWith("http 500");
    });

    it("should throw error when the franchise id is invalid", async function () {
      await expect(
        franchise.get({
          franchiseId: "abc",
        }),
      ).to.be.rejectedWith(`Invalid franchise id. Must be an integer. But got: abc`);
    });
  });
});

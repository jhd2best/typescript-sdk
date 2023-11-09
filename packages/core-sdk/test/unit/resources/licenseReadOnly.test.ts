import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { LicenseReadOnlyClient } from "../../../src/resources/licenseReadOnly";
import { AxiosInstance } from "axios";
import { createMock } from "../testUtils";
import * as sinon from "sinon";
import {PublicClient} from "viem";

chai.use(chaiAsPromised);

describe("Test LicenseReadOnlyClient", function () {
  let licenseClient: LicenseReadOnlyClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    licenseClient = new LicenseReadOnlyClient(axiosMock, rpcMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test license.get", function () {
    it("should return a license when the license ID is valid", async function () {
      axiosMock.get = sinon.stub().returns({
        data: {
          data: {
            licenseId: "49",
            ipAssetId: "5",
            franchiseId: "7",
            ownerAddress: "0xd84316a1b6f40902c17b8177854cdaeb3c957daf",
            uri: "https://arweave.net/R7-xPDAMqOhUSw3CM_UwXI7zdpQkzCCCUq3smzxyAaU",
            txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
          },
        },
      });

      const response = await licenseClient.get({
        licenseId: "49",
      });

      expect(response.data.licenseId).to.equal("49");
      expect(response.data.ipAssetId).to.equal("5");
      expect(response.data.franchiseId).to.equal("7");
      expect(response.data.ownerAddress).to.equal("0xd84316a1b6f40902c17b8177854cdaeb3c957daf");
      expect(response.data.uri).to.equal(
        "https://arweave.net/R7-xPDAMqOhUSw3CM_UwXI7zdpQkzCCCUq3smzxyAaU",
      );
      expect(response.data.txHash).to.equal(
        "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );
    });

    it("should throw an error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("HTTP 500"));

      await expect(
        licenseClient.get({
          licenseId: "123",
        }),
      ).to.be.rejectedWith("HTTP 500");
    });

    it("should throw an error when the license ID is invalid", async function () {
      await expect(
        licenseClient.get({
          licenseId: "abc",
        }),
      ).to.be.rejectedWith(`Invalid licenseId. Must be an integer. But got: abc`);
    });
  });

  describe("Test license.list", function () {
    const mockListLicenseRequest = { franchiseId: "7", ipAssetId: "5" };

    it("should return a list of licenses", async function () {
      axiosMock.get = sinon.stub().returns({
        data: {
          data: [
            {
              licenseId: "49",
              ipAssetId: "5",
              franchiseId: "7",
              ownerAddress: "0xd84316a1b6f40902c17b8177854cdaeb3c957daf",
              uri: "https://arweave.net/R7-xPDAMqOhUSw3CM_UwXI7zdpQkzCCCUq3smzxyAaU",
              txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
            },
            {
              licenseId: "50",
              ipAssetId: "5",
              franchiseId: "7",
              ownerAddress: "0xd84316a1b6f40902c17b8177854cdaeb3c957daf",
              uri: "https://arweave.net/R7-xPDAMqOhUSw3CM_UwXI7zdpQkzCCCUq3smzxyAaU",
              txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
            },
          ],
        },
      });

      const response = await licenseClient.list(mockListLicenseRequest);

      expect(response.data).to.be.an("array");
      expect(response.data).to.have.lengthOf(2);

      expect(response.data[0].licenseId).to.equal("49");
      expect(response.data[0].ipAssetId).to.equal("5");
      expect(response.data[0].franchiseId).to.equal("7");
      expect(response.data[0].ownerAddress).to.equal("0xd84316a1b6f40902c17b8177854cdaeb3c957daf");
      expect(response.data[0].uri).to.equal(
        "https://arweave.net/R7-xPDAMqOhUSw3CM_UwXI7zdpQkzCCCUq3smzxyAaU",
      );
      expect(response.data[0].txHash).to.equal(
        "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );

      expect(response.data[1].licenseId).to.equal("50");
      expect(response.data[1].ipAssetId).to.equal("5");
      expect(response.data[1].franchiseId).to.equal("7");
      expect(response.data[1].ownerAddress).to.equal("0xd84316a1b6f40902c17b8177854cdaeb3c957daf");
      expect(response.data[1].uri).to.equal(
        "https://arweave.net/R7-xPDAMqOhUSw3CM_UwXI7zdpQkzCCCUq3smzxyAaU",
      );
      expect(response.data[1].txHash).to.equal(
        "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );
    });

    it("should throw an error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("HTTP 500"));

      await expect(licenseClient.list(mockListLicenseRequest)).to.be.rejectedWith("HTTP 500");
    });
  });
});

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { LicenseClient } from "../../../src/resources/license";
import { AxiosInstance } from "axios";
import { createMock } from "../testUtils";
import * as sinon from "sinon";

chai.use(chaiAsPromised);

describe("Test LicenseClient", function () {
  let licenseClient: LicenseClient;
  let axiosMock: AxiosInstance;
  let franchiseRegistryMock: FranchiseRegistry;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    franchiseRegistryMock = createMock<FranchiseRegistry>();
    licenseClient = new LicenseClient(axiosMock, Wallet.createRandom(), franchiseRegistryMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test license.create", async function () {
    it("should not throw an error when creating a license", async function () {
      try {
        franchiseRegistryMock.ipAssetRegistryForId = sinon
          .stub()
          .returns("0xIpAssetRegistryAddress");

        const getLicenseIdByTokenIdStub = sinon.stub();
        getLicenseIdByTokenIdStub.returns("999");

        const createLicenseStub = sinon.stub();
        createLicenseStub.returns({
          hash: "0xHashValue",
        });

        IpAssetRegistry__factory.connect = sinon.stub().returns({
          getLicenseIdByTokenId: getLicenseIdByTokenIdStub,
          createLicense: createLicenseStub,
        } as any);

        const franchiseId = 123n;
        const ipAssetId = 456n;
        const licenseURI = "https://example.com/license";

        const response = await licenseClient.create({
          franchiseId,
          ipAssetId,
          licenseURI,
          options: {
            ownerAddress: "0xOwnerAddress",
            revoker: "0xRevokerAddress",
            isCommercial: true,
            isSublicensable: true,
            terms: {
              processor: "ProcessorName",
              data: "0xabcdef",
            },
          },
        });

        expect(response.txHash).to.equal("0xHashValue");
      } catch (error) {
        expect.fail(`Function should not have thrown any error, but it threw: ${error}`);
      }
    });

    it("should throw an error", async function () {
      franchiseRegistryMock.ipAssetRegistryForId = sinon.stub().returns("0xIpAssetRegistryAddress");
      const getLicenseIdByTokenIdStub = sinon.stub();
      getLicenseIdByTokenIdStub.returns("999");

      const createLicenseStub = sinon.stub().rejects(new Error("revert"));

      IpAssetRegistry__factory.connect = sinon.stub().returns({
        getLicenseIdByTokenId: getLicenseIdByTokenIdStub,
        createLicense: createLicenseStub,
      } as any);

      const franchiseId = 123n;
      const ipAssetId = 456n;
      const licenseURI = "https://example.com/license";

      await expect(
        licenseClient.create({
          franchiseId,
          ipAssetId,
          licenseURI,
        }),
      ).to.be.rejectedWith("revert");
    });
  });
});

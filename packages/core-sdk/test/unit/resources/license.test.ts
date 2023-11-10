import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { LicenseClient } from "../../../src/resources/license";
import { AxiosInstance } from "axios";
import { createMock } from "../testUtils";
import * as sinon from "sinon";
import {PublicClient, WalletClient} from "viem";
import {AddressZero} from "../../../src/constants/addresses";

chai.use(chaiAsPromised);

describe("Test LicenseClient", function () {
  let licenseClient: LicenseClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;
  let walletMock: WalletClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    walletMock = createMock<WalletClient>({
      account : {
        address: AddressZero
      }
    });
    licenseClient = new LicenseClient(axiosMock, rpcMock, walletMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test license.create", async function () {
    it("should not throw an error when creating a license", async function () {
      try {
        rpcMock.readContract = sinon.stub()
            .onFirstCall().resolves(AddressZero)
            .onSecondCall().resolves("111")
        rpcMock.simulateContract = sinon.stub().resolves({request: null})
        walletMock.writeContract = sinon.stub().resolves("0xHashValue");


        const franchiseId = "123";
        const ipAssetId = "456";
        const licenseURI = "https://example.com/license";

        const response = await licenseClient.create({
          franchiseId,
          ipAssetId,
          licenseURI,
          options: {
            ownerAddress: "0x8e3B91c90561523312f32B49DAAc4AD15293De7F",
            revoker: "0x8e3B91c90561523312f32B49DAAc4AD15293De7F",
            isCommercial: true,
            isSublicensable: true,
            terms: {
              processor: AddressZero,
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
      rpcMock.readContract = sinon.stub()
          .onFirstCall().resolves(AddressZero)
          .onSecondCall().resolves("111")
      rpcMock.simulateContract = sinon.stub().resolves({request: null})
      walletMock.writeContract = sinon.stub().rejects(new Error("revert"));

      const franchiseId = "123";
      const ipAssetId = "456";
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

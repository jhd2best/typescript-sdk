import { expect } from "chai";
import { IPAssetClient } from "../../../src/resources/ipAsset";
import { AxiosInstance } from "axios";
import { createMock } from "../testUtils";
import * as sinon from "sinon";
import { IPAssetType } from "../../../src";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { PublicClient, WalletClient } from "viem";
import { AddressZero } from "../../../src/constants/addresses";

chai.use(chaiAsPromised);

describe("Test IpAssetClient", function () {
  let ipAssetClient: IPAssetClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;
  let walletMock: WalletClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    walletMock = createMock<WalletClient>();
    ipAssetClient = new IPAssetClient(axiosMock, rpcMock, walletMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test ipAssetClient.create", async function () {
    it("should not throw error when creating a IP asset", async function () {
      try {
        rpcMock.readContract = sinon.stub().resolves(AddressZero);
        rpcMock.simulateContract = sinon.stub().resolves({ request: null });
        walletMock.writeContract = sinon
          .stub()
          .resolves("0x129f7dd802200f096221dd89d5b086e4bd3ad6eafb378a0c75e3b04fc375f997");

        await ipAssetClient.create({
          name: "The Empire Strikes Back",
          type: IPAssetType.STORY,
          ipOrgId: "0xB32BdE3fBfddAd30a8d824178F00F0adB43DF2e7",
          owner: "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
          txOptions: {
            waitForTransaction: false,
          },
        });
      } catch (error) {
        expect.fail(`Function should not have thrown any error, but it threw: ${error}`);
      }
    });

    it("should not throw error when creating a IP asset and wait for transaction confirmed", async function () {
      try {
        rpcMock.readContract = sinon.stub().resolves(AddressZero);
        rpcMock.simulateContract = sinon.stub().resolves({ request: null });
        walletMock.writeContract = sinon
          .stub()
          .resolves("0x3600464c4f0794de350e55a484d67cdb6ed4a89917274709b9bb48246935c891");
        rpcMock.waitForTransactionReceipt = sinon.stub().resolves({
          logs: [
            {
              address: "0x091e5f55135155bb8cb5868adb39e5c34eb32cfd",
              topics: [
                "0x548812bd5c46f4bb6cb7d8d63fe632431f0a38664680b91ed506dd71cce9cb1e",
                "0x000000000000000000000000b422e54932c1dae83e78267a4dd2805aa64a8061",
                "0x00000000000000000000000077cbcc0e29e10f1eea24e0d109aab26c5b2abd88",
                "0x0000000000000000000000000000000000000000000000000000000000000000",
              ],
              data: "0x0000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000454657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              blockNumber: 4738934n,
              transactionHash: "0x3600464c4f0794de350e55a484d67cdb6ed4a89917274709b9bb48246935c891",
              transactionIndex: 106,
              blockHash: "0x8d431865dbcfa54988f48b18c0a07fea503ca38c387b6326f513aa6f238faddc",
              logIndex: 52,
              removed: false,
            },
          ],
        });

        const response = await ipAssetClient.create({
          name: "The Empire Strikes Back",
          type: IPAssetType.STORY,
          ipOrgId: "0xB32BdE3fBfddAd30a8d824178F00F0adB43DF2e7",
          owner: "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
          txOptions: {
            waitForTransaction: true,
          },
        });

        expect(response.txHash).to.be.a("string");
        expect(response.txHash).not.empty;
        expect(response.ipAssetId).to.be.a("string");
        expect(response.ipAssetId).not.empty;
      } catch (error) {
        expect.fail(`Function should not have thrown any error, but it threw: ${error}`);
      }
    });

    it("should throw error when request fails", async function () {
      rpcMock.simulateContract = sinon.stub().resolves({ request: null });
      walletMock.writeContract = sinon.stub().rejects(new Error("http 500"));
      await expect(
        ipAssetClient.create({
          name: "The Empire Strikes Back",
          type: IPAssetType.STORY,
          ipOrgId: "0xB32BdE3fBfddAd30a8d824178F00F0adB43DF2e7",
          owner: "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
          txOptions: {
            waitForTransaction: false,
          },
        }),
      ).to.be.rejectedWith("http 500");
    });

    it("should throw error when invalid IP asset ID is provided", async function () {
      try {
        rpcMock.readContract = sinon.stub().resolves(AddressZero);
        rpcMock.simulateContract = sinon.stub().rejects();

        expect(
          await ipAssetClient.create({
            name: "The Empire Strikes Back",
            type: IPAssetType.STORY,
            ipOrgId: "fake org id",
            owner: "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
            txOptions: {
              waitForTransaction: false,
            },
          }),
        ).to.be.rejected;
      } catch (error) {
        // successfully thrown
      }
    });
  });
});

import { AxiosInstance } from "axios";
import * as sinon from "sinon";
import { createMock } from "../testUtils";
import chai from "chai";
import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { TransactionClient } from "../../../src/resources/transaction";
import {PublicClient, WalletClient} from "viem";

chai.use(chaiAsPromised);

describe("Test TransactionClient", function () {
  let transactionClient: TransactionClient;
  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;
  let walletMock: WalletClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    walletMock = createMock<WalletClient>();
    transactionClient = new TransactionClient(axiosMock,rpcMock,walletMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test transaction.get", function () {
    it("should get transaction ", async function () {
      axiosMock.get = sinon.stub().resolves({
        data: {
          data: {
            txId: "1",
            txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
            createdAt: "0001-01-01T00:00:00Z",
            creatorAddress: "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
            type: "IP_ASSET",
            resourceId: "1",
            franchiseId: "7",
          },
        },
      });

      const response = await transactionClient.get({ txId: "1" });

      expect(response.data.txId).to.be.equal("1");
      expect(response.data.txHash).to.be.equal(
        "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );
      expect(response.data.createdAt).to.be.equal("0001-01-01T00:00:00Z");
      expect(response.data.creatorAddress).to.be.equal(
        "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
      );
      expect(response.data.type).to.be.equal("IP_ASSET");
      expect(response.data.resourceId).to.be.equal("1");
      expect(response.data.franchiseId).to.be.equal("7");
    });

    it("should be able to throw an error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("HTTP 500"));
      await expect(transactionClient.get({ txId: "1" })).to.be.rejectedWith("HTTP 500");
    });
  });

  describe("Test transaction.list", function () {
    it("should return list of collections", async function () {
      axiosMock.get = sinon.stub().resolves({
        data: {
          data: [
            {
              txId: "1",
              txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
              createdAt: "0001-01-01T00:00:00Z",
              creatorAddress: "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
              type: "IP_ASSET",
              resourceId: "1",
              franchiseId: "7",
            },
            {
              txId: "2",
              txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb7",
              createdAt: "0001-01-01T00:00:00Z",
              creatorAddress: "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
              type: "FRANCHISE",
              resourceId: "2",
              franchiseId: "7",
            },
          ],
        },
      });

      const response = await transactionClient.list();
      const transactions = response.data;

      // First transaction in array
      expect(transactions[0].txId).to.be.equal("1");
      expect(transactions[0].txHash).to.be.equal(
        "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );
      expect(transactions[0].createdAt).to.be.equal("0001-01-01T00:00:00Z");
      expect(transactions[0].creatorAddress).to.be.equal(
        "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
      );
      expect(transactions[0].type).to.be.equal("IP_ASSET");
      expect(transactions[0].resourceId).to.be.equal("1");
      expect(transactions[0].franchiseId).to.be.equal("7");

      // Second transaction in array
      expect(transactions[1].txId).to.be.equal("2");
      expect(transactions[1].txHash).to.be.equal(
        "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb7",
      );
      expect(transactions[1].createdAt).to.be.equal("0001-01-01T00:00:00Z");
      expect(transactions[1].creatorAddress).to.be.equal(
        "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
      );
      expect(transactions[1].type).to.be.equal("FRANCHISE");
      expect(transactions[1].resourceId).to.be.equal("2");
      expect(transactions[1].franchiseId).to.be.equal("7");
    });

    it("should be able to throw an error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("HTTP 500"));
      await expect(transactionClient.list()).to.be.rejectedWith("HTTP 500");
    });
  });
});

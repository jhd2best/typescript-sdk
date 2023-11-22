import { AxiosInstance } from "axios";
import * as sinon from "sinon";
import { createMock } from "../testUtils";
import chai from "chai";
import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { TransactionClient } from "../../../src/resources/transaction";
import { PublicClient, WalletClient } from "viem";
import { ActionType } from "../../../src/enums/ActionType";
import { ResourceType } from "../../../src";

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
    transactionClient = new TransactionClient(axiosMock, rpcMock, walletMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("Test transactionClient.get", function () {
    it("should get transaction ", async function () {
      axiosMock.get = sinon.stub().resolves({
        data: {
          transaction: {
            id: "1",
            txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
            ipOrgId: "7",
            resourceId: "1",
            resourceType: ResourceType.IP_ASSET,
            actionType: ActionType.CREATE,
            initiator: "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
            createdAt: "0001-01-01T00:00:00Z",
          },
        },
      });

      const response = await transactionClient.get({ transactionId: "1" });

      expect(response.transaction.id).to.be.equal("1");
      expect(response.transaction.txHash).to.be.equal(
        "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );
      expect(response.transaction.createdAt).to.be.equal("0001-01-01T00:00:00Z");
      expect(response.transaction.initiator).to.be.equal(
        "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
      );
      expect(response.transaction.resourceType).to.be.equal(ResourceType.IP_ASSET);
      expect(response.transaction.resourceId).to.be.equal("1");
      expect(response.transaction.ipOrgId).to.be.equal("7");
    });

    it("should be able to throw an error", async function () {
      axiosMock.get = sinon.stub().rejects(new Error("HTTP 500"));
      await expect(transactionClient.get({ transactionId: "abc" })).to.be.rejectedWith("HTTP 500");
    });
  });

  describe("Test transactionClient.list", function () {
    it("should return list of collections", async function () {
      axiosMock.post = sinon.stub().resolves({
        data: {
          transactions: [
            {
              id: "1",
              txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
              ipOrgId: "7",
              resourceId: "1",
              resourceType: ResourceType.IP_ASSET,
              actionType: ActionType.CONFIGURE,
              initiator: "0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d",
              createdAt: "0001-01-01T00:00:00Z",
            },
            {
              id: "2",
              txHash: "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
              ipOrgId: "7",
              resourceId: "2",
              resourceType: "License",
              actionType: ActionType.REGISTER,
              initiator: "0xd84316a1b6f40902c17b8177854cdaeb3c957daf",
              createdAt: "0001-01-01T00:00:00Z",
            },
          ],
        },
      });

      const response = await transactionClient.list();
      const transactions = response.transactions;

      // First transaction in array
      expect(transactions[0].id).to.be.equal("1");
      expect(transactions[0].txHash).to.be.equal(
        "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );
      expect(transactions[0].createdAt).to.be.equal("0001-01-01T00:00:00Z");
      expect(transactions[0].initiator).to.be.equal("0x4f9693ac46f2c7e2f48dd14d8fe1ab44192cd57d");
      expect(transactions[0].resourceType).to.be.equal(ResourceType.IP_ASSET);
      expect(transactions[0].resourceId).to.be.equal("1");
      expect(transactions[0].ipOrgId).to.be.equal("7");

      // Second transaction in array
      expect(transactions[1].id).to.be.equal("2");
      expect(transactions[1].txHash).to.be.equal(
        "0x00a1a14e0193144e1d7024428ee242c44e5cacdbd7458c629d17c6366f6c5cb6",
      );
      expect(transactions[1].createdAt).to.be.equal("0001-01-01T00:00:00Z");
      expect(transactions[1].initiator).to.be.equal("0xd84316a1b6f40902c17b8177854cdaeb3c957daf");
      expect(transactions[1].resourceType).to.be.equal("License");
      expect(transactions[1].resourceId).to.be.equal("2");
      expect(transactions[1].ipOrgId).to.be.equal("7");
    });

    it("should be able to throw an error", async function () {
      axiosMock.post = sinon.stub().rejects(new Error("HTTP 500"));
      await expect(transactionClient.list()).to.be.rejectedWith("HTTP 500");
    });
  });
});

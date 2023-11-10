import chai, { expect } from "chai";
import { RelationshipClient } from "../../../src/resources/relationship";
import { createMock } from "../testUtils";
import * as sinon from "sinon";

import chaiAsPromised from "chai-as-promised";
import {AxiosInstance} from "axios";
import {PublicClient, WalletClient, stringToHex} from "viem";

chai.use(chaiAsPromised);

describe("Test RelationshipClient", function () {
  let relationshipClient: RelationshipClient;
  // let relationshipModuleMock: RelationshipModule;
  // let franchiseRegistryMock: FranchiseRegistry;

  let axiosMock: AxiosInstance;
  let rpcMock: PublicClient;
  let walletMock: WalletClient;

  beforeEach(function () {
    axiosMock = createMock<AxiosInstance>();
    rpcMock = createMock<PublicClient>();
    walletMock = createMock<WalletClient>();

    // relationshipModuleMock = createMock<RelationshipModule>({
    //   relate: (args: any) => ({ args }),
    // });
    // franchiseRegistryMock = createMock<FranchiseRegistry>();
    relationshipClient = new RelationshipClient(axiosMock, rpcMock, walletMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("test getRegistryAddresses", () => {
    const mockRelateRequest = {
      sourceIPAsset: {
        franchiseId: "6",
        ipAssetId: "1",
      },
      destIPAsset: {
        franchiseId: "6",
        ipAssetId: "2",
      },
      ttl: "123",
    };

    it("should resolve with the registry addresses", async () => {
      rpcMock.readContract = sinon
        .stub()
        .withArgs(mockRelateRequest.sourceIPAsset.franchiseId)
        .onFirstCall()
        .returns("0x00000000000000000000000000000000000000001")
        .onSecondCall()
        .returns("0x00000000000000000000000000000000000000002")
        .onThirdCall()
        .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d")

      rpcMock.simulateContract = sinon.stub().resolves({request: null})
      walletMock.writeContract = sinon.stub().resolves("0x129f7dd802200f096221dd89d5b086e4bd3ad6eafb378a0c75e3b04fc375f997");

      // Call the method and await the result
      const relateSpy = sinon.spy(relationshipClient, "relate");
      await relationshipClient.relate(mockRelateRequest);

      const mockRelationshipData = stringToHex("",{ size: 32 });

      // Assertions
      expect(relateSpy.calledOnce).to.be.true;
      expect(
        relateSpy.calledWith(
            mockRelateRequest
        ),
      ).to.be.true;
    });

    it("should handle errors", async () => {
      // Stub the async method to simulate an error
      rpcMock.readContract = sinon
        .stub()
        .rejects(new Error("Simulated error"));

      // Call the relate method and check that it handles the error
      await expect(relationshipClient.relate(mockRelateRequest)).to.be.rejectedWith(
        "Simulated error",
      );
    });
  });

  describe("Test RelationshipClient.relate", function () {
    const mockRelateRequest = {
      sourceIPAsset: {
        franchiseId: "6",
        ipAssetId: "1",
      },
      destIPAsset: {
        franchiseId: "6",
        ipAssetId: "2",
      },
      ttl: "123",
    };

    const mockResponse = {
      hash: "transactionHash",
    };

    it("should create a relationship and return txHash", async function () {
      rpcMock.readContract = sinon
          .stub()
          .withArgs(mockRelateRequest.sourceIPAsset.franchiseId)
          .onFirstCall()
          .returns("0x00000000000000000000000000000000000000001")
          .onSecondCall()
          .returns("0x00000000000000000000000000000000000000002")
          .onThirdCall()
          .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d")

      rpcMock.simulateContract = sinon.stub().resolves({request: null})
      walletMock.writeContract = sinon.stub().resolves(mockResponse);

      // Call the relate method and check the response
      const response = await relationshipClient.relate(mockRelateRequest);

      expect(response.txHash).to.equal(mockResponse);
    });

    it("should handle errors during relationship creation", async function () {
      rpcMock.readContract = sinon
          .stub()
          .withArgs(mockRelateRequest.sourceIPAsset.franchiseId)
          .onFirstCall()
          .returns("0x00000000000000000000000000000000000000001")
          .onSecondCall()
          .returns("0x00000000000000000000000000000000000000002")
          .onThirdCall()
          .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d")

      rpcMock.simulateContract = sinon.stub().resolves({request: null})
      walletMock.writeContract = sinon.stub().rejects(new Error("Failed to create relationship"));

      // Call the relate method and check that it handles the error
      await expect(relationshipClient.relate(mockRelateRequest)).to.be.rejectedWith(
        "Failed to create relationship",
      );
    });
  });

  describe("Test RelationshipClient.unrelate", function () {
    const mockUnrelateRequest = {
      sourceIPAsset: {
        franchiseId: "6",
        ipAssetId: "1",
      },
      destIPAsset: {
        franchiseId: "6",
        ipAssetId: "2",
      },
      ttl: "123",
    };
    const mockResponse = {
      hash: "transactionHash",
    };

    it("should unrelate and return txHash", async function () {
      rpcMock.readContract = sinon
          .stub()
          .onFirstCall()
          .returns("0x00000000000000000000000000000000000000001")
          .onSecondCall()
          .returns("0x00000000000000000000000000000000000000002")
          .onThirdCall()
          .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d")

      rpcMock.simulateContract = sinon.stub().resolves({request: null})
      walletMock.writeContract = sinon.stub().resolves(mockResponse);

      const response = await relationshipClient.unrelate(mockUnrelateRequest);

      expect(response.txHash).to.equal(mockResponse);
    });

    it("should handle errors during unrelation", async function () {
      rpcMock.readContract = sinon
          .stub()
          .onFirstCall()
          .returns("0x00000000000000000000000000000000000000001")
          .onSecondCall()
          .returns("0x00000000000000000000000000000000000000002")
          .onThirdCall()
          .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d")

      rpcMock.simulateContract = sinon.stub().resolves({request: null})
      walletMock.writeContract = sinon.stub().rejects(new Error("Failed to unrelate relationship"));

      await expect(relationshipClient.unrelate(mockUnrelateRequest)).to.be.rejectedWith(
        "Failed to unrelate relationship",
      );
    });
  });

  describe("Test RelationshipClient.isRelationshipExpired", function () {
    const mockIsRelationshipExpiredRequest = {
      sourceIPAsset: {
        franchiseId: "6",
        ipAssetId: "1",
      },
      destIPAsset: {
        franchiseId: "6",
        ipAssetId: "2",
      },
      ttl: "123",
    };

    it("should check if relationship is expired and return result", async function () {
      const mockResponse = true;

      rpcMock.readContract = sinon
          .stub()
          .onFirstCall()
          .returns("0x00000000000000000000000000000000000000001")
          .onSecondCall()
          .returns("0x00000000000000000000000000000000000000002")
          .onThirdCall()
          .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d")
          .onCall(3)
          .returns(mockResponse)

      const response = await relationshipClient.isRelationshipExpired(
        mockIsRelationshipExpiredRequest,
      );

      expect(response.result).to.equal(mockResponse);
    });

    it("should handle errors when checking if relationship is expired", async function () {
      rpcMock.readContract = sinon
          .stub()
          .onFirstCall()
          .returns("0x00000000000000000000000000000000000000001")
          .onSecondCall()
          .returns("0x00000000000000000000000000000000000000002")
          .onThirdCall()
          .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d")
          .onCall(3)
          .rejects(new Error("Failed to get isRelationshipExpired"));

      await expect(
        relationshipClient.isRelationshipExpired(mockIsRelationshipExpiredRequest),
      ).to.be.rejectedWith("Failed to get isRelationshipExpired");
    });
  });

  describe("Test RelationshipClient.isRelated", function () {
    const mockIsRelatedRequest = {
      sourceIPAsset: {
        franchiseId: "6",
        ipAssetId: "1",
      },
      destIPAsset: {
        franchiseId: "6",
        ipAssetId: "2",
      },
      ttl: "123",
    };

    it("should check if two entities are related and return result", async function () {
      const mockResponse = true;

      rpcMock.readContract = sinon
          .stub()
          .onFirstCall()
          .returns("0x00000000000000000000000000000000000000001")
          .onSecondCall()
          .returns("0x00000000000000000000000000000000000000002")
          .onThirdCall()
          .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d")
          .onCall(3)
          .returns(mockResponse)

      const response = await relationshipClient.isRelated(mockIsRelatedRequest);

      expect(response.result).to.equal(mockResponse);
    });

    it("should handle errors when checking if two entities are related", async function () {
      rpcMock.readContract = sinon
          .stub()
          .onFirstCall()
          .returns("0x00000000000000000000000000000000000000001")
          .onSecondCall()
          .returns("0x00000000000000000000000000000000000000002")
          .onThirdCall()
          .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d")
          .onCall(3)
          .rejects(new Error("Failed to get isRelated"));

      await expect(relationshipClient.isRelated(mockIsRelatedRequest)).to.be.rejectedWith(
        "Failed to get isRelated",
      );
    });
  });
});

import chai, { expect } from "chai";
import { RelationshipClient } from "../../../src/resources/relationship";
import { createMock } from "../testUtils";
import * as sinon from "sinon";

import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

describe("Test RelationshipClient", function () {
  let relationshipClient: RelationshipClient;
  let relationshipModuleMock: RelationshipModule;
  let franchiseRegistryMock: FranchiseRegistry;

  beforeEach(function () {
    relationshipModuleMock = createMock<RelationshipModule>({
      relate: (args: any) => ({ args }),
    });
    franchiseRegistryMock = createMock<FranchiseRegistry>();
    relationshipClient = new RelationshipClient(relationshipModuleMock, franchiseRegistryMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("test getRegistryAddresses", () => {
    const mockRelateRequest = {
      sourceIPAsset: {
        franchiseId: 6n,
        ipAssetId: 1n,
      },
      destIPAsset: {
        franchiseId: 6n,
        ipAssetId: 2n,
      },
      ttl: 123n,
    };

    it("should resolve with the registry addresses", async () => {
      franchiseRegistryMock.ipAssetRegistryForId = sinon
        .stub()
        .withArgs(mockRelateRequest.sourceIPAsset.franchiseId)
        .onFirstCall()
        .returns("0x00000000000000000000000000000000000000001")
        .onSecondCall()
        .returns("0x00000000000000000000000000000000000000002");

      relationshipModuleMock.getRelationshipId = sinon
        .stub()
        .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d");

      // Call the method and await the result
      const relateSpy = sinon.spy(relationshipModuleMock, "relate");

      const mockRelationshipData = ethers.utils.formatBytes32String("");

      const response = await relationshipClient.relate(mockRelateRequest);

      // Assertions
      expect(relateSpy.calledOnce).to.be.true;
      expect(
        relateSpy.calledWith(
          {
            sourceContract: "0x00000000000000000000000000000000000000001",
            sourceId: 1n,
            destContract: "0x00000000000000000000000000000000000000002",
            destId: 2n,
            relationshipId: "0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d",
            ttl: "0",
          },
          mockRelationshipData,
        ),
      ).to.be.true;
    });

    it("should handle errors", async () => {
      // Stub the async method to simulate an error
      franchiseRegistryMock.ipAssetRegistryForId = sinon
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
        franchiseId: 6n,
        ipAssetId: 1n,
      },
      destIPAsset: {
        franchiseId: 6n,
        ipAssetId: 2n,
      },
      ttl: 123n,
    };

    const mockResponse = {
      hash: "transactionHash",
    };

    it("should create a relationship and return txHash", async function () {
      franchiseRegistryMock.ipAssetRegistryForId = sinon
        .stub()
        .returns("0x75fe76f35A0A4e33d924c4cDAF5dE58C3D42922c");

      // Stub the relationshipModule's relate method to return the mock response
      relationshipModuleMock.getRelationshipId = sinon
        .stub()
        .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d");
      relationshipModuleMock.relate = sinon.stub().returns(mockResponse);

      // Call the relate method and check the response
      const response = await relationshipClient.relate(mockRelateRequest);

      expect(response.txHash).to.equal(mockResponse.hash);
    });

    it("should handle errors during relationship creation", async function () {
      franchiseRegistryMock.ipAssetRegistryForId = sinon
        .stub()
        .returns("0x75fe76f35A0A4e33d924c4cDAF5dE58C3D42922c");

      // Stub the relationshipModule's relate method to throw an error
      relationshipModuleMock.relate = sinon
        .stub()
        .rejects(new Error("Failed to create relationship"));

      // Call the relate method and check that it handles the error
      await expect(relationshipClient.relate(mockRelateRequest)).to.be.rejectedWith(
        "Failed to create relationship",
      );
    });
  });

  describe("Test RelationshipClient.unrelate", function () {
    const mockUnrelateRequest = {
      sourceIPAsset: {
        franchiseId: 6n,
        ipAssetId: 1n,
      },
      destIPAsset: {
        franchiseId: 6n,
        ipAssetId: 2n,
      },
      ttl: 123n,
    };
    const mockResponse = {
      hash: "transactionHash",
    };

    it("should unrelate and return txHash", async function () {
      franchiseRegistryMock.ipAssetRegistryForId = sinon
        .stub()
        .returns("0x75fe76f35A0A4e33d924c4cDAF5dE58C3D42922c");

      relationshipModuleMock.getRelationshipId = sinon
        .stub()
        .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d");
      relationshipModuleMock.unrelate = sinon.stub().returns(mockResponse);

      const response = await relationshipClient.unrelate(mockUnrelateRequest);

      expect(response.txHash).to.equal(mockResponse.hash);
    });

    it("should handle errors during unrelation", async function () {
      franchiseRegistryMock.ipAssetRegistryForId = sinon
        .stub()
        .returns("0x75fe76f35A0A4e33d924c4cDAF5dE58C3D42922c");

      const mockError = new Error("Failed to unrelate relationship");
      relationshipModuleMock.unrelate = sinon.stub().rejects(mockError);

      await expect(relationshipClient.unrelate(mockUnrelateRequest)).to.be.rejectedWith(
        "Failed to unrelate relationship",
      );
    });
  });

  describe("Test RelationshipClient.isRelationshipExpired", function () {
    const mockIsRelationshipExpiredRequest = {
      sourceIPAsset: {
        franchiseId: 6n,
        ipAssetId: 1n,
      },
      destIPAsset: {
        franchiseId: 6n,
        ipAssetId: 2n,
      },
      ttl: 123n,
    };

    it("should check if relationship is expired and return result", async function () {
      const mockResponse = true;

      franchiseRegistryMock.ipAssetRegistryForId = sinon
        .stub()
        .returns("0x75fe76f35A0A4e33d924c4cDAF5dE58C3D42922c");

      relationshipModuleMock.getRelationshipId = sinon
        .stub()
        .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d");
      relationshipModuleMock.isRelationshipExpired = sinon.stub().returns(mockResponse);

      const response = await relationshipClient.isRelationshipExpired(
        mockIsRelationshipExpiredRequest,
      );

      expect(response.result).to.equal(mockResponse);
    });

    it("should handle errors when checking if relationship is expired", async function () {
      franchiseRegistryMock.ipAssetRegistryForId = sinon
        .stub()
        .returns("0x75fe76f35A0A4e33d924c4cDAF5dE58C3D42922c");

      relationshipModuleMock.isRelationshipExpired = sinon
        .stub()
        .rejects(new Error("Failed to get isRelationshipExpired"));

      await expect(
        relationshipClient.isRelationshipExpired(mockIsRelationshipExpiredRequest),
      ).to.be.rejectedWith("Failed to get isRelationshipExpired");
    });
  });

  describe("Test RelationshipClient.isRelated", function () {
    const mockIsRelatedRequest = {
      sourceIPAsset: {
        franchiseId: 6n,
        ipAssetId: 1n,
      },
      destIPAsset: {
        franchiseId: 6n,
        ipAssetId: 2n,
      },
      ttl: 123n,
    };

    it("should check if two entities are related and return result", async function () {
      const mockResponse = true;

      franchiseRegistryMock.ipAssetRegistryForId = sinon
        .stub()
        .returns("0x75fe76f35A0A4e33d924c4cDAF5dE58C3D42922c");

      relationshipModuleMock.getRelationshipId = sinon
        .stub()
        .returns("0x472511bc397e46b55b56292ba067168f2f5ceb640570883cadf0daafda894c1d");
      relationshipModuleMock.areTheyRelated = sinon.stub().returns(mockResponse);

      const response = await relationshipClient.isRelated(mockIsRelatedRequest);

      expect(response.result).to.equal(mockResponse);
    });

    it("should handle errors when checking if two entities are related", async function () {
      franchiseRegistryMock.ipAssetRegistryForId = sinon
        .stub()
        .returns("0x75fe76f35A0A4e33d924c4cDAF5dE58C3D42922c");

      relationshipModuleMock.areTheyRelated = sinon
        .stub()
        .rejects(new Error("Failed to get isRelated"));

      await expect(relationshipClient.isRelated(mockIsRelatedRequest)).to.be.rejectedWith(
        "Failed to get isRelated",
      );
    });
  });
});

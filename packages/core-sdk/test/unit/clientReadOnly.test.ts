import { expect } from "chai";
import { StoryClient } from "../../src/client";
import { Environment } from "../../src/enums/Environment";
import { ReadOnlyClient } from "../../src/types/client";
import { fantom } from "viem/chains";
import { http } from "viem";

describe("Test StoryReadOnlyClient", function () {
  describe("Test constructor", function () {
    it("should throw error when environment is not test", function () {
      try {
        StoryClient.newReadOnlyClient({
          environment: Environment.PROD,
        });
        expect.fail(`Function should not get here, it should throw an error `);
      } catch (error) {}
    });

    it("should succeed when passing in valid params", function () {
      try {
        StoryClient.newReadOnlyClient({
          environment: Environment.TEST,
        });
      } catch (error) {
        expect.fail(`Function should not have thrown any error, but it threw: ${error}`);
      }
    });

    it("should succeed when passing in valid params w/ provider", function () {
      try {
        StoryClient.newReadOnlyClient({
          environment: Environment.TEST,
          chain: fantom,
          transport: http(process.env.RPC_PROVIDER_URL),
        });
      } catch (error) {
        expect.fail(`Function should not have thrown any error, but it threw: ${error}`);
      }
    });
  });

  describe("Test getters", function () {
    let client: ReadOnlyClient;

    beforeEach(function () {
      client = StoryClient.newReadOnlyClient({
        environment: Environment.TEST,
      });
    });

    describe("Test franchise getter", function () {
      it("should return the same franchise when every time it's called", function () {
        const franchise1 = client.franchise;
        const franchise2 = client.franchise;
        expect(franchise1).to.be.equal(franchise2);
      });
    });

    describe("Test IP Asset getter", function () {
      it("should return the same franchise when every time it's called", function () {
        const ipAsset1 = client.ipAsset;
        const ipAsset2 = client.ipAsset;
        expect(ipAsset1).to.be.equal(ipAsset2);
      });
    });

    describe("Test license getter", function () {
      it("should return the same license when every time it's called", function () {
        const license1 = client.license;
        const license2 = client.license;
        expect(license1).to.be.equal(license2);
      });
    });

    describe("Test transactions getter", function () {
      it("should return the same transaction client when every time it's called", function () {
        const transaction1 = client.transaction;
        const transaction2 = client.transaction;
        expect(transaction1).to.be.equal(transaction2);
      });
    });

    describe("Test collect getter", function () {
      it("should return the same collect client when every time it's called", function () {
        const collect1 = client.collect;
        const collect2 = client.collect;
        expect(collect1).to.be.equal(collect2);
      });
    });

    describe("Test relationship getter", function () {
      it("should return the same relationship when every time it's called", function () {
        const relationship1 = client.relationship;
        const relationship2 = client.relationship;
        expect(relationship1).to.be.equal(relationship2);
      });
    });
  });

  // describe("Test getters w/ provider", function () {
  //   let client: ReadOnlyClient;

  //   beforeEach(function () {
  //     client = StoryClient.newReadOnlyClient({
  //       environment: Environment.TEST,
  //       provider: new providers.JsonRpcProvider(),
  //     });
  //   });

  //   describe("Test franchise getter w/ provider", function () {
  //     it("should return the same franchise when every time it's called", function () {
  //       const franchise1 = client.franchise;
  //       const franchise2 = client.franchise;
  //       expect(franchise1).to.be.equal(franchise2);
  //     });
  //   });
  // });

  // describe("Test franchise getter w/o creating a client", function () {
  //   let client: ReadOnlyClient;

  //   it("should throw error when a client hasn't been created", function () {
  //     try {
  //       client.franchise;

  //       expect.fail(`You haven't created a client yet.`);
  //     } catch (error) {}
  //   });
  // });
});

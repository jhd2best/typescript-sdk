import { Address, PublicClient, stringToHex, WalletClient } from "viem";
import { AxiosInstance } from "axios";

import {
  RelationshipIsRelatedRequest,
  RelationshipIsRelatedResponse,
  RelationshipIsRelationshipExpiredRequest,
  RelationshipIsRelationshipExpiredResponse,
  RelationshipRelateRequest,
  RelationshipRelateResponse,
  RelationshipUnrelateRequest,
  RelationshipUnrelateResponse,
} from "../types/resources/relationship";
import { handleError } from "../utils/errors";
import { RelationshipReadOnlyClient } from "./relationshipReadOnly";
import { franchiseRegistryConfig } from "../abi/franchiseRegistry.abi";
import { relationshipModuleConfig } from "../abi/relationshipModule.abi";
import {parseToBigInt} from "../utils/utils";

/**
 * Client for managing relationships.
 */
export class RelationshipClient extends RelationshipReadOnlyClient {
  private readonly wallet: WalletClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient, wallet: WalletClient) {
    super(httpClient, rpcClient);
    this.wallet = wallet;
  }

  /**
   * Retrieves the registry addresses for source and destination franchises.
   * @param sourceFranchiseId - The ID of the source franchise.
   * @param destFranchiseId - The ID of the destination franchise.
   * @returns An object containing the source and destination IP registry addresses.
   */
  private async getRegistryAddresses(
    sourceFranchiseId: string,
    destFranchiseId: string,
  ): Promise<{
    sourceIpRegistryAddress: Address;
    destIpRegistryAddress: Address;
  }> {
    try {
      const sourceIpRegistryAddress = await this.rpcClient.readContract({
        ...franchiseRegistryConfig,
        functionName: "ipAssetRegistryForId",
        args: [parseToBigInt(sourceFranchiseId)],
      });

      const destIpRegistryAddress = await this.rpcClient.readContract({
        ...franchiseRegistryConfig,
        functionName: "ipAssetRegistryForId",
        args: [parseToBigInt(destFranchiseId)],
      });

      return {
        sourceIpRegistryAddress,
        destIpRegistryAddress,
      };
    } catch (error) {
      handleError(error, "Failed to get registry addresses");
    }
  }

  /**
   * Establishes a relationship between two IP assets.
   * @param request - The request for establishing the relationship.
   * @returns A promise that resolves to the response with the transaction hash.
   */
  public async relate(request: RelationshipRelateRequest): Promise<RelationshipRelateResponse> {
    try {
      const { sourceIPAsset, destIPAsset } = request;

      const mockRelationshipData = stringToHex("");

      // Get IPAssetRegistry Contract Address
      const { sourceIpRegistryAddress, destIpRegistryAddress } = await this.getRegistryAddresses(
        sourceIPAsset.franchiseId,
        destIPAsset.franchiseId,
      );

      const relationshipId = await this.rpcClient.readContract({
        ...relationshipModuleConfig,
        functionName: "getRelationshipId",
        args: ["APPEARS_IN"],
      });

      const params = {
        sourceContract: sourceIpRegistryAddress,
        sourceId: parseToBigInt(sourceIPAsset.ipAssetId),
        destContract: destIpRegistryAddress,
        destId: parseToBigInt(destIPAsset.ipAssetId),
        relationshipId,
        ttl: 0n,
      };

      const { request: call } = await this.rpcClient.simulateContract({
        ...relationshipModuleConfig,
        functionName: "relate",
        args: [params, mockRelationshipData],
        account: this.wallet.account,
      });

      return {
        txHash: await this.wallet.writeContract(call),
      };
    } catch (error) {
      handleError(error, "Failed to create relationship");
    }
  }

  /**
   * Removes a relationship between two IP assets.
   * @param request - The request for removing the relationship.
   * @returns A promise that resolves to the response with the transaction hash.
   */
  public async unrelate(
    request: RelationshipUnrelateRequest,
  ): Promise<RelationshipUnrelateResponse> {
    try {
      const { sourceIPAsset, destIPAsset } = request;

      // Get IPAssetRegistry Contract Address
      const { sourceIpRegistryAddress, destIpRegistryAddress } = await this.getRegistryAddresses(
        sourceIPAsset.franchiseId,
        destIPAsset.franchiseId,
      );

      const relationshipId = await this.rpcClient.readContract({
        ...relationshipModuleConfig,
        functionName: "getRelationshipId",
        args: ["APPEARS_IN"],
      });

      const params = {
        sourceContract: sourceIpRegistryAddress,
        sourceId: parseToBigInt(sourceIPAsset.ipAssetId),
        destContract: destIpRegistryAddress,
        destId: parseToBigInt(destIPAsset.ipAssetId),
        relationshipId,
        ttl: 0n,
      };

      const { request: call } = await this.rpcClient.simulateContract({
        ...relationshipModuleConfig,
        functionName: "unrelate",
        args: [params],
        account: this.wallet.account,
      });

      return {
        txHash: await this.wallet.writeContract(call),
      };
    } catch (error) {
      handleError(error, "Failed to unrelate relationship");
    }
  }

  /**
   * Checks if a relationship has expired.
   * @param request - The request for checking the relationship's expiration status.
   * @returns A promise that resolves to the response indicating whether the relationship has expired.
   */
  public async isRelationshipExpired(
    request: RelationshipIsRelationshipExpiredRequest,
  ): Promise<RelationshipIsRelationshipExpiredResponse> {
    try {
      const { sourceIPAsset, destIPAsset } = request;

      // Get IPAssetRegistry Contract Address
      const { sourceIpRegistryAddress, destIpRegistryAddress } = await this.getRegistryAddresses(
        sourceIPAsset.franchiseId,
        destIPAsset.franchiseId,
      );

      const relationshipId = await this.rpcClient.readContract({
        ...relationshipModuleConfig,
        functionName: "getRelationshipId",
        args: ["APPEARS_IN"],
      });

      const params = {
        sourceContract: sourceIpRegistryAddress,
        sourceId: parseToBigInt(sourceIPAsset.ipAssetId),
        destContract: destIpRegistryAddress,
        destId: parseToBigInt(destIPAsset.ipAssetId),
        relationshipId,
        ttl: 0n,
      };

      const response = await this.rpcClient.readContract({
        ...relationshipModuleConfig,
        functionName: "isRelationshipExpired",
        args: [params],
      });

      return {
        result: response,
      };
    } catch (error) {
      handleError(error, "Failed to get isRelationshipExpired");
    }
  }

  /**
   * Checks if two IP assets are related.
   * @param request - The request for checking the relationship between two IP assets.
   * @returns A promise that resolves to the response indicating whether the IP assets are related.
   */
  public async isRelated(
    request: RelationshipIsRelatedRequest,
  ): Promise<RelationshipIsRelatedResponse> {
    try {
      const { sourceIPAsset, destIPAsset } = request;

      // Get IPAssetRegistry Contract Address
      const { sourceIpRegistryAddress, destIpRegistryAddress } = await this.getRegistryAddresses(
        sourceIPAsset.franchiseId,
        destIPAsset.franchiseId,
      );

      const relationshipId = await this.rpcClient.readContract({
        ...relationshipModuleConfig,
        functionName: "getRelationshipId",
        args: ["APPEARS_IN"],
      });

      const params = {
        sourceContract: sourceIpRegistryAddress,
        sourceId: parseToBigInt(sourceIPAsset.ipAssetId),
        destContract: destIpRegistryAddress,
        destId: parseToBigInt(destIPAsset.ipAssetId),
        relationshipId,
        ttl: 0n,
      };

      const response = await this.rpcClient.readContract({
        ...relationshipModuleConfig,
        functionName: "areTheyRelated",
        args: [params],
      });

      return {
        result: response,
      };
    } catch (error) {
      handleError(error, "Failed to get isRelated");
    }
  }
}

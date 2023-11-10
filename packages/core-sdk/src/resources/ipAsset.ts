import { AxiosInstance } from "axios";
import { Address, getAddress, PublicClient, WalletClient } from "viem";

import { CreateIpAssetRequest, CreateIpAssetResponse } from "../types/resources/ipAsset";
import { handleError } from "../utils/errors";
import { IPAssetReadOnlyClient } from "./ipAssetReadOnly";
import { franchiseRegistryConfig } from "../abi/franchiseRegistry.abi";
import { ipAssetRegistryConfigMaker } from "../abi/ipAssetRegistry.abi";
import {parseToBigInt} from "../utils/utils";

/**
 * IpAssetClient allows you to create, view, and list IP Assets on Story Protocol.
 */
export class IPAssetClient extends IPAssetReadOnlyClient {
  private readonly wallet: WalletClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient, wallet: WalletClient) {
    super(httpClient, rpcClient);
    this.wallet = wallet;
  }

  /**
   * Get the ipAssetRegistry associated with a franchiseId.
   *
   * @returns the response object that contains the requested ipAssetRegistry.
   */
  private async getRegistryAddress(franchiseId: string): Promise<Address> {
    try {
      return await this.rpcClient.readContract({
        ...franchiseRegistryConfig,
        functionName: "ipAssetRegistryForId",
        args: [parseToBigInt(franchiseId)],
      });
    } catch (error) {
      handleError(error, "Failed to retrieve IP Asset Registry");
    }
  }

  /**
   * Create an IP Asset on Story Protocol based on the specified input asset data.
   *
   * @param request - the request object that contains all data needed to create an IP Asset.
   * @returns the response object that contains results from the asset creation.
   */
  public async create(request: CreateIpAssetRequest): Promise<CreateIpAssetResponse> {
    try {
      const franchiseId = request.franchiseId;
      const ipAssetRegistryAddress = await this.getRegistryAddress(franchiseId);

      const { request: call } = await this.rpcClient.simulateContract({
        ...ipAssetRegistryConfigMaker(ipAssetRegistryAddress),
        functionName: "createIPAsset",
        args: [
          request.ipAssetType,
          request.ipAssetName,
          request.description,
          request.mediaUrl,
          getAddress(request.to),
          parseToBigInt(request.parentIpAssetId),
        ],
      });

      return {
        txHash: await this.wallet.writeContract(call),
      };
    } catch (error) {
      handleError(error, "Failed to create IP Asset");
    }
  }
}

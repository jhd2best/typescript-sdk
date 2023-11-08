import { AxiosInstance } from "axios";
import { getAddress, PublicClient, WalletClient } from "viem";

import { CollectIPAssetRequest, CollectIPAssetResponse } from "../types/resources/collect";
import { handleError } from "../utils/errors";
import { CollectReadOnlyClient } from "./collectReadOnly";
import { collectModuleConfig } from "../abi/collectModule.abi";

export class CollectClient extends CollectReadOnlyClient {
  protected readonly wallet: WalletClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient, wallet: WalletClient) {
    super(httpClient, rpcClient);
    this.wallet = wallet;
  }

  /**
   * Collect an IP Asset on Story Protocol based on the specified input collect data.
   *
   * @param request - the request object that contains all data needed to collect an IP Asset
   * @returns the response object that contains results from the create franchise action
   */
  public async collect(request: CollectIPAssetRequest): Promise<CollectIPAssetResponse> {
    try {
      const { request: call } = await this.rpcClient.simulateContract({
        ...collectModuleConfig,
        functionName: "collect",
        args: [
          {
            franchiseId: request.franchiseId,
            ipAssetId: request.ipAssetId,
            collector: getAddress(request.collector),
            collectData: "0x",
            collectNFTInitData: "0x",
            collectNFTData: "0x",
          },
        ],
      });

      return {
        txHash: await this.wallet.writeContract(call),
      };
    } catch (error: unknown) {
      handleError(error, "Failed to collect IP Asset");
    }
  }
}

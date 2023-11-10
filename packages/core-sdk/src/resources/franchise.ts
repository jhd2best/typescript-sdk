import { AxiosInstance } from "axios";
import { PublicClient, WalletClient } from "viem";

import {
  ConfigureFranchiseRequest,
  ConfigureFranchiseResponse,
  CreateFranchiseRequest,
  CreateFranchiseResponse,
} from "../types/resources/franchise";
import { handleError } from "../utils/errors";
import { FranchiseReadOnlyClient } from "./franchiseReadOnly";
import { franchiseRegistryConfig } from "../abi/franchiseRegistry.abi";
import { licensingModuleConfig } from "../abi/licensingModule.abi";
import { AddressZero } from "../constants/addresses";
import {parseToBigInt} from "../utils/utils";

/**
 * FranchiseClient allows you to create, update, view, search franchises on
 * Story Protocol.
 */
export class FranchiseClient extends FranchiseReadOnlyClient {
  private readonly wallet: WalletClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient, wallet: WalletClient) {
    super(httpClient, rpcClient);
    this.wallet = wallet;
  }

  /**
   * Create a franchise on Story Protocol based on the specified input franchise data.
   *
   * @param request - the request object that contains all data needed to create a franchise
   * @returns the response object that contains results from the create franchise action
   */
  public async create(request: CreateFranchiseRequest): Promise<CreateFranchiseResponse> {
    try {
      // hardcoded the URI for now until the backend API for uploading franchise metadata is ready
      const tokenURI = "https://arweave.net/dnFJl1v8kgOx_6Z0gEsBce3D56cMP4-lxAcFqSsL0_w";

      const { request: call } = await this.rpcClient.simulateContract({
        ...franchiseRegistryConfig,
        functionName: "registerFranchise",
        args: [
          {
            name: request.franchiseName,
            symbol: request.franchiseSymbol,
            description: request.franchiseDescription,
            tokenURI: tokenURI,
          },
        ],
        account: this.wallet.account,
      });

      return {
        txHash: await this.wallet.writeContract(call),
      };
    } catch (error: unknown) {
      handleError(error, "Failed to create franchise");
    }
  }

  /**
   * Configure a franchise on Story Protocol.
   *
   * @param request - the request object that contains all data needed to configure a franchise
   * @returns the response object that contains results from the configure franchise action
   */
  public async configure(request: ConfigureFranchiseRequest): Promise<ConfigureFranchiseResponse> {
    try {
      const { request: call } = await this.rpcClient.simulateContract({
        ...licensingModuleConfig,
        functionName: "configureFranchiseLicensing",
        args: [
          parseToBigInt(request.franchiseId),
          {
            nonCommercialConfig: {
              canSublicense: true,
              franchiseRootLicenseId: 0n,
            },
            nonCommercialTerms: {
              processor: AddressZero,
              data: "0x",
            },
            commercialConfig: {
              canSublicense: false,
              franchiseRootLicenseId: 0n,
            },
            commercialTerms: {
              processor: AddressZero,
              data: "0x",
            },
            commercialLicenseUri: "aaaa",
            rootIpAssetHasCommercialRights: false,
            revoker: "0xF33f05489d9708C2CA97944F2007d4E741D4DEe7",
          },
        ],
        account: this.wallet.account,
      });

      return {
        txHash: await this.wallet.writeContract(call),
      };
    } catch (error: unknown) {
      handleError(error, "Failed to configure franchise");
    }
  }
}

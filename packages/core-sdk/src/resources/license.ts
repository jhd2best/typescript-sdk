import { AxiosInstance } from "axios";
import { Address, getAddress, PublicClient, toHex, WalletClient } from "viem";

import { CreateLicenseRequest, CreateLicenseResponse } from "../types/resources/license";
import { handleError } from "../utils/errors";
import { LicenseReadOnlyClient } from "./licenseReadOnly";
import { franchiseRegistryConfig } from "../abi/franchiseRegistry.abi";
import { ipAssetRegistryConfigMaker } from "../abi/ipAssetRegistry.abi";
import { AddressZero } from "../constants/addresses";
import {parseToBigInt} from "../utils/utils";

/**
 * A class representing License operations.
 *
 * @public
 */
export class LicenseClient extends LicenseReadOnlyClient {
  private readonly wallet: WalletClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient, wallet: WalletClient) {
    super(httpClient, rpcClient);
    this.wallet = wallet;
  }

  /**
   * Create a license within the Story Protocol based on the specified input data.
   *
   * @param request - An object containing the necessary data to create a license.
   * @returns A response object containing the result of the create license action, including the transaction hash.
   */
  public async create(request: CreateLicenseRequest): Promise<CreateLicenseResponse> {
    try {
      const defaults = {
        _tokenId: 0, // Assuming BigNumberish can be initialized with 0
        _parentLicenseId: "0",
        _licenseHolder: "0x8e3B91c90561523312f32B49DAAc4AD15293De7F", // An empty string for a default holder address
        _uri: "https://example.xyz", // An empty string for a default URI
        _revoker: "0x8e3B91c90561523312f32B49DAAc4AD15293De7F", // An empty string for a default revoker address
        _commercial: false, // Default to non-commercial
        _canSublicense: false, // Default to not allowing sublicense
        _terms: {
          processor: AddressZero,
          data: "0x",
        },
        overrides: {
          // Assuming overrides is an object with properties from and gasLimit
          // You may need to provide default values for its properties as well
        },
      };

      const { franchiseId, ipAssetId, licenseURI, options } = request;

      // Get Wallet address from Signer
      const walletAddress: Address = this.wallet.account!.address;

      // Get IPAssetRegistry Contract Address
      const ipAssetRegistryAddress = await this.rpcClient.readContract({
        ...franchiseRegistryConfig,
        functionName: "ipAssetRegistryForId",
        args: [parseToBigInt(franchiseId)],
      });

      // Get parent license Id
      const parentLicenseId = await this.rpcClient.readContract({
        ...ipAssetRegistryConfigMaker(ipAssetRegistryAddress),
        functionName: "getLicenseIdByTokenId",
        args: [parseToBigInt(ipAssetId), options?.isCommercial || defaults._commercial],
      });

      const { request: call } = await this.rpcClient.simulateContract({
        ...ipAssetRegistryConfigMaker(ipAssetRegistryAddress),
        functionName: "createLicense",
        args: [
          parseToBigInt(ipAssetId),
          parentLicenseId,
          walletAddress,
          licenseURI,
          getAddress(options?.revoker || defaults._revoker),
          options?.isCommercial || defaults._commercial,
          options?.isSublicensable || defaults._canSublicense,
          // options?.terms || defaults._terms,
          {
            processor: getAddress(options?.terms?.processor || defaults._terms.processor),
            data: toHex(options?.terms?.data || defaults._terms.data),
          },
        ],
        account: this.wallet.account,
      });

      return {
        txHash: await this.wallet.writeContract(call),
      };
    } catch (error: unknown) {
      handleError(error, "Failed to create license");
    }
  }
}

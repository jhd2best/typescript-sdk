import { AxiosInstance, AxiosResponse } from "axios";
import { PublicClient } from "viem";

import {
  GetLicenseRequest,
  GetLicenseResponse,
  ListLicenseRequest,
  ListLicenseResponse,
} from "../types/resources/license";
import { handleError } from "../utils/errors";
import { isIntegerString } from "../utils/utils";

/**
 * A class representing License operations.
 *
 * @public
 */
export class LicenseReadOnlyClient {
  protected readonly httpClient: AxiosInstance;
  protected readonly rpcClient: PublicClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient) {
    this.httpClient = httpClient;
    this.rpcClient = rpcClient;
  }

  /**
   * Get a license by its ID.
   *
   * @param licenseId - The ID of the license to retrieve.
   * @returns A Promise that resolves to the GetLicenseResponse.
   */
  public async get(request: GetLicenseRequest): Promise<GetLicenseResponse> {
    try {
      if (!isIntegerString(request.licenseId)) {
        throw new Error(`Invalid licenseId. Must be an integer. But got: ${request.licenseId}`);
      }

      const response: AxiosResponse = await this.httpClient.get(`/license/${request.licenseId}`);

      return response.data as GetLicenseResponse;
    } catch (error: unknown) {
      handleError(error, `Failed to get license`);
    }
  }

  /**
   * List all licenses.
   *
   * @returns A Promise that resolves to the ListLicenseResponse.
   */
  public async list(request: ListLicenseRequest): Promise<ListLicenseResponse> {
    try {
      const response: AxiosResponse = await this.httpClient.get(
        `/license?franchiseId=${request.franchiseId}&ipAssetId=${request.ipAssetId}`,
      );

      return response.data as ListLicenseResponse;
    } catch (error: unknown) {
      handleError(error, `Failed to get licenses`);
    }
  }
}

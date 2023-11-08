import { AxiosInstance } from "axios";
import { PublicClient } from "viem";

import {
  GetFranchiseRequest,
  GetFranchiseResponse,
  ListFranchiseResponse,
} from "../types/resources/franchise";
import { handleError } from "../utils/errors";
import { isIntegerString } from "../utils/utils";

/**
 * FranchiseReadOnlyClient allows you to view, search franchises on
 * Story Protocol.
 */
export class FranchiseReadOnlyClient {
  protected readonly httpClient: AxiosInstance;
  protected readonly rpcClient: PublicClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient) {
    this.httpClient = httpClient;
    this.rpcClient = rpcClient;
  }

  /**
   * Get a franchise data based on the specified franchise id.
   *
   * @param request - the request object for getting the franchise
   * @returns the response object that contains the fetched franchise object
   */
  public async get(request: GetFranchiseRequest): Promise<GetFranchiseResponse> {
    try {
      if (!isIntegerString(request.franchiseId)) {
        throw new Error(
          `Invalid franchise id. Must be an integer. But got: ${request.franchiseId}`,
        );
      }

      const response = await this.httpClient.get(`/franchise/${request.franchiseId}`);
      return response.data as GetFranchiseResponse;
    } catch (error: unknown) {
      handleError(error, "Failed to get franchise");
    }
  }
  /**
   * List all franchises.
   *
   * @returns the response object that contains a list of franchises
   */
  public async list(): Promise<ListFranchiseResponse> {
    try {
      const response = await this.httpClient.get(`/franchise`);
      return response.data as ListFranchiseResponse;
    } catch (error: unknown) {
      handleError(error, "Failed to list franchises.");
    }
  }
}

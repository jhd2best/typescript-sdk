import { AxiosInstance } from "axios";
import { isAddress, PublicClient } from "viem";

import {
  GetIPOrgRequest,
  GetIPOrgResponse,
  ListIPOrgRequest,
  ListIPOrgResponse,
} from "../types/resources/IPOrg";
import { handleError } from "../utils/errors";
import { QueryOptions } from "../types/options";

/**
 * IPOrgReadOnlyClient allows you to view, search IPOrgs on
 * Story Protocol.
 */
export class IPOrgReadOnlyClient {
  protected readonly httpClient: AxiosInstance;
  protected readonly rpcClient: PublicClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient) {
    this.httpClient = httpClient;
    this.rpcClient = rpcClient;
  }

  /**
   * Get a IPOrg data based on the specified IPOrg id.
   *
   * @param request - the request object for getting the IPOrg
   * @returns the response object that contains the fetched IPOrg object
   */
  public async get(request: GetIPOrgRequest): Promise<GetIPOrgResponse> {
    try {
      if (!isAddress(request.ipOrgId)) {
        throw new Error(`Invalid IPOrg id. Must be an address. But got: ${request.ipOrgId}`);
      }

      const response = await this.httpClient.get(`/protocol/iporg/${request.ipOrgId}`);
      return response.data as GetIPOrgResponse;
    } catch (error: unknown) {
      handleError(error, "Failed to get IPOrg");
    }
  }
  /**
   * List all IPOrgs.
   *
   * @returns the response object that contains a list of IPOrgs
   */
  public async list(request?: ListIPOrgRequest): Promise<ListIPOrgResponse> {
    try {
      const response = await this.httpClient.post(`/protocol/iporg`, request);
      return response.data as ListIPOrgResponse;
    } catch (error: unknown) {
      handleError(error, "Failed to list IPOrgs.");
    }
  }
}

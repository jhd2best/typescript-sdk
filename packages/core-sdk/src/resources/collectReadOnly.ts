import { AxiosInstance, AxiosResponse } from "axios";
import { PublicClient } from "viem";

import { ListCollectionsRequest, ListCollectionsResponse } from "../types/resources/collect";
import { handleError } from "../utils/errors";

export class CollectReadOnlyClient {
  protected readonly httpClient: AxiosInstance;
  protected readonly rpcClient: PublicClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient) {
    this.httpClient = httpClient;
    this.rpcClient = rpcClient;
  }

  /**
   * List all collected IP Assets.
   *
   * @returns A Promise that resolves to the ListLicenseResponse.
   */
  public async list(request: ListCollectionsRequest): Promise<ListCollectionsResponse> {
    try {
      const response: AxiosResponse = await this.httpClient.get(
        `/collection?franchiseId=${request.franchiseId}`,
      );
      return response.data as ListCollectionsResponse;
    } catch (error: unknown) {
      handleError(error, `Failed to get collections`);
    }
  }
}

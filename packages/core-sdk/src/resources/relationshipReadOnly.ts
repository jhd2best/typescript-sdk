import { AxiosInstance } from "axios";
import { PublicClient } from "viem";

/**
 * Client for managing relationships.
 */
export class RelationshipReadOnlyClient {
  protected readonly httpClient: AxiosInstance;
  protected readonly rpcClient: PublicClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient) {
    this.httpClient = httpClient;
    this.rpcClient = rpcClient;
  }
}

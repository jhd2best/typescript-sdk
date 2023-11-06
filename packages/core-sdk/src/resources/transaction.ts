import {AxiosInstance} from "axios";

import {TransactionReadOnlyClient} from "./transactionReadOnly";
import {PublicClient, WalletClient} from "viem";

/**
 * TransactionClient allows you to view and monitor transactions on
 * Story Protocol.
 */
export class TransactionClient extends TransactionReadOnlyClient {
  protected readonly wallet : WalletClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient, wallet : WalletClient) {
    super(httpClient, rpcClient);
    this.wallet = wallet;
  }
}

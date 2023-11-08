import { ResourceType } from "../../enums/ResourceType";

/**
 * Core data model for transactions.
 *
 * @public
 */
export type Transaction = {
  txId: string;
  txHash: string;
  createdAt: string; // ISO8601
  creatorAddress: string;
  type: ResourceType;
  resourceId: string;
  franchiseId: string;
};

/**
 * Request type for transaction.get method.
 *
 * @public
 */
export type GetTransactionRequest = {
  txId: string;
};

/**
 * Response type for transaction.get method.
 *
 * @public
 */
export type GetTransactionResponse = {
  data: Transaction;
};

/**
 * Response type for transaction.list method.
 *
 * @public
 */
export type ListTransactionResponse = {
  data: Transaction[];
};

import {QueryOptions} from "./helpers";

/**
 * Core data model for transactions.
 *
 * @public
 */
export type Transaction = {
  id: string
  txHash: string
  ipOrgId: string
  creator: string
  resourceId: string
  resourceType: string
  createdAt: string // ISO 8601
};

/**
 * Request type for transaction.get method.
 *
 * @public
 */
export type GetTransactionRequest = {
  txHash: string
};

/**
 * Response type for transaction.get method.
 *
 * @public
 */
export type GetTransactionResponse = {
  transaction: Transaction
};

/**
 * Request type for transaction.list method.
 *
 * @public
 */
export type ListTransactionRequest = {
  options?: QueryOptions
};

/**
 * Response type for transaction.list method.
 *
 * @public
 */
export type ListTransactionResponse = {
  transactions: Transaction[]
};

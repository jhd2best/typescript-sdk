import { QueryOptions, TxOptions } from "../options";

/**
 * Core data model for IP Asset.
 *
 * @public
 */
export type IPAsset = {
  id: string;
  name: string;
  type: number;
  ipOrgId: string;
  owner: string;
  mediaUrl: string;
  contentHash?: string;
  createdAt: string; // ISO 8601
  txHash: string;
};

/**
 * Request type for ipAsset.get method.
 *
 * @public
 */
export type GetIpAssetRequest = {
  ipAssetId: string;
};

/**
 * Response type for ipAsset.get method.
 *
 * @public
 */
export type GetIpAssetResponse = {
  ipAsset: IPAsset;
};

/**
 * Request type for ipAsset.create method.
 *
 * @public
 */
export type CreateIpAssetRequest = {
  name: string;
  type: number;
  ipOrgId: string;
  owner: string;
  mediaUrl?: string;
  contentHash?: string;
  preHookData?: Array<Record<string, unknown>>;
  postHookData?: Array<Record<string, unknown>>;
  txOptions?: TxOptions;
};

/**
 * Response type for ipAsset.create method.
 *
 * @public
 */
export type CreateIpAssetResponse = {
  txHash: string;
  ipAssetId?: string;
};

/**
 * Request type for ipAsset.list method.
 *
 * @public
 */
export type ListIpAssetRequest = {
  ipOrgId?: string;
  options?: QueryOptions;
};

/**
 * Response type for ipAsset.list method.
 *
 * @public
 */
export type ListIpAssetResponse = {
  ipAssets: IPAsset[];
};

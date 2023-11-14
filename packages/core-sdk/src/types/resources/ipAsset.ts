import {IPAssetType} from "../../enums/IPAssetType";
import {QueryOptions, TxOptions} from "./helpers";

/**
 * Core data model for IP Asset.
 *
 * @public
 */
export type IPAsset = {
  id: string
  type: IPAssetType
  ipOrgId: string
  owner: string
  metadataUrl: string
  hash?: string
  data?: string
  createdAt: string // ISO 8601
};

/**
 * Request type for ipAsset.get method.
 *
 * @public
 */
export type GetIpAssetRequest = {
  ipAssetId: string
};

/**
 * Response type for ipAsset.get method.
 *
 * @public
 */
export type GetIpAssetResponse = {
  ipAsset: IPAsset
};

/**
 * Request type for ipAsset.create method.
 *
 * @public
 */
export type CreateIpAssetRequest = {
  name: string
  type: IPAssetType
  ipOrgId: string
  owner: string
  metadataUrl: string
  hash?: string
  data?: string
  txOptions?: TxOptions
};

/**
 * Response type for ipAsset.create method.
 *
 * @public
 */
export type CreateIpAssetResponse = {
  txHash: string
  ipAssetId?: string
};

/**
 * Request type for ipAsset.list method.
 *
 * @public
 */
export type ListIpAssetRequest = {
  options?: QueryOptions
};

/**
 * Response type for ipAsset.list method.
 *
 * @public
 */
export type ListIpAssetResponse = {
  ipAssets: IPAsset[]
};

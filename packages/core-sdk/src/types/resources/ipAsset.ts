import { IPAssetType } from "../../enums/IPAssetType";

/**
 * Core data model for IP Asset.
 *
 * @public
 */
export type IPAsset = {
  ipAssetId: string;
  franchiseId: string;
  ipAssetName: string;
  ipAssetType: IPAssetType;
  ownerAddress: string;
  tokenUri: string;
  txHash: string;
};

/**
 * Request type for ipAsset.get method.
 *
 * @public
 */
export type GetIpAssetRequest = {
  ipAssetId: string;
  franchiseId: string;
};

/**
 * Response type for ipAsset.get method.
 *
 * @public
 */
export type GetIpAssetResponse = {
  data: IPAsset;
};

/**
 * Request type for ipAsset.create method.
 *
 * @public
 */
export type CreateIpAssetRequest = {
  franchiseId: string;
  ipAssetType: IPAssetType;
  ipAssetName: string;
  description: string;
  mediaUrl: string;
  to: string;
  parentIpAssetId: string;
};

/**
 * Response type for ipAsset.create method.
 *
 * @public
 */
export type CreateIpAssetResponse = {
  txHash: string;
};

/**
 * Request type for ipAsset.list method.
 *
 * @public
 */
export type ListIpAssetRequest = {
  franchiseId: string;
};

/**
 * Response type for ipAsset.list method.
 *
 * @public
 */
export type ListIpAssetResponse = {
  data: IPAsset[];
};

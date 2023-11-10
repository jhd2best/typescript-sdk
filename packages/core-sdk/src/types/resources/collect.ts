/**
 * Core data model for Collect.
 *
 * @public
 */
export type Collection = {
  franchiseId: string;
  ipAssetId: string;
  totalCollected: number;
};

/**
 * Request type for collect.collect method.
 *
 * @public
 */
export type CollectIPAssetRequest = {
  franchiseId: string;
  ipAssetId: string;
  collector: string;
};

/**
 * Response type for collect.collect method.
 *
 * @public
 */
export type CollectIPAssetResponse = {
  txHash: string;
};

/**
 * Request type for collect.list method.
 *
 * @public
 */
export type ListCollectionsRequest = {
  franchiseId: string;
};

/**
 * Response type for collect.list method.
 *
 * @public
 */
export type ListCollectionsResponse = {
  data: Collection[];
};

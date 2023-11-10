/**
 * Core type for relationship IPAsset.
 *
 * @public
 */
export type IPAssetId = {
  franchiseId: string;
  ipAssetId: string;
};
/**
 * Request type for relationship.relate method.
 *
 * @public
 */
export type RelationshipRelateRequest = {
  sourceIPAsset: IPAssetId;
  destIPAsset: IPAssetId;
  ttl?: string;
};
/**
 * Response type for relationship.relate method.
 *
 * @public
 */
export type RelationshipRelateResponse = {
  txHash: string;
};

/**
 * Request type for relationship.unrelate method.
 *
 * @public
 */
export type RelationshipUnrelateRequest = {
  sourceIPAsset: IPAssetId;
  destIPAsset: IPAssetId;
  ttl?: string;
};

/**
 * Response type for relationship.unrelate method.
 *
 * @public
 */
export type RelationshipUnrelateResponse = {
  txHash: string;
};
/**
 * Request type for relationship.isRelationshipExpired method.
 *
 * @public
 */
export type RelationshipIsRelationshipExpiredRequest = {
  sourceIPAsset: IPAssetId;
  destIPAsset: IPAssetId;
  ttl?: string;
};
/**
 * Response type for relationship.isRelationshipExpired method.
 *
 * @public
 */
export type RelationshipIsRelationshipExpiredResponse = {
  result: boolean;
};
/**
 * Request type for relationship.isRelated method.
 *
 * @public
 */
export type RelationshipIsRelatedRequest = {
  sourceIPAsset: IPAssetId;
  destIPAsset: IPAssetId;
  ttl?: string;
};
/**
 * Response type for relationship.isRelated method.
 *
 * @public
 */
export type RelationshipIsRelatedResponse = {
  result: boolean;
};

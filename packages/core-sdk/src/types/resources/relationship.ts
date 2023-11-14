import {QueryOptions, TxOptions} from "./helpers";

/**
 * Core type for relationship IPAsset.
 *
 * @public
 */
export type Relationship = {
  id: string
  type: string // i.e. "APPEARS_IN"
  srcContract: string
  srcTokenId: string
  srcName?: string
  dstContract: string
  dstTokenId: string
  dstName?: string
  ttl?: number // based in seconds
  createdAt: string // ISO 8601
};

/**
 * Request type for relationship.connect method.
 *
 * @public
 */
export type ConnectRelationshipRequest = {
  ipOrgId: string
  type: string
  srcContract: string
  srcTokenId: string
  dstContract: string
  dstTokenId: string
  preHookData: Array<Record<string, unknown>>,
  postHookData:Array<Record<string, unknown>>,
  txOptions?: TxOptions
};

/**
 * Response type for relationship.connect method.
 *
 * @public
 */
export type ConnectRelationshipResponse = {
  txHash: string
  success?: boolean
};


/**
 * Request type for relationship.list method.
 *
 * @public
 */
export type ListRelationshipRequest = {
  contract: string
  tokenId: string
  options?: QueryOptions
};

/**
 * Response type for relationship.list method.
 *
 * @public
 */
export type ListRelationshipResponse = {
  relationships: Relationship[]
};


/**
 * Request type for relationship.createnewtype method.
 *
 * @public
 */
export type RelationshipCreateNewTypeRequest = {
  type: string
  allowedSrcs: string[]
  allowedDsts: string[]
  preHooksConfig: Array<Record<string, unknown>>,
  postHooksConfig: Array<Record<string, unknown>>,
  txOptions?: TxOptions
};

/**
 * Response type for relationship.createnewtype method.
 *
 * @public
 */
export type RelationshipCreateNewTypeResponse = {
  txHash: string
  relationshipId?: string
};

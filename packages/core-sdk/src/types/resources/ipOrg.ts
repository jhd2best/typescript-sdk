import {QueryOptions, TxOptions} from "./helpers";

/**
 * Core data model for IPOrg.
 *
 * @public
 */
export type IPOrg = {
    id: string
    name: string
    symbol: string
    owner: string
    metadataUrl: string
    createdAt: string // ISO 8601
};

/**
 *
 *
 * @public
 */
export type IPOrgCreateRequest = {
    name: string
    symbol: string
    metadataUrl: string
    owner?: string
    txOptions?: TxOptions
};

/**
 *
 *
 * @public
 */
export type IPOrgCreateResponse = {
    txHash: string
    ipOrgId?: string
};

/**
 *
 *
 * @public
 */
export type IPOrgGetRequest = {
    ipOrgId: string
};

/**
 *
 *
 * @public
 */
export type IPOrgGetResponse = {
    ipOrg: IPOrg
};

/**
 *
 *
 * @public
 */
export type IPOrgListRequest = {
    options?: QueryOptions
};

/**
 *
 *
 * @public
 */
export type IPOrgListResponse = {
    ipOrgs: IPOrg[]
};

/**
 * Core data model for franchise.
 *
 * @public
 */
export type Franchise = {
  franchiseId: string;
  franchiseName: string;
  ownerAddress: string;
  tokenUri: string;
  txHash: string;
};

/**
 * Request type for franchise.get method.
 *
 * @public
 */
export type GetFranchiseRequest = {
  franchiseId: string;
};
/**
 * Response type for franchise.get method.
 *
 * @public
 */
export type GetFranchiseResponse = {
  data: Franchise;
};

/**
 * Request type for franchise.create method.
 *
 * @public
 */
export type CreateFranchiseRequest = {
  franchiseName: string;
  franchiseSymbol: string;
  franchiseDescription: string;
};
/**
 * Response type for franchise.create method.
 *
 * @public
 */
export type CreateFranchiseResponse = {
  txHash: string;
};

/**
 * Response type for franchise.list method.
 *
 * @public
 */
export type ListFranchiseResponse = {
  data: Franchise[];
};

/**
 * Request type for franchise.configure method.
 *
 * @public
 */
export type ConfigureFranchiseRequest = {
  franchiseId: string;
};
/**
 * Response type for franchise.configure method.
 *
 * @public
 */
export type ConfigureFranchiseResponse = {
  txHash: string;
};

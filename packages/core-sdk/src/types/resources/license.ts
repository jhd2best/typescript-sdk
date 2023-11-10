/**
 * Represents the core data model for a License, containing essential information.
 *
 * @public
 */
export type License = {
  licenseId: string;
  ipAssetId: string;
  franchiseId: string;
  ownerAddress: string;
  uri: string;
  txHash: string;
};

/**
 * Represents the request structure for retrieving license details using the `franchise.get` method.
 *
 * @public
 */
export type GetLicenseRequest = {
  licenseId: string; // Unique identifier of the license to retrieve.
};

/**
 * Represents the response structure for retrieving license details using the `license.get` method.
 *
 * @public
 */
export type GetLicenseResponse = {
  data: License;
};

export type ListLicenseRequest = {
  ipAssetId: string;
  franchiseId: string;
};

/**
 * Represents the request structure for listing multiple licenses using the `license.list` method.
 *
 * @public
 */
export type ListLicenseResponse = {
  data: License[]; // An array of licenses to be listed.
};

/**
 * Represents the optional parameters for creating a new license using the `license.create` method.
 *
 * @public
 */
export type CreateLicenseRequestOptions = {
  parentLicenseId?: string; // Identifier of the parent license, if creating a child license.
  ownerAddress?: string; // Ethereum address of the license owner. Defaults to a default owner address if not provided.
  revoker?: string; // Ethereum address of the license revoker. Defaults to the owner's address if not provided.
  isCommercial?: boolean; // Indicates whether the license is for commercial use. Defaults to `false` if not specified.
  isSublicensable?: boolean; // Indicates whether sublicensing is allowed for the license. Defaults to `false` if not specified.
  terms?: {
    processor: string; // The terms processor's name or identifier.
    data: Uint8Array | string; // Data associated with the license's terms.
  };
};

/**
 * Represents the request structure for creating a new license using the `license.create` method.
 *
 * @public
 */
export type CreateLicenseRequest = {
  franchiseId: string; // Identifier of the franchise where the license will be created.
  ipAssetId: string; // Identifier of the IP asset for which the license is being created.
  licenseURI: string; // URI (Uniform Resource Identifier) of the license's terms and conditions on Arweave.
  options?: CreateLicenseRequestOptions; // Additional options for creating the license, if needed.
};

/**
 * Represents the response structure for creating a new license using the `license.create` method.
 *
 * @public
 */
export type CreateLicenseResponse = {
  txHash: string; // Transaction hash of the license creation transaction.
};

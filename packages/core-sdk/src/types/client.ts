import { CollectClient } from "../resources/collect";
import { CollectReadOnlyClient } from "../resources/collectReadOnly";
import { FranchiseClient } from "../resources/franchise";
import { FranchiseReadOnlyClient } from "../resources/franchiseReadOnly";
import { LicenseClient } from "../resources/license";
import { LicenseReadOnlyClient } from "../resources/licenseReadOnly";
import { TransactionClient } from "../resources/transaction";
import { TransactionReadOnlyClient } from "../resources/transactionReadOnly";
import { IPAssetClient } from "../resources/ipAsset";
import { IPAssetReadOnlyClient } from "../resources/ipAssetReadOnly";
import { RelationshipClient } from "../resources/relationship";
import { RelationshipReadOnlyClient } from "../resources/relationshipReadOnly";

export interface ReadOnlyClient {
  franchise: FranchiseReadOnlyClient;
  license: LicenseReadOnlyClient;
  collect: CollectReadOnlyClient;
  transaction: TransactionReadOnlyClient;
  ipAsset: IPAssetReadOnlyClient;
  relationship: RelationshipReadOnlyClient;
}

export interface Client {
  franchise: FranchiseClient;
  license: LicenseClient;
  collect: CollectClient;
  transaction: TransactionClient;
  ipAsset: IPAssetClient;
  relationship: RelationshipClient;
}

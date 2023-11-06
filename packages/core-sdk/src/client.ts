import axios, {AxiosInstance} from "axios";
import {createPublicClient, createWalletClient, http, PublicClient, WalletClient} from 'viem'
import {mainnet} from 'viem/chains'
import * as dotenv from "dotenv";

import {StoryConfig, StoryReadOnlyConfig} from "./types/config";
import {Environment} from "./enums/Environment";
import {FranchiseClient} from "./resources/franchise";
import {FranchiseReadOnlyClient} from "./resources/franchiseReadOnly";
import {RelationshipClient} from "./resources/relationship";
import {RelationshipReadOnlyClient} from "./resources/relationshipReadOnly";
import {IPAssetClient} from "./resources/ipAsset";
import {IPAssetReadOnlyClient} from "./resources/ipAssetReadOnly";
import {LicenseClient} from "./resources/license";
import {LicenseReadOnlyClient} from "./resources/licenseReadOnly";
import {TransactionClient} from "./resources/transaction";
import {TransactionReadOnlyClient} from "./resources/transactionReadOnly";
import {CollectClient} from "./resources/collect";
import {CollectReadOnlyClient} from "./resources/collectReadOnly";
import {HTTP_TIMEOUT} from "./constants/http";
import {Client, ReadOnlyClient} from "./types/client";

if (typeof process !== "undefined") {
  dotenv.config();
}
/**
 * The StoryClient is the main entry point for the SDK.
 */
export class StoryClient {
  private readonly config: StoryConfig | StoryReadOnlyConfig;
  private readonly httpClient: AxiosInstance;
  private readonly isReadOnly: boolean = false;
  private readonly rpcClient: PublicClient;
  private readonly wallet ?: WalletClient;

  private _franchise: FranchiseClient | FranchiseReadOnlyClient | null = null;
  private _license: LicenseClient | LicenseReadOnlyClient | null = null;
  private _transaction: TransactionClient | TransactionReadOnlyClient | null = null;
  private _ipAsset: IPAssetClient | IPAssetReadOnlyClient | null = null;
  private _collect: CollectClient | CollectReadOnlyClient | null = null;
  private _relationship: RelationshipClient | RelationshipReadOnlyClient | null = null;

  /**
   * @param config - the configuration for the SDK client
   * @param isReadOnly
   */
  private constructor(config: StoryConfig | StoryReadOnlyConfig, isReadOnly: boolean = false) {
    if (config.environment !== Environment.TEST) {
      throw new Error("Invalid Environment: Only TEST environment is supported");
    }

    this.config = config;
    this.isReadOnly = isReadOnly;

    const clientConfig = {
      chain: (this.config as StoryReadOnlyConfig).chain || mainnet,
      transport: (this.config as StoryReadOnlyConfig).transport || http('https://cloudflare-eth.com')
    }
    this.rpcClient = createPublicClient(clientConfig)

    if (!isReadOnly){
      const account = (this.config as StoryConfig).account
      if (!this.wallet) throw new Error("wallet is null")

      this.wallet = createWalletClient({
        chain: mainnet,
        transport: http('https://cloudflare-eth.com'),
        account: account
      })
    } else {
      this.rpcClient = createPublicClient(clientConfig)
    }

    this.httpClient = axios.create({
      baseURL: process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: HTTP_TIMEOUT,
    });
  }

  /**
   * Factory method for creating a read only SDK client.
   *
   * @param config - the configuration for a read only SDK client
   */
  static newReadOnlyClient(config: StoryReadOnlyConfig): ReadOnlyClient {
    return new StoryClient(config, true) as ReadOnlyClient;
  }

  /**
   * Factory method for creating a SDK client with a signer.
   *
   * @param config - the configuration for a new read/write SDK client
   */
  static newClient(config: StoryConfig): Client {
    return new StoryClient(config, false) as Client;
  }

  private initFranchise(): void {
    if (this.isReadOnly) {
      this._franchise = new FranchiseReadOnlyClient(this.httpClient, this.rpcClient);
    } else {
      this._franchise = new FranchiseClient(this.httpClient, this.rpcClient, this.wallet!!);
    }
  }

  private initRelationship(): void {
    if (this.isReadOnly) {
      this._relationship = new RelationshipReadOnlyClient(this.httpClient, this.rpcClient);
    } else {
      this._relationship = new RelationshipClient(this.httpClient, this.rpcClient, this.wallet!!);
    }
  }

  private initIpAsset(): void {
    if (this.isReadOnly) {
      this._ipAsset = new IPAssetReadOnlyClient(this.httpClient, this.rpcClient);
    } else {
      this._ipAsset = new IPAssetClient(this.httpClient, this.rpcClient, this.wallet!!);
    }
  }

  private initLicense(): void {
    if (this.isReadOnly) {
      this._license = new LicenseReadOnlyClient(this.httpClient, this.rpcClient);
    } else {
      this._license = new LicenseClient(this.httpClient, this.rpcClient, this.wallet!!);
    }
  }

  private initTransaction(): void {
    if (this.isReadOnly) {
      this._transaction = new TransactionReadOnlyClient(this.httpClient, this.rpcClient);
    } else {
      this._transaction = new TransactionClient(this.httpClient, this.rpcClient, this.wallet!!);
    }
  }

  private initCollect(): void {
    if (this.isReadOnly) {
      this._collect = new CollectReadOnlyClient(this.httpClient, this.rpcClient);
    } else {
      this._collect = new CollectClient(this.httpClient, this.rpcClient, this.wallet!!);
    }
  }

  /**
   * Getter for the franchise client. The client is lazily created when
   * this method is called.
   *
   * @returns the FranchiseClient or FranchiseReadOnlyClient instance
   */
  public get franchise(): FranchiseClient | FranchiseReadOnlyClient {
    if (this._franchise === null) {
      this.initFranchise();
    }

    return this._franchise as FranchiseClient | FranchiseReadOnlyClient;
  }

  /**
   * Getter for the relationship client. The client is lazily created when
   * this method is called.
   *
   * @returns the RelationshipClient instance
   */
  public get relationship(): RelationshipClient | RelationshipReadOnlyClient {
    if (this._relationship === null) {
      this.initRelationship();
    }

    return this._relationship as RelationshipClient | RelationshipReadOnlyClient;
  }

  /**
   * Getter for the IP Asset client. The client is lazily created when
   * this method is called.
   *
   * @returns the IpAssetClient instance
   */
  public get ipAsset(): IPAssetClient | IPAssetReadOnlyClient {
    if (this._ipAsset === null) {
      this.initIpAsset();
    }
    return this._ipAsset as IPAssetClient | IPAssetReadOnlyClient;
  }

  /**
   * Getter for the license client. The client is lazily created when
   * this method is called.
   *
   * @returns the FranchiseClient instance
   */
  public get license(): LicenseClient | LicenseReadOnlyClient {
    if (this._license === null) {
      this.initLicense();
    }

    return this._license as LicenseClient | LicenseReadOnlyClient;
  }

  /**
   * Getter for the transaction client. The client is lazily created when
   * this method is called.
   *
   * @returns the TransactionClient instance
   */
  public get transaction(): TransactionClient | TransactionReadOnlyClient {
    if (this._transaction === null) {
      this.initTransaction();
    }

    return this._transaction as TransactionClient | TransactionReadOnlyClient;
  }

  /**
   * Getter for the collect module client. The client is lazily created when
   * this method is called.
   *
   * @returns the CollectClient instance
   */

  public get collect(): CollectClient | CollectReadOnlyClient {
    if (this._collect === null) {
      this.initCollect();
    }

    return this._collect as CollectClient | CollectReadOnlyClient;
  }
}

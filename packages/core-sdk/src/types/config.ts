import { Account, Chain, Transport } from "viem";

import { Environment } from "../enums/Environment";

/**
 * Configuration for the SDK Client.
 *
 * @public
 */
export interface StoryCommonConfig {
  readonly environment: Environment;
}

export interface StoryConfig extends StoryReadOnlyConfig {
  readonly account: Account;
}

export interface StoryReadOnlyConfig extends StoryCommonConfig {
  readonly chain?: Chain;
  readonly transport?: Transport;
}

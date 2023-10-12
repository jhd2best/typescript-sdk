/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace ILicensingModule {
  export type IpAssetConfigStruct = {
    canSublicense: boolean;
    franchiseRootLicenseId: BigNumberish;
  };

  export type IpAssetConfigStructOutput = [boolean, BigNumber] & {
    canSublicense: boolean;
    franchiseRootLicenseId: BigNumber;
  };

  export type FranchiseConfigStruct = {
    nonCommercialConfig: ILicensingModule.IpAssetConfigStruct;
    nonCommercialTerms: IERC5218.TermsProcessorConfigStruct;
    commercialConfig: ILicensingModule.IpAssetConfigStruct;
    commercialTerms: IERC5218.TermsProcessorConfigStruct;
    rootIpAssetHasCommercialRights: boolean;
    revoker: string;
    commercialLicenseUri: string;
  };

  export type FranchiseConfigStructOutput = [
    ILicensingModule.IpAssetConfigStructOutput,
    IERC5218.TermsProcessorConfigStructOutput,
    ILicensingModule.IpAssetConfigStructOutput,
    IERC5218.TermsProcessorConfigStructOutput,
    boolean,
    string,
    string,
  ] & {
    nonCommercialConfig: ILicensingModule.IpAssetConfigStructOutput;
    nonCommercialTerms: IERC5218.TermsProcessorConfigStructOutput;
    commercialConfig: ILicensingModule.IpAssetConfigStructOutput;
    commercialTerms: IERC5218.TermsProcessorConfigStructOutput;
    rootIpAssetHasCommercialRights: boolean;
    revoker: string;
    commercialLicenseUri: string;
  };
}

export declare namespace IERC5218 {
  export type TermsProcessorConfigStruct = {
    processor: string;
    data: BytesLike;
  };

  export type TermsProcessorConfigStructOutput = [string, string] & {
    processor: string;
    data: string;
  };
}

export interface LicensingModuleInterface extends utils.Interface {
  functions: {
    "configureFranchiseLicensing(uint256,((bool,uint256),(address,bytes),(bool,uint256),(address,bytes),bool,address,string))": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "configureFranchiseLicensing"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "configureFranchiseLicensing",
    values: [BigNumberish, ILicensingModule.FranchiseConfigStruct],
  ): string;

  decodeFunctionResult(functionFragment: "configureFranchiseLicensing", data: BytesLike): Result;

  events: {};
}

export interface LicensingModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LicensingModuleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    configureFranchiseLicensing(
      franchiseId: BigNumberish,
      config: ILicensingModule.FranchiseConfigStruct,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;
  };

  configureFranchiseLicensing(
    franchiseId: BigNumberish,
    config: ILicensingModule.FranchiseConfigStruct,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  callStatic: {
    configureFranchiseLicensing(
      franchiseId: BigNumberish,
      config: ILicensingModule.FranchiseConfigStruct,
      overrides?: CallOverrides,
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    configureFranchiseLicensing(
      franchiseId: BigNumberish,
      config: ILicensingModule.FranchiseConfigStruct,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    configureFranchiseLicensing(
      franchiseId: BigNumberish,
      config: ILicensingModule.FranchiseConfigStruct,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;
  };
}
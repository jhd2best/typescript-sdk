/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  LicensingModule,
  LicensingModuleInterface,
} from "../LicensingModule";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "franchiseId",
        type: "uint256",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "bool",
                name: "canSublicense",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "franchiseRootLicenseId",
                type: "uint256",
              },
            ],
            internalType: "struct ILicensingModule.IpAssetConfig",
            name: "nonCommercialConfig",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "contract ITermsProcessor",
                name: "processor",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            internalType: "struct IERC5218.TermsProcessorConfig",
            name: "nonCommercialTerms",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "canSublicense",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "franchiseRootLicenseId",
                type: "uint256",
              },
            ],
            internalType: "struct ILicensingModule.IpAssetConfig",
            name: "commercialConfig",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "contract ITermsProcessor",
                name: "processor",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            internalType: "struct IERC5218.TermsProcessorConfig",
            name: "commercialTerms",
            type: "tuple",
          },
          {
            internalType: "bool",
            name: "rootIpAssetHasCommercialRights",
            type: "bool",
          },
          {
            internalType: "address",
            name: "revoker",
            type: "address",
          },
          {
            internalType: "string",
            name: "commercialLicenseUri",
            type: "string",
          },
        ],
        internalType: "struct ILicensingModule.FranchiseConfig",
        name: "config",
        type: "tuple",
      },
    ],
    name: "configureFranchiseLicensing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class LicensingModule__factory {
  static readonly abi = _abi;
  static createInterface(): LicensingModuleInterface {
    return new utils.Interface(_abi) as LicensingModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LicensingModule {
    return new Contract(address, _abi, signerOrProvider) as LicensingModule;
  }
}

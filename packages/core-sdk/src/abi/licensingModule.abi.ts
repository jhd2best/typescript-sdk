import { getAddress } from "viem";

export const licensingModuleAbi = [
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

export const licensingModuleConfig = {
  abi: licensingModuleAbi,
  address: getAddress(
    process.env.LICENSING_MODULE_CONTRACT ||
      process.env.NEXT_PUBLIC_LICENSING_MODULE_CONTRACT ||
      "",
  ),
};

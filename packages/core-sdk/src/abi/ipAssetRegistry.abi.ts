import { Address } from "viem";

export const ipAssetRegistryAbi = [
  {
    inputs: [
      {
        internalType: "enum IPAsset",
        name: "ipAssetType",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "mediaUrl",
        type: "string",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "parentIpAssetId",
        type: "uint256",
      },
    ],
    name: "createIPAsset",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_parentLicenseId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_licenseHolder",
        type: "address",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
      {
        internalType: "address",
        name: "_revoker",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_commercial",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_canSublicense",
        type: "bool",
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
        name: "_terms",
        type: "tuple",
      },
    ],
    name: "createLicense",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_commercial",
        type: "bool",
      },
    ],
    name: "getLicenseIdByTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function ipAssetRegistryConfigMaker(address: Address) {
  return {
    abi: ipAssetRegistryAbi,
    address: address,
  };
}
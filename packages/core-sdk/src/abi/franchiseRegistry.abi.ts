import { getAddress, parseAbi } from "viem";
import { formatAbi } from "abitype";
import * as dotenv from "dotenv";

if (typeof process !== "undefined") {
  dotenv.config();
}

export const franchiseRegistryAbi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
        ],
        internalType: "struct FranchiseRegistry.FranchiseCreationParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "registerFranchise",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "franchiseId",
        type: "uint256",
      },
    ],
    name: "ipAssetRegistryForId",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const franchiseRegistryReadable = formatAbi(franchiseRegistryAbi);

export const franchiseRegistryConfig = {
  abi: parseAbi(franchiseRegistryReadable),
  address: getAddress(
    process.env.FRANCHISE_REGISTRY_CONTRACT ||
      process.env.NEXT_PUBLIC_FRANCHISE_REGISTRY_CONTRACT ||
      "",
  ),
};

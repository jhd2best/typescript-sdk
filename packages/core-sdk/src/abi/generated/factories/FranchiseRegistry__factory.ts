/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { FranchiseRegistry, FranchiseRegistryInterface } from "../FranchiseRegistry";

const _abi = [
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
] as const;

export class FranchiseRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): FranchiseRegistryInterface {
    return new utils.Interface(_abi) as FranchiseRegistryInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): FranchiseRegistry {
    return new Contract(address, _abi, signerOrProvider) as FranchiseRegistry;
  }
}
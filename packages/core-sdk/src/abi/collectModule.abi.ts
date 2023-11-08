import { getAddress } from "viem";

export const collectModuleAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "franchiseId", type: "uint256" },
          { internalType: "uint256", name: "ipAssetId", type: "uint256" },
          { internalType: "address", name: "collector", type: "address" },
          { internalType: "bytes", name: "collectData", type: "bytes" },
          { internalType: "bytes", name: "collectNFTInitData", type: "bytes" },
          { internalType: "bytes", name: "collectNFTData", type: "bytes" },
        ],
        internalType: "struct CollectParams",
        name: "collectParams",
        type: "tuple",
      },
    ],
    name: "collect",
    outputs: [
      { internalType: "address", name: "collectNFT", type: "address" },
      { internalType: "uint256", name: "collectNFTId", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const collectModuleConfig = {
  abi: collectModuleAbi,
  address: getAddress(
    process.env.COLLECT_MODULE_CONTRACT || process.env.NEXT_PUBLIC_COLLECT_MODULE_CONTRACT || "",
  ),
};

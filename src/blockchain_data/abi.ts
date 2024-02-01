export const ERC20ABI = [{
  "type": "event", "name": "Approval", "inputs": [{ "indexed": true, "name": "owner", "type": "address" },
  { "indexed": true, "name": "spender", "type": "address" },
  { "indexed": false, "name": "value", "type": "uint256" }]
},
{
  "type": "event", "name": "Transfer", "inputs": [{ "indexed": true, "name": "from", "type": "address" },
  { "indexed": true, "name": "to", "type": "address" },
  { "indexed": false, "name": "value", "type": "uint256" }]
},
{
  "type": "function", "name": "allowance", "stateMutability": "view",
  "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }],
  "outputs": [{ "name": "", "type": "uint256" }]
},
{
  "type": "function", "name": "approve", "stateMutability": "nonpayable",
  "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }],
  "outputs": [{ "name": "", "type": "bool" }]
},
{
  "type": "function", "name": "balanceOf", "stateMutability": "view",
  "inputs": [{ "name": "account", "type": "address" }], "outputs": [{ "name": "", "type": "uint256" }]
},
{
  "type": "function", "name": "decimals", "stateMutability": "view", "inputs": [],
  "outputs": [{ "name": "", "type": "uint8" }]
},
{
  "type": "function", "name": "name", "stateMutability": "view", "inputs": [],
  "outputs": [{ "name": "", "type": "bytes32" }]
},
{
  "type": "function", "name": "symbol", "stateMutability": "view", "inputs": [],
  "outputs": [{ "name": "", "type": "bytes32" }]
},
{
  "type": "function", "name": "totalSupply", "stateMutability": "view", "inputs": [],
  "outputs": [{ "name": "", "type": "uint256" }]
},
{
  "type": "function", "name": "transfer", "stateMutability": "nonpayable",
  "inputs": [{ "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" }],
  "outputs": [{ "name": "", "type": "bool" }]
},
{
  "type": "function", "name": "transferFrom", "stateMutability": "nonpayable",
  "inputs": [{ "name": "sender", "type": "address" }, { "name": "recipient", "type": "address" },
  { "name": "amount", "type": "uint256" }], "outputs": [{ "name": "", "type": "bool" }]
}]


export const DEXABI = [
  {
    "type": "function",
    "name": "addLiquidity",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "receiver",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "assetsIn",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amountsIn",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [
      {
        "name": "shares",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "shareAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "liquidity",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "liquidityAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "batchSwap",
    "inputs": [
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum IERC20DexModule.SwapKind"
      },
      {
        "name": "swaps",
        "type": "tuple[]",
        "internalType": "struct IERC20DexModule.BatchSwapStep[]",
        "components": [
          {
            "name": "poolId",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "assetIn",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "amountIn",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "assetOut",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "amountOut",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "userData",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      },
      {
        "name": "deadline",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "createPool",
    "inputs": [
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "assetsIn",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amountsIn",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "poolType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "options",
        "type": "tuple",
        "internalType": "struct IERC20DexModule.PoolOptions",
        "components": [
          {
            "name": "weights",
            "type": "tuple[]",
            "internalType": "struct IERC20DexModule.AssetWeight[]",
            "components": [
              {
                "name": "asset",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "weight",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "name": "swapFee",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getExchangeRate",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "baseAsset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "quoteAsset",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLiquidity",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "asset",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPoolName",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPoolOptions",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IERC20DexModule.PoolOptions",
        "components": [
          {
            "name": "weights",
            "type": "tuple[]",
            "internalType": "struct IERC20DexModule.AssetWeight[]",
            "components": [
              {
                "name": "asset",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "weight",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "name": "swapFee",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPreviewAddLiquidityNoSwap",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [
      {
        "name": "shares",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "shareAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "liqOut",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "liquidityAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPreviewAddLiquidityStaticPrice",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "liquidity",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [
      {
        "name": "shares",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "shareAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "liqOut",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "liquidityAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPreviewBatchSwap",
    "inputs": [
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum IERC20DexModule.SwapKind"
      },
      {
        "name": "swaps",
        "type": "tuple[]",
        "internalType": "struct IERC20DexModule.BatchSwapStep[]",
        "components": [
          {
            "name": "poolId",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "assetIn",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "amountIn",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "assetOut",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "amountOut",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "userData",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "outputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPreviewBurnShares",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPreviewSharesForLiquidity",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [
      {
        "name": "shares",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "shareAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "liquidity",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "liquidityAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPreviewSharesForSingleSidedLiquidityRequest",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPreviewSwapExact",
    "inputs": [
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum IERC20DexModule.SwapKind"
      },
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "baseAsset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "baseAssetAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "quoteAsset",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRemoveLiquidityExactAmountOut",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "assetIn",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "assetAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRemoveLiquidityOneSideOut",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "assetOut",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "sharesIn",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalShares",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "removeLiquidityBurningShares",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "withdrawAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "assetIn",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amountIn",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "liquidity",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "liquidityAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "removeLiquidityExactAmount",
    "inputs": [
      {
        "name": "pool",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "withdrawAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "assetOut",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amountOut",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "sharesIn",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "maxSharesIn",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "shares",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "shareAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "liquidity",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "liquidityAmounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "swap",
    "inputs": [
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum IERC20DexModule.SwapKind"
      },
      {
        "name": "poolId",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "assetIn",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amountIn",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "assetOut",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amountOut",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deadline",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "payable"
  }
]


export const WBERA_CONTRACT_ABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "allowance",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "deposit",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Deposit",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Withdrawal",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "ERC20InsufficientAllowance",
    "inputs": [
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "allowance",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "needed",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InsufficientBalance",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "balance",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "needed",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidApprover",
    "inputs": [
      {
        "name": "approver",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidReceiver",
    "inputs": [
      {
        "name": "receiver",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidSender",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidSpender",
    "inputs": [
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
]


export const HONEYABI = [
  {
    "type": "function",
    "name": "erc20Module",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IERC20BankModule"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAMOCurrentLimit",
    "inputs": [
      {
        "name": "amoType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "amoAddr",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getExchangable",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct ERC20HoneyModule.ERC20Exchangable[]",
        "components": [
          {
            "name": "collateral",
            "type": "address",
            "internalType": "contract IERC20"
          },
          {
            "name": "enabled",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "mintRate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "redemptionRate",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getTotalCollateral",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalSupply",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "honey",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IERC20"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "honeyModule",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IHoneyModule"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "collateral",
        "type": "address",
        "internalType": "contract IERC20"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "previewExactOutCollateral",
    "inputs": [
      {
        "name": "amountOut",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "assetOut",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "previewMint",
    "inputs": [
      {
        "name": "collateral",
        "type": "address",
        "internalType": "contract IERC20"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "previewRedeem",
    "inputs": [
      {
        "name": "collateral",
        "type": "address",
        "internalType": "contract IERC20"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "previewRequiredCollateral",
    "inputs": [
      {
        "name": "honeyOut",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "assetIn",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "redeem",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "collateral",
        "type": "address",
        "internalType": "contract IERC20"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateParams",
    "inputs": [
      {
        "name": "params",
        "type": "tuple[]",
        "internalType": "struct ERC20HoneyModule.ERC20Exchangable[]",
        "components": [
          {
            "name": "collateral",
            "type": "address",
            "internalType": "contract IERC20"
          },
          {
            "name": "enabled",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "mintRate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "redemptionRate",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  }
]

export const BEND_ABI = [{
  "inputs": [{ "internalType": "contract IPoolAddressesProvider", "name": "provider", "type": "address" }],
  "stateMutability": "nonpayable", "type": "constructor"
}, {
  "anonymous": false, "inputs": [
    { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
    { "indexed": true, "internalType": "address", "name": "backer", "type": "address" },
    { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "BackUnbacked",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "reserve",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "user",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "onBehalfOf",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "enum DataTypes.InterestRateMode",
    "name": "interestRateMode",
    "type": "uint8"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "borrowRate",
    "type": "uint256"
  },
  {
    "indexed": true,
    "internalType": "uint16",
    "name": "referralCode",
    "type": "uint16"
  }],
  "name": "Borrow",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" },
  { "indexed": false, "internalType": "address", "name": "initiator", "type": "address" },
  { "indexed": true, "internalType": "address", "name": "asset", "type": "address" },
  { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
  {
    "indexed": false, "internalType": "enum DataTypes.InterestRateMode",
    "name": "interestRateMode", "type": "uint8"
  },
  { "indexed": false, "internalType": "uint256", "name": "premium", "type": "uint256" },
  { "indexed": true, "internalType": "uint16", "name": "referralCode", "type": "uint16" }],
  "name": "FlashLoan", "type": "event"
}, {
  "anonymous": false, "inputs": [
    { "indexed": true, "internalType": "address", "name": "asset", "type": "address" },
    { "indexed": false, "internalType": "uint256", "name": "totalDebt", "type": "uint256" }],
  "name": "IsolationModeTotalDebtUpdated", "type": "event"
},
{
  "anonymous": false,
  "inputs": [{ "indexed": true, "internalType": "address", "name": "collateralAsset", "type": "address" },
  { "indexed": true, "internalType": "address", "name": "debtAsset", "type": "address" },
  { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
  { "indexed": false, "internalType": "uint256", "name": "debtToCover", "type": "uint256" },
  {
    "indexed": false, "internalType": "uint256", "name": "liquidatedCollateralAmount",
    "type": "uint256"
  },
  { "indexed": false, "internalType": "address", "name": "liquidator", "type": "address" },
  { "indexed": false, "internalType": "bool", "name": "receiveAToken", "type": "bool" }],
  "name": "LiquidationCall", "type": "event"
}, {
  "anonymous": false, "inputs": [
    { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
    { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
    { "indexed": true, "internalType": "address", "name": "onBehalfOf", "type": "address" },
    { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
    { "indexed": true, "internalType": "uint16", "name": "referralCode", "type": "uint16" }], "name": "MintUnbacked",
  "type": "event"
}, {
  "anonymous": false, "inputs": [
    { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
    { "indexed": false, "internalType": "uint256", "name": "amountMinted", "type": "uint256" }],
  "name": "MintedToTreasury",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "reserve",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }],
  "name": "RebalanceStableBorrowRate",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{ "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
  { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
  { "indexed": true, "internalType": "address", "name": "repayer", "type": "address" },
  { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "indexed": false, "internalType": "bool", "name": "useATokens", "type": "bool" }],
  "name": "Repay", "type": "event"
}, {
  "anonymous": false, "inputs": [
    { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
    { "indexed": false, "internalType": "uint256", "name": "liquidityRate", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "variableBorrowRate", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "liquidityIndex", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "variableBorrowIndex", "type": "uint256" }],
  "name": "ReserveDataUpdated", "type": "event"
}, {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "reserve",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }],
  "name": "ReserveUsedAsCollateralDisabled",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{ "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
  { "indexed": true, "internalType": "address", "name": "user", "type": "address" }],
  "name": "ReserveUsedAsCollateralEnabled", "type": "event"
}, {
  "anonymous": false, "inputs": [
    { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
    { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
    { "indexed": true, "internalType": "address", "name": "onBehalfOf", "type": "address" },
    { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
    { "indexed": true, "internalType": "uint16", "name": "referralCode", "type": "uint16" }], "name": "Supply",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "reserve",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "enum DataTypes.InterestRateMode",
      "name": "interestRateMode",
      "type": "uint8"
    }],
  "name": "SwapBorrowRateMode",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" },
  { "indexed": false, "internalType": "uint8", "name": "categoryId", "type": "uint8" }],
  "name": "UserEModeSet", "type": "event"
}, {
  "anonymous": false, "inputs": [
    { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
    { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
    { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
    { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw",
  "type": "event"
}, {
  "inputs": [], "name": "ADDRESSES_PROVIDER",
  "outputs": [{
    "internalType": "contract IPoolAddressesProvider",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [], "name": "BRIDGE_PROTOCOL_FEE",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [], "name": "FLASHLOAN_PREMIUM_TOTAL",
  "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [], "name": "FLASHLOAN_PREMIUM_TO_PROTOCOL",
  "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }], "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [], "name": "MAX_NUMBER_RESERVES",
  "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [], "name": "MAX_STABLE_RATE_BORROW_SIZE_PERCENT",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [], "name": "POOL_REVISION",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "backUnbacked",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" },
  { "internalType": "uint16", "name": "referralCode", "type": "uint16" },
  { "internalType": "address", "name": "onBehalfOf", "type": "address" }], "name": "borrow",
  "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }, {
    "components": [{ "internalType": "uint16", "name": "ltv", "type": "uint16" },
    { "internalType": "uint16", "name": "liquidationThreshold", "type": "uint16" },
    { "internalType": "uint16", "name": "liquidationBonus", "type": "uint16" },
    { "internalType": "address", "name": "priceSource", "type": "address" },
    { "internalType": "string", "name": "label", "type": "string" }],
    "internalType": "struct DataTypes.EModeCategory", "name": "category", "type": "tuple"
  }],
  "name": "configureEModeCategory", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "address", "name": "onBehalfOf", "type": "address" },
  { "internalType": "uint16", "name": "referralCode", "type": "uint16" }], "name": "deposit",
  "outputs": [], "stateMutability": "nonpayable", "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "dropReserve",
  "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "address", "name": "from", "type": "address" },
  { "internalType": "address", "name": "to", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "uint256", "name": "balanceFromBefore", "type": "uint256" },
  { "internalType": "uint256", "name": "balanceToBefore", "type": "uint256" }],
  "name": "finalizeTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "receiverAddress", "type": "address" },
  { "internalType": "address[]", "name": "assets", "type": "address[]" },
  { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" },
  { "internalType": "uint256[]", "name": "interestRateModes", "type": "uint256[]" },
  { "internalType": "address", "name": "onBehalfOf", "type": "address" },
  { "internalType": "bytes", "name": "params", "type": "bytes" },
  { "internalType": "uint16", "name": "referralCode", "type": "uint16" }], "name": "flashLoan",
  "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "receiverAddress", "type": "address" },
  { "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "bytes", "name": "params", "type": "bytes" },
  { "internalType": "uint16", "name": "referralCode", "type": "uint16" }],
  "name": "flashLoanSimple", "outputs": [], "stateMutability": "nonpayable", "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getConfiguration",
  "outputs": [{
    "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }],
    "internalType": "struct DataTypes.ReserveConfigurationMap", "name": "", "type": "tuple"
  }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }], "name": "getEModeCategoryData",
  "outputs": [{
    "components": [{ "internalType": "uint16", "name": "ltv", "type": "uint16" },
    { "internalType": "uint16", "name": "liquidationThreshold", "type": "uint16" },
    { "internalType": "uint16", "name": "liquidationBonus", "type": "uint16" },
    { "internalType": "address", "name": "priceSource", "type": "address" },
    { "internalType": "string", "name": "label", "type": "string" }],
    "internalType": "struct DataTypes.EModeCategory", "name": "", "type": "tuple"
  }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [{ "internalType": "uint16", "name": "id", "type": "uint16" }], "name": "getReserveAddressById",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getReserveData",
  "outputs": [{
    "components": [
      {
        "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }],
        "internalType": "struct DataTypes.ReserveConfigurationMap", "name": "configuration", "type": "tuple"
      },
      { "internalType": "uint128", "name": "liquidityIndex", "type": "uint128" },
      { "internalType": "uint128", "name": "currentLiquidityRate", "type": "uint128" },
      { "internalType": "uint128", "name": "variableBorrowIndex", "type": "uint128" },
      { "internalType": "uint128", "name": "currentVariableBorrowRate", "type": "uint128" },
      { "internalType": "uint128", "name": "currentStableBorrowRate", "type": "uint128" },
      { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" },
      { "internalType": "uint16", "name": "id", "type": "uint16" },
      { "internalType": "address", "name": "aTokenAddress", "type": "address" },
      { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" },
      { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" },
      { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" },
      { "internalType": "uint128", "name": "accruedToTreasury", "type": "uint128" },
      { "internalType": "uint128", "name": "unbacked", "type": "uint128" },
      { "internalType": "uint128", "name": "isolationModeTotalDebt", "type": "uint128" }],
    "internalType": "struct DataTypes.ReserveData", "name": "", "type": "tuple"
  }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
  "name": "getReserveNormalizedIncome",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
  "name": "getReserveNormalizedVariableDebt",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [], "name": "getReservesList",
  "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getUserAccountData",
  "outputs": [{ "internalType": "uint256", "name": "totalCollateralBase", "type": "uint256" },
  { "internalType": "uint256", "name": "totalDebtBase", "type": "uint256" },
  { "internalType": "uint256", "name": "availableBorrowsBase", "type": "uint256" },
  { "internalType": "uint256", "name": "currentLiquidationThreshold", "type": "uint256" },
  { "internalType": "uint256", "name": "ltv", "type": "uint256" },
  { "internalType": "uint256", "name": "healthFactor", "type": "uint256" }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getUserConfiguration",
  "outputs": [{
    "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }],
    "internalType": "struct DataTypes.UserConfigurationMap", "name": "", "type": "tuple"
  }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getUserEMode",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "address", "name": "aTokenAddress", "type": "address" },
  {
    "internalType": "address", "name": "stableDebtAddress",
    "type": "address"
  },
  {
    "internalType": "address", "name": "variableDebtAddress",
    "type": "address"
  },
  {
    "internalType": "address", "name": "interestRateStrategyAddress",
    "type": "address"
  }], "name": "initReserve", "outputs": [],
  "stateMutability": "nonpayable", "type": "function"
},
{
  "inputs": [{ "internalType": "contract IPoolAddressesProvider", "name": "provider", "type": "address" }],
  "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "collateralAsset", "type": "address" },
  { "internalType": "address", "name": "debtAsset", "type": "address" },
  { "internalType": "address", "name": "user", "type": "address" },
  { "internalType": "uint256", "name": "debtToCover", "type": "uint256" },
  { "internalType": "bool", "name": "receiveAToken", "type": "bool" }],
  "name": "liquidationCall", "outputs": [], "stateMutability": "nonpayable", "type": "function"
},
{
  "inputs": [{ "internalType": "address[]", "name": "assets", "type": "address[]" }], "name": "mintToTreasury",
  "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "address", "name": "onBehalfOf", "type": "address" },
  { "internalType": "uint16", "name": "referralCode", "type": "uint16" }],
  "name": "mintUnbacked", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "address", "name": "user", "type": "address" }],
  "name": "rebalanceStableBorrowRate", "outputs": [], "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  {
    "internalType": "uint256", "name": "interestRateMode",
    "type": "uint256"
  },
  { "internalType": "address", "name": "onBehalfOf", "type": "address" }],
  "name": "repay",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" }],
  "name": "repayWithATokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" },
  { "internalType": "address", "name": "onBehalfOf", "type": "address" },
  { "internalType": "uint256", "name": "deadline", "type": "uint256" },
  { "internalType": "uint8", "name": "permitV", "type": "uint8" },
  { "internalType": "bytes32", "name": "permitR", "type": "bytes32" },
  { "internalType": "bytes32", "name": "permitS", "type": "bytes32" }],
  "name": "repayWithPermit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "token", "type": "address" },
  { "internalType": "address", "name": "to", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "rescueTokens",
  "outputs": [], "stateMutability": "nonpayable", "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
  "name": "resetIsolationModeTotalDebt", "outputs": [], "stateMutability": "nonpayable", "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  {
    "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }],
    "internalType": "struct DataTypes.ReserveConfigurationMap", "name": "configuration",
    "type": "tuple"
  }], "name": "setConfiguration", "outputs": [], "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  {
    "internalType": "address", "name": "rateStrategyAddress",
    "type": "address"
  }], "name": "setReserveInterestRateStrategyAddress",
  "outputs": [], "stateMutability": "nonpayable", "type": "function"
},
{
  "inputs": [{ "internalType": "uint8", "name": "categoryId", "type": "uint8" }], "name": "setUserEMode",
  "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "bool", "name": "useAsCollateral", "type": "bool" }],
  "name": "setUserUseReserveAsCollateral", "outputs": [], "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "address", "name": "onBehalfOf", "type": "address" },
  { "internalType": "uint16", "name": "referralCode", "type": "uint16" }],
  "name": "supply", "outputs": [], "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "address", "name": "onBehalfOf", "type": "address" },
  { "internalType": "uint16", "name": "referralCode", "type": "uint16" },
  { "internalType": "uint256", "name": "deadline", "type": "uint256" },
  { "internalType": "uint8", "name": "permitV", "type": "uint8" },
  { "internalType": "bytes32", "name": "permitR", "type": "bytes32" },
  { "internalType": "bytes32", "name": "permitS", "type": "bytes32" }],
  "name": "supplyWithPermit", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" }],
  "name": "swapBorrowRateMode", "outputs": [], "stateMutability": "nonpayable", "type": "function"
},
{
  "inputs": [{ "internalType": "uint256", "name": "protocolFee", "type": "uint256" }],
  "name": "updateBridgeProtocolFee", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{ "internalType": "uint128", "name": "flashLoanPremiumTotal", "type": "uint128" },
  { "internalType": "uint128", "name": "flashLoanPremiumToProtocol", "type": "uint128" }],
  "name": "updateFlashloanPremiums", "outputs": [], "stateMutability": "nonpayable", "type": "function"
},
{
  "inputs": [{ "internalType": "address", "name": "asset", "type": "address" },
  { "internalType": "uint256", "name": "amount", "type": "uint256" },
  { "internalType": "address", "name": "to", "type": "address" }], "name": "withdraw",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable",
  "type": "function"
}]

export const BEND_BORROW_ABI = [{
  "inputs": [
    {
      "internalType": "contract IEACAggregatorProxy", "name": "_networkBaseTokenPriceInUsdProxyAggregator",
      "type": "address"
    },
    {
      "internalType": "contract IEACAggregatorProxy", "name": "_marketReferenceCurrencyPriceInUsdProxyAggregator",
      "type": "address"
    }], "stateMutability": "nonpayable", "type": "constructor"
},
{
  "inputs": [], "name": "ETH_CURRENCY_UNIT",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [], "name": "MKR_ADDRESS",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [{ "internalType": "bytes32", "name": "_bytes32", "type": "bytes32" }],
  "name": "bytes32ToString", "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
  "stateMutability": "pure", "type": "function"
}, {
  "inputs": [
    { "internalType": "contract IPoolAddressesProvider", "name": "provider", "type": "address" }],
  "name": "getReservesData", "outputs": [{
    "components": [
      {
        "internalType": "address",
        "name": "underlyingAsset",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "decimals",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "baseLTVasCollateral",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveLiquidationThreshold",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveLiquidationBonus",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveFactor",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "usageAsCollateralEnabled",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "borrowingEnabled",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "stableBorrowRateEnabled",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isFrozen",
        "type": "bool"
      },
      {
        "internalType": "uint128",
        "name": "liquidityIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "variableBorrowIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "liquidityRate",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "variableBorrowRate",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "stableBorrowRate",
        "type": "uint128"
      },
      {
        "internalType": "uint40",
        "name": "lastUpdateTimestamp",
        "type": "uint40"
      },
      {
        "internalType": "address",
        "name": "aTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "stableDebtTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "variableDebtTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "interestRateStrategyAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "availableLiquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalPrincipalStableDebt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "averageStableRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stableDebtLastUpdateTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalScaledVariableDebt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceInMarketReferenceCurrency",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "priceOracle",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "variableRateSlope1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "variableRateSlope2",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stableRateSlope1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stableRateSlope2",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "baseStableBorrowRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "baseVariableBorrowRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "optimalUsageRatio",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isPaused",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isSiloedBorrowing",
        "type": "bool"
      },
      {
        "internalType": "uint128",
        "name": "accruedToTreasury",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "unbacked",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "isolationModeTotalDebt",
        "type": "uint128"
      },
      {
        "internalType": "bool",
        "name": "flashLoanEnabled",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "debtCeiling",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "debtCeilingDecimals",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "eModeCategoryId",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "borrowCap",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "supplyCap",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "eModeLtv",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "eModeLiquidationThreshold",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "eModeLiquidationBonus",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "eModePriceSource",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "eModeLabel",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "borrowableInIsolation",
        "type": "bool"
      }],
    "internalType": "struct IUiPoolDataProviderV3.AggregatedReserveData[]",
    "name": "",
    "type": "tuple[]"
  },
  {
    "components": [
      {
        "internalType": "uint256",
        "name": "marketReferenceCurrencyUnit",
        "type": "uint256"
      },
      {
        "internalType": "int256",
        "name": "marketReferenceCurrencyPriceInUsd",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "networkBaseTokenPriceInUsd",
        "type": "int256"
      },
      {
        "internalType": "uint8",
        "name": "networkBaseTokenPriceDecimals",
        "type": "uint8"
      }],
    "internalType": "struct IUiPoolDataProviderV3.BaseCurrencyInfo",
    "name": "",
    "type": "tuple"
  }],
  "stateMutability": "view", "type": "function"
}, {
  "inputs": [
    { "internalType": "contract IPoolAddressesProvider", "name": "provider", "type": "address" }],
  "name": "getReservesList",
  "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
  "stateMutability": "view", "type": "function"
}, {
  "inputs": [
    { "internalType": "contract IPoolAddressesProvider", "name": "provider", "type": "address" },
    { "internalType": "address", "name": "user", "type": "address" }], "name": "getUserReservesData", "outputs": [{
      "components": [
        {
          "internalType": "address",
          "name": "underlyingAsset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "scaledATokenBalance",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "usageAsCollateralEnabledOnUser",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "stableBorrowRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "scaledVariableDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "principalStableDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stableBorrowLastUpdateTimestamp",
          "type": "uint256"
        }],
      "internalType": "struct IUiPoolDataProviderV3.UserReserveData[]",
      "name": "",
      "type": "tuple[]"
    },
    {
      "internalType": "uint8",
      "name": "",
      "type": "uint8"
    }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [], "name": "marketReferenceCurrencyPriceInUsdProxyAggregator",
  "outputs": [{ "internalType": "contract IEACAggregatorProxy", "name": "", "type": "address" }],
  "stateMutability": "view", "type": "function"
},
{
  "inputs": [], "name": "networkBaseTokenPriceInUsdProxyAggregator",
  "outputs": [{ "internalType": "contract IEACAggregatorProxy", "name": "", "type": "address" }],
  "stateMutability": "view", "type": "function"
}]


export const HONEYJAR_ABI = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "allowlist_",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "name_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol_",
        "type": "string"
      },
      {
        "internalType": "contract IERC20",
        "name": "paymentToken_",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "native",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "erc20",
            "type": "uint256"
          }
        ],
        "internalType": "struct Ticket.MintCost",
        "name": "mintCost_",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AccountBalanceOverflow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyClaimed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BalanceQueryForZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidProof",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotOwnerNorApproved",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TokenAlreadyExists",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TokenDoesNotExist",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFromIncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferToNonERC721ReceiverImplementer",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "URIQueryForNonexistentToken",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isApproved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "BaseURISet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "root",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "Claimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "generated",
        "type": "bool"
      }
    ],
    "name": "SetGenerated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "allowlist",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "result",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index_",
        "type": "uint256"
      },
      {
        "internalType": "bytes32[]",
        "name": "proof_",
        "type": "bytes32[]"
      }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index_",
        "type": "uint256"
      }
    ],
    "name": "claimed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "result",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasMinted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "result",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isGenerated",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintCost",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "native",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "erc20",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "result",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paymentToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "realOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "allowlist_",
        "type": "bytes32"
      }
    ],
    "name": "setAllowList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isApproved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "baseURI_",
        "type": "string"
      }
    ],
    "name": "setBaseURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "claimAmount_",
        "type": "uint256"
      }
    ],
    "name": "setClaimAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "generated_",
        "type": "bool"
      }
    ],
    "name": "setGenerated",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "native",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "erc20",
            "type": "uint256"
          }
        ],
        "internalType": "struct Ticket.MintCost",
        "name": "mintCost_",
        "type": "tuple"
      }
    ],
    "name": "setMintCost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "paymentToken_",
        "type": "address"
      }
    ],
    "name": "setPaymentToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "result",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferLowerOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newRealOwner",
        "type": "address"
      }
    ],
    "name": "transferRealOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]


export const CONTRACT_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "guy",
        "type": "address"
      },
      {
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "src",
        "type": "address"
      },
      {
        "name": "dst",
        "type": "address"
      },
      {
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "dst",
        "type": "address"
      },
      {
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "src",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "guy",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "src",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "dst",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "dst",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "src",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  }
]


export const CONTRACT_BYTECODE = "60806040526040805190810160405280600d81526020017f57726170706564204574686572000000000000000000000000000000000000008152506000908051906020019061004f9291906100ca565b506040805190810160405280600481526020017f57455448000000000000000000000000000000000000000000000000000000008152506001908051906020019061009b9291906100ca565b506012600260006101000a81548160ff021916908360ff1602179055503480156100c457600080fd5b5061016f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061010b57805160ff1916838001178555610139565b82800160010185558215610139579182015b8281111561013857825182559160200191906001019061011d565b5b509050610146919061014a565b5090565b61016c91905b80821115610168576000816000905550600101610150565b5090565b90565b610c848061017e6000396000f3006080604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014957806318160ddd146101ae57806323b872dd146101d95780632e1a7d4d1461025e578063313ce5671461028b57806370a08231146102bc57806395d89b4114610313578063a9059cbb146103a3578063d0e30db014610408578063dd62ed3e14610412575b6100b7610489565b005b3480156100c557600080fd5b506100ce610526565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010e5780820151818401526020810190506100f3565b50505050905090810190601f16801561013b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561015557600080fd5b50610194600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105c4565b604051808215151515815260200191505060405180910390f35b3480156101ba57600080fd5b506101c36106b6565b6040518082815260200191505060405180910390f35b3480156101e557600080fd5b50610244600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106d5565b604051808215151515815260200191505060405180910390f35b34801561026a57600080fd5b5061028960048036038101908080359060200190929190505050610a22565b005b34801561029757600080fd5b506102a0610b55565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102c857600080fd5b506102fd600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b68565b6040518082815260200191505060405180910390f35b34801561031f57600080fd5b50610328610b80565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561036857808201518184015260208101905061034d565b50505050905090810190601f1680156103955780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103af57600080fd5b506103ee600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c1e565b604051808215151515815260200191505060405180910390f35b610410610489565b005b34801561041e57600080fd5b50610473600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c33565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105bc5780601f10610591576101008083540402835291602001916105bc565b820191906000526020600020905b81548152906001019060200180831161059f57829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561072557600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107fd57507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156109185781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561088d57600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a7057600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610b03573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c165780601f10610beb57610100808354040283529160200191610c16565b820191906000526020600020905b815481529060010190602001808311610bf957829003601f168201915b505050505081565b6000610c2b3384846106d5565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820131410de293147c54494a6e955dca0ed6588f058e5bce573abd3e80d21ef47610029"
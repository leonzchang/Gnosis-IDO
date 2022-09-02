import dotenv from 'dotenv'
dotenv.config()

// account
export const ACCOUNT_1 = process.env.ACCOUNT_1!
export const ACCOUNT_2 = process.env.ACCOUNT_2!
export const ACCOUNT_3 = process.env.ACCOUNT_3!
export const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1!
export const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2!
export const PRIVATE_KEY_3 = process.env.PRIVATE_KEY_3!

// rpc url
export const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL!
export const BINAINCE_TESTNET_RPC_URL = process.env.BINAINCE_TESTNET_RPC_URL!

// gnosis safe contract address(bsc testnet)
// https://github.com/gnosis/safe-contracts/blob/main/CHANGELOG.md
export const MULTI_SEND_ADDRESS = process.env.MULTI_SEND_ADDRESS!
export const SAFE_MASTER_COPY_ADDRESS = process.env.SAFE_MASTER_COPY_ADDRESS!
export const SAFE_PROXY_FACTORY_ADDRESS = process.env.SAFE_PROXY_FACTORY_ADDRESS!

// pancakeswap contract address(bsc testnet)
export const PANCAKE_ROUTER_ADDRESS = process.env.PANCAKE_ROUTER_ADDRESS!

// gnosis safe address
export const BSCT_SAFE_ADDRESS = process.env.BSCT_SAFE_ADDRESS!
export const RINKEBY_SAFE_ADDRESS = process.env.RINKEBY_SAFE_ADDRESS!

// token contract address(bsc testnet)
export const Token_1_ADDRESS = process.env.Token_1_ADDRESS!
export const Token_2_ADDRESS = process.env.Token_2_ADDRESS!

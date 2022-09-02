import {
  BSCT_SAFE_ADDRESS,
  PANCAKE_ROUTER_ADDRESS,
  Token_1_ADDRESS,
  Token_2_ADDRESS,
} from '../constant'
import { approve } from '../pancakeswap/approve'

async function safeApprovePancakeRouter() {
  // spender, from, erc20 address
  await approve(PANCAKE_ROUTER_ADDRESS, BSCT_SAFE_ADDRESS, Token_1_ADDRESS)
  await approve(PANCAKE_ROUTER_ADDRESS, BSCT_SAFE_ADDRESS, Token_2_ADDRESS)

  console.log('pancakeswapRouter is approved by safe.')
}

safeApprovePancakeRouter().catch(console.error)

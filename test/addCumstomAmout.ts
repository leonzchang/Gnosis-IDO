import { Contract, ethers, utils } from 'ethers'

import {
  ACCOUNT_1,
  BINAINCE_TESTNET_RPC_URL,
  PANCAKE_ROUTER_ADDRESS,
  PRIVATE_KEY_1,
} from '../src/constant'

// rpc
const _RPC_PROVIDER = {
  network: {
    name: 'BINAINCE_TESTNET',
    rpc: BINAINCE_TESTNET_RPC_URL,
    chainId: 97,
  },
}

//smart contract ABI
const ABI = [
  'function addLiquidity(address, address, uint256, uint256, uint256, uint256, address, uint256)',
]

// pancakeRouter contract addLiquidity function hash
const _addLiquidityFunctionHash = '0xe8e33700'

async function sentCustomAmout() {
  const provider = await new ethers.providers.JsonRpcProvider(BINAINCE_TESTNET_RPC_URL)
  const signer = new ethers.Wallet(PRIVATE_KEY_1, provider)
  const contract = new Contract(PANCAKE_ROUTER_ADDRESS, ABI, signer)

  // interact with contract function
  const aTokenAddress = '0x56127b3DA351e4c6168254fD8166195027BD1102'
  const bTokenAddress = '0x1c6250Ed4FE3a060E32a5Ba9c81A1a2ca9769BcD'
  // 1 unit
  const amountA = '1.0'
  const amountB = '2.0'
  const time = Math.floor(Date.now() / 1000) + 60 * 10
  await contract.functions['addLiquidity'](
    aTokenAddress,
    bTokenAddress,
    utils.parseEther(amountA),
    utils.parseEther(amountB),
    utils.parseEther('0.0'),
    utils.parseEther('0.0'),
    ACCOUNT_1,
    time
  )
}

sentCustomAmout().catch(console.error)

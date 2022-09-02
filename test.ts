import { ethers } from 'ethers'
const BINAINCE_TESTNET_RPC_URL = 'http://localhost:9933'
// rpc
const _RPC_PROVIDER = {
  network: {
    name: 'BINAINCE_TESTNET',
    rpc: BINAINCE_TESTNET_RPC_URL,
    chainId: 97,
  },
}

//smart contract ABI
const _ABI = [
  'function addLiquidity(address,address, uint256, uint256, uint256, uint256, address, uint256)',
]

// pancakeRouter contract addLiquidity function hash
const _addLiquidityFunctionHash = '0xe8e33700'

async function sentCustomAmout() {
  const provider = await new ethers.providers.JsonRpcProvider(BINAINCE_TESTNET_RPC_URL)
  const signer = new ethers.Wallet(
    '9f9dc57639b5c9970eb57c26417064f695e907bddae56d46f8b9f4d42bb87f80',
    provider
  )

  console.log(await signer.getFeeData())
}

sentCustomAmout().catch(console.error)

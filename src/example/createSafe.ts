import { ACCOUNT_1, ACCOUNT_2, BINAINCE_TESTNET_RPC_URL, PRIVATE_KEY_1 } from '../constant'
import { createNewSafe, getEthAdapter } from '../tx-core'

// bsct create safe
async function main() {
  console.log('start...')

  // settting safe intial configuration
  const safeOwners = [ACCOUNT_1, ACCOUNT_2]
  const threshold = 2
  const isEthereum = false
  const ethAdapter_account_1 = await getEthAdapter(PRIVATE_KEY_1, BINAINCE_TESTNET_RPC_URL)

  // create new safe
  await createNewSafe(ethAdapter_account_1, safeOwners, threshold, isEthereum)
  console.log('safe created.')

  console.log('done.')
}

main().catch(console.error)

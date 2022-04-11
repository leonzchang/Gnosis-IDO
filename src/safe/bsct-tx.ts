import {
  ACCOUNT_3,
  BINAINCE_TESTNET_RPC_URL,
  BSCT_SAFE_ADDRESS,
  PRIVATE_KEY_1,
  PRIVATE_KEY_2,
} from '../constant';
import {
  approveTransaction,
  createSafeSdk,
  createSafeTransferTransaction,
  executeTransaction,
  getEthAdapter,
} from '../tx-core';

// bsct safe transfer
async function main() {
  console.log('start...');

  // settting connected chain configuration
  const isEthereum = false;

  // create adapter
  const ethAdapter_account_1 = await getEthAdapter(PRIVATE_KEY_1, BINAINCE_TESTNET_RPC_URL);
  const ethAdapter_account_2 = await getEthAdapter(PRIVATE_KEY_2, BINAINCE_TESTNET_RPC_URL);

  // 1 token = 1000000000000000000 wei
  const token_unit = '1000000000000000000';

  // create transaction
  const safeSdk_account_1 = await createSafeSdk(
    ethAdapter_account_1,
    BSCT_SAFE_ADDRESS,
    isEthereum
  );
  const { txHash, safeTransaction } = await createSafeTransferTransaction(
    safeSdk_account_1,
    ACCOUNT_3,
    token_unit
  );
  console.log('transaction');

  // approve transaction
  const safeSdk_account_2 = await createSafeSdk(
    ethAdapter_account_2,
    BSCT_SAFE_ADDRESS,
    isEthereum
  );
  await approveTransaction(safeSdk_account_2, txHash);

  console.log('approve');

  // execute transaction
  await executeTransaction(safeSdk_account_1, safeTransaction);
  console.log('execute');

  console.log('done.');
}

main().catch(console.error);

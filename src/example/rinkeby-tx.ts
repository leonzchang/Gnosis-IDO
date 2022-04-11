import {
  ACCOUNT_3,
  PRIVATE_KEY_1,
  PRIVATE_KEY_2,
  PRIVATE_KEY_3,
  RINKEBY_RPC_URL,
  RINKEBY_SAFE_ADDRESS,
} from '../constant';
import {
  approveTransaction,
  createSafeSdk,
  createSafeTransferTransaction,
  executeTransaction,
  getEthAdapter,
} from '../tx-core';

// rinkeby safe transfer
async function main() {
  console.log('start...');

  // settting connected chain configuration
  const isEthereum = true;

  // create adapter
  const ethAdapter_account_1 = await getEthAdapter(PRIVATE_KEY_1, RINKEBY_RPC_URL);
  const ethAdapter_account_2 = await getEthAdapter(PRIVATE_KEY_2, RINKEBY_RPC_URL);
  const ethAdapter_account_3 = await getEthAdapter(PRIVATE_KEY_3, RINKEBY_RPC_URL);

  // 1 token = 1000000000000000000 wei
  const token_unit = '1000000000000000000';

  // create transaction
  const safeSdk_account_1 = await createSafeSdk(
    ethAdapter_account_1,
    RINKEBY_SAFE_ADDRESS,
    isEthereum
  );
  const { txHash, safeTransaction } = await createSafeTransferTransaction(
    safeSdk_account_1,
    ACCOUNT_3,
    token_unit
  );
  console.log('transaction');

  // approve transaction, threshold 3
  const safeSdk_account_2 = await createSafeSdk(
    ethAdapter_account_2,
    RINKEBY_SAFE_ADDRESS,
    isEthereum
  );
  await approveTransaction(safeSdk_account_2, txHash);

  const safeSdk_account_3 = await createSafeSdk(
    ethAdapter_account_3,
    RINKEBY_SAFE_ADDRESS,
    isEthereum
  );
  await approveTransaction(safeSdk_account_3, txHash);

  console.log('approve');

  // execute transaction
  await executeTransaction(safeSdk_account_1, safeTransaction);
  console.log('execute');

  console.log('done.');
}

main().catch(console.error);

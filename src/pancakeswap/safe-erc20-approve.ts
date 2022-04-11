import {
  BINAINCE_TESTNET_RPC_URL,
  BSCT_SAFE_ADDRESS,
  PANCAKE_ROUTER_ADDRESS,
  PRIVATE_KEY_1,
  PRIVATE_KEY_2,
  Token_1_ADDRESS,
  Token_2_ADDRESS,
} from '../constant';
import {
  approveTransaction,
  createSafeSdk,
  createSafeTransferTransaction,
  executeTransaction,
  getEthAdapter,
} from '../tx-core';
import { input2TxFormat } from './helper';

/** erc20 approve
 * function approve(address spender, uint256 amount) public virtual override returns (bool) {
 *   address owner = _msgSender();
 *   _approve(owner, spender, amount);
 *   return true;
 * }
 **/

async function approve(pancakeswapRouter: string, safe: string, tokenAddress: string) {
  // settting connected chain configuration
  const isEthereum = false;

  // erc20 contract approve function hash
  const approveFunctionHash = '0x095ea7b3';
  // erc20 contract approve input parameter
  const rawAmount = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  const spender = input2TxFormat(pancakeswapRouter);

  // create adapter, safe owner
  const ethAdapter_account_1 = await getEthAdapter(PRIVATE_KEY_1, BINAINCE_TESTNET_RPC_URL);
  const ethAdapter_account_2 = await getEthAdapter(PRIVATE_KEY_2, BINAINCE_TESTNET_RPC_URL);

  // create transaction.
  const safeSdk_account_1 = await createSafeSdk(ethAdapter_account_1, safe, isEthereum);
  // (internal call) safe call erc20 contract approve pancakeswapRouter contract
  const data = `${approveFunctionHash}${spender}${rawAmount}`;
  const { txHash, safeTransaction } = await createSafeTransferTransaction(
    safeSdk_account_1,
    tokenAddress,
    '0',
    data
  );

  // approve transaction
  const safeSdk_account_2 = await createSafeSdk(ethAdapter_account_2, safe, isEthereum);
  await approveTransaction(safeSdk_account_2, txHash);

  // execute transaction
  await executeTransaction(safeSdk_account_1, safeTransaction);
}

async function safeApprovePancakeRouter() {
  // spender, from, erc20 address
  await approve(PANCAKE_ROUTER_ADDRESS, BSCT_SAFE_ADDRESS, Token_1_ADDRESS);
  await approve(PANCAKE_ROUTER_ADDRESS, BSCT_SAFE_ADDRESS, Token_2_ADDRESS);

  console.log('pancakeswapRouter is approved by safe.');
}

safeApprovePancakeRouter().catch(console.error);

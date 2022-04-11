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
import { decimal2Hex, input2TxFormat } from './helper';

/** PancakeRouter addLiquidity
 * function addLiquidity(
 *   address tokenA,
 *   address tokenB,
 *   uint amountADesired,
 *   uint amountBDesired,
 *   uint amountAMin,
 *   uint amountBMin,
 *   address to,
 *   uint deadline
 * ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
 *   (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
 *   address pair = PancakeLibrary.pairFor(factory, tokenA, tokenB);
 *   TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
 *   TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
 *   liquidity = IPancakePair(pair).mint(to);
 * }
 **/

async function addLiquidity(
  tokenA: string,
  tokenB: string,
  tokenADesired: number,
  tokenBDesired: number,
  tokenAMin: number,
  tokenBMin: number,
  safe: string
) {
  // settting connected chain configuration
  const isEthereum = false;

  // pancakeRouter contract addLiquidity function hash
  const addLiquidityFunctionHash = '0xe8e33700';

  // using gnosis safe to create a transaction with caling createPair in data
  const token1 = input2TxFormat(tokenA);
  const token2 = input2TxFormat(tokenB);
  const amountADesired = decimal2Hex(tokenADesired);
  const amountBDesired = decimal2Hex(tokenBDesired);
  const amountAMin = decimal2Hex(tokenAMin);
  const amountBMin = decimal2Hex(tokenBMin);
  const to = input2TxFormat(safe);
  const time = (Math.floor(Date.now() / 1000) + 60 * 10).toString(16);
  const deadline = input2TxFormat(time);

  // create adapter
  const ethAdapter_account_1 = await getEthAdapter(PRIVATE_KEY_1, BINAINCE_TESTNET_RPC_URL);
  const ethAdapter_account_2 = await getEthAdapter(PRIVATE_KEY_2, BINAINCE_TESTNET_RPC_URL);

  // create transaction
  const safeSdk_account_1 = await createSafeSdk(ethAdapter_account_1, safe, isEthereum);
  // (internal call) pancakeswapRouter contract call erc20 contract transferFrom safe
  const data = `${addLiquidityFunctionHash}${token1}${token2}${amountADesired}${amountBDesired}${amountAMin}${amountBMin}${to}${deadline}`;
  const { txHash, safeTransaction } = await createSafeTransferTransaction(
    safeSdk_account_1,
    PANCAKE_ROUTER_ADDRESS,
    '0',
    data
  );

  console.log('transaction');
  // approve transaction
  const safeSdk_account_2 = await createSafeSdk(ethAdapter_account_2, safe, isEthereum);
  await approveTransaction(safeSdk_account_2, txHash);

  console.log('approve');

  // execute transaction
  await executeTransaction(safeSdk_account_1, safeTransaction);
  console.log('execute');

  console.log('done.');
}

addLiquidity(Token_1_ADDRESS, Token_2_ADDRESS, 100, 100, 100, 100, BSCT_SAFE_ADDRESS).catch(
  console.error
);

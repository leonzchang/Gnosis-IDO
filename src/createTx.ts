import { ethers } from 'ethers';

import {
  ACCOUNT_1,
  BINAINCE_TESTNET_RPC_URL,
  BSCT_SAFE_ADDRESS,
  PRIVATE_KEY_2,
  Token_2_ADDRESS,
} from './constant';

/** erc20 transferFrom
 * function transferFrom(
 *   address from,
 *   address to,
 *   uint256 amount
 *   ) public virtual override returns (bool) {
 *   address spender = _msgSender();
 *   _spendAllowance(from, spender, amount);
 *   _transfer(from, to, amount);
 *   return true;
 * }
 **/

// contract ABI
const erc20ABI = [
  'function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool)',
];

// test erc20 approve transferFrom
async function sendTx() {
  const provider = new ethers.providers.JsonRpcProvider(BINAINCE_TESTNET_RPC_URL);
  //spender
  const signer = new ethers.Wallet(PRIVATE_KEY_2, provider);
  // 1 token = 1000000000000000000 wei
  const token_unit = '1000000000000000000';

  const contract = new ethers.Contract(Token_2_ADDRESS, erc20ABI, signer);
  const tx = await contract.functions['transferFrom'](BSCT_SAFE_ADDRESS, ACCOUNT_1, token_unit);

  console.log('done.');
}

sendTx().catch(console.error);

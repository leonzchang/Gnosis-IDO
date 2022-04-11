import Safe, {
  ContractNetworksConfig,
  SafeAccountConfig,
  SafeFactory,
} from '@gnosis.pm/safe-core-sdk';
import { SafeTransaction, SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import { ethers, Wallet } from 'ethers';
import fs from 'fs';

import {
  MULTI_SEND_ADDRESS,
  SAFE_MASTER_COPY_ADDRESS,
  SAFE_PROXY_FACTORY_ADDRESS,
} from './constant';

export async function configNetworkContract(ethAdapter: EthersAdapter) {
  const id = await ethAdapter.getChainId();
  // https://github.com/gnosis/safe-contracts/blob/main/CHANGELOG.md
  const contractNetworks: ContractNetworksConfig = {
    [id]: {
      multiSendAddress: MULTI_SEND_ADDRESS,
      safeMasterCopyAddress: SAFE_MASTER_COPY_ADDRESS,
      safeProxyFactoryAddress: SAFE_PROXY_FACTORY_ADDRESS,
    },
  };
  return contractNetworks;
}

export async function getEthAdapter(private_key: string, rpcurl: string) {
  const provider = await new ethers.providers.JsonRpcProvider(rpcurl);
  const signer = new Wallet(private_key, provider);
  const ethAdapter_owner = new EthersAdapter({ ethers, signer });

  return ethAdapter_owner;
}

export async function createNewSafe(
  ethAdapter: EthersAdapter,
  owners: string[],
  threshold: number,
  isEthereum = true
) {
  let safeFactory: SafeFactory;
  if (isEthereum) {
    safeFactory = await SafeFactory.create({ ethAdapter });
  } else {
    const contractNetworks = await configNetworkContract(ethAdapter);
    safeFactory = await SafeFactory.create({ ethAdapter, contractNetworks });
  }

  const safeAccountConfig: SafeAccountConfig = {
    owners,
    threshold,
  };
  // create safe and return sdk connection
  const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });
  const newSafeAddress = safeSdk.getAddress();

  fs.writeFile(`./.safe_address`, `safe_address: "${newSafeAddress}"\n`, { flag: 'a' }, (err) => {
    if (err) {
      console.error(`failed to write file: ${err}`);
    }
  });
}

// to: 0x<address>, value: eth_value_in_wei, data: 0x<data>
export async function createSafeTransferTransaction(
  safeSdk: Safe,
  to: string,
  value: string,
  data = '0x'
) {
  const transaction: SafeTransactionDataPartial = {
    to,
    value,
    data,
  };
  const safeTransaction = await safeSdk.createTransaction(transaction);
  // creator sign transaction
  // HACK: if transaction creator and executetor are not the same, transaction creator didn't sign will cause transaction failed
  await safeSdk.signTransaction(safeTransaction);
  const txHash = await safeSdk.getTransactionHash(safeTransaction);

  return { txHash, safeTransaction };
}

export async function approveTransaction(safeSdk: Safe, txHash: string) {
  const approveTxResponse = await safeSdk.approveTransactionHash(txHash);
  await approveTxResponse.transactionResponse?.wait();
}

export async function executeTransaction(safe: Safe, safeTransaction: SafeTransaction) {
  const executeTxResponse = await safe.executeTransaction(safeTransaction);
  await executeTxResponse.transactionResponse?.wait();
}

export async function createSafeSdk(
  ethAdapter: EthersAdapter,
  safeAddress: string,
  isEthereum = true
) {
  let safeSdk: Safe;
  if (isEthereum) {
    safeSdk = await Safe.create({ ethAdapter, safeAddress });
  } else {
    const contractNetworks = await configNetworkContract(ethAdapter);
    safeSdk = await Safe.create({ ethAdapter, safeAddress, contractNetworks });
  }

  return safeSdk;
}

import { createNewSafe, getEthAdapter } from '../tx-core';

export async function createSafe(
  creatorPrivateKey: string,
  safeOwners: string[],
  threshold: number,
  isEthereum: boolean,
  rpcUrl: string
) {
  // settting safe intial configuration
  const ethAdapter_creator = await getEthAdapter(creatorPrivateKey, rpcUrl);

  // create new safe
  await createNewSafe(ethAdapter_creator, safeOwners, threshold, isEthereum);
}

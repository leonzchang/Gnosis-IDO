export function input2TxFormat(input: string) {
  const hex = input.replace('0x', '');
  return '0'.repeat(64 - hex.length) + hex;
}

export function decimal2Hex(input: number) {
  // 1 token = 1000000000000000000 wei
  const convertUint = 1000000000000000000 * input;
  const hex = convertUint.toString(16);
  return '0'.repeat(64 - hex.length) + hex;
}

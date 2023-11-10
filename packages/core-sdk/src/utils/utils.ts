export function isIntegerString(s: string): boolean {
  const num = Number(s);
  return !isNaN(num) && parseInt(s, 10) === num;
}

export function parseToBigInt(num: string): bigint{
  return BigInt(num)
}


export function chunks(input: Uint8Array, size: number): Uint8Array[] {
  const result: Uint8Array[] = []
  for (let i = 0; i < input.length; i += size) {
    result.push(input.slice(i, i + size))
  }
  return result
}

export function bigintToArray(n: number, k: number, x: bigint): string[] {
  let mod: bigint = 1n
  for (let idx = 0; idx < n; idx++) {
    mod = mod * 2n
  }

  const ret: bigint[] = []
  let xTemp: bigint = x
  for (let idx = 0; idx < k; idx++) {
    ret.push(xTemp % mod)
    xTemp = xTemp / mod
  }
  return ret.map((x) => x.toString())
}

export function pad(data: Uint8Array, width = 1024): { length: number, padded: Uint8Array } {
  const dataCopy = Uint8Array.from(data).slice()
  // pad the uint8array to the width with 0s
  const padded = new Uint8Array(width)
  padded.set(dataCopy)
  const length = dataCopy.length
  return { length, padded }
}

export function leftPad(data: Uint8Array, width = 1024): { length: number, padded: Uint8Array } {
  // pad the uint8array to the width with 0s
  const dataCopy = Uint8Array.from(data).slice()
  const padded = new Uint8Array(width)
  const reversedArr = dataCopy.reverse()
  padded.set(reversedArr)
  const length = dataCopy.length
  const reversedPadded = padded.reverse()
  return { length, padded: reversedPadded }
}

export function leftPadAsMultiple(data: Uint8Array, multiple = 32): { length: number, padded: Uint8Array } {
  const dataCopy = Uint8Array.from(data).slice()
  const missingLength = (multiple - dataCopy.length % multiple) % multiple
  const width = dataCopy.length + missingLength
  return leftPad(dataCopy, width)
}


/**
 * bigIntToBytes converts a BigInt to a big-endian Uint8Array for encoding.
 * @param bi - The bigint to convert.
 * @param size - The size of the resulting byte array.
 * @returns A byte array containing the big-endian encoding of the input bigint
 */
export function bigIntToBytes(bi: bigint | number, size: number) {
  let hex = bi.toString(16);
  // Pad the hex with zeros so it matches the size in bytes
  if (hex.length !== size * 2) {
    hex = hex.padStart(size * 2, '0');
  }
  const byteArray = new Uint8Array(hex.length / 2);
  for (let i = 0, j = 0; i < hex.length / 2; i++, j += 2) {
    byteArray[i] = parseInt(hex.slice(j, j + 2), 16);
  }
  return byteArray;
}

/**
 * bytesToBigInt produces a bigint from a binary representation.
 *
 * @param bytes - The Uint8Array to convert.
 * @returns The bigint that was encoded in the input data.
 */
export function bytesToBigInt(bytes: Uint8Array) {
  const bytesCopy = Uint8Array.from(bytes).slice()
  let res = BigInt(0);
  const buf = Buffer.from(bytesCopy);
  for (let i = 0; i < bytesCopy.length; i++) {
    res = BigInt(Number(buf.readUIntBE(i, 1))) + res * BigInt(256);
  }
  return res;
}
// Assert as being true (e.g. it's not undefined)
export function Assert(value: boolean, message: string): asserts value is true {
  if (!value) {
    throw new Error(message)
  }
}

export function AssertDefined<T>(value: T | undefined | null, message: string): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(message)
  }
}

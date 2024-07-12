
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

export function pad(arr: Uint8Array, width = 1024): { length: number, padded: Uint8Array } {
  // pad the uint8array to the width with 0s
  const padded = new Uint8Array(width)
  padded.set(arr)
  const length = arr.length
  return { length, padded }
}

export function leftPad(arr: Uint8Array, width = 1024): { length: number, padded: Uint8Array } {
  // pad the uint8array to the width with 0s
  const padded = new Uint8Array(width)
  const reversedArr = arr.reverse()
  padded.set(reversedArr)
  const length = arr.length
  const reversedPadded = padded.reverse()
  return { length, padded: reversedPadded }
}

export function leftPadAsMultiple(arr: Uint8Array, multiple = 32): { length: number, padded: Uint8Array } {
  const missingLength = multiple - arr.length % multiple
  const width = arr.length + missingLength
  return leftPad(arr, width)
}

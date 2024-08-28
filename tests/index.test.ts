import { multiMiMC7 } from '../src/index'
import { bigIntToBytes, leftPadAsMultiple } from '../src/util'
test("MIMC Hash of BigInt[] A", () => {
  // in: 5, 77
  // out: 17990793923648300776412606851153755779999267188325621732776092429415186059999
  const mimcHash = multiMiMC7([5n, 77n])
  expect(mimcHash)
    .toBe(17990793923648300776412606851153755779999267188325621732776092429415186059999n)
})

test("MIMC Hash of Bytes A", () => {
  // in: 5, 77
  // out: 17990793923648300776412606851153755779999267188325621732776092429415186059999
  const mimcHash = multiMiMC7(
    Buffer.concat([5n, 77n].map(bi => leftPadAsMultiple(bigIntToBytes(bi, 32), 32).padded)
    )
  )
  expect(mimcHash)
    .toBe(17990793923648300776412606851153755779999267188325621732776092429415186059999n)
})

test("MIMC Hash of BigInt[] B", () => {
  // in: 123
  // out: 14242006242236970856770518528052882475432357439464668602851051304850104653283
  const mimcHash = multiMiMC7([123n])
  expect(mimcHash)
    .toBe(14242006242236970856770518528052882475432357439464668602851051304850104653283n)

})

test("MIMC Hash of Bytes B", () => {
  // in: 123
  // out: 14242006242236970856770518528052882475432357439464668602851051304850104653283
  const mimcHash = multiMiMC7(bigIntToBytes(123n, 32))
  expect(mimcHash)
    .toBe(14242006242236970856770518528052882475432357439464668602851051304850104653283n)

})

test("MIMC Hash of Bytes C", () => {
  // in: 123
  // out: 14242006242236970856770518528052882475432357439464668602851051304850104653283
  const mimcHash = multiMiMC7(bigIntToBytes(123n, 1))
  expect(mimcHash)
    .toBe(14242006242236970856770518528052882475432357439464668602851051304850104653283n)

})

test("BinaryFormat utility functions", () => {
  // non-exhaustive
  // Left padding should work
  const data = new Uint8Array([104, 101, 108, 108, 111])
  const expectedPaddedData = new Uint8Array([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    104, 101, 108, 108, 111
  ])
  const paddedData = leftPadAsMultiple(data, 32).padded
  expect(JSON.stringify(paddedData)).toBe(JSON.stringify(expectedPaddedData))
  // original data should be untampered (not mutated)
  const originalData = new Uint8Array([104, 101, 108, 108, 111])
  expect(JSON.stringify(data)).toBe(JSON.stringify(originalData))
})
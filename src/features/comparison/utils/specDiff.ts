import type { GPUSpecs } from '@/types/specs'

type Winner = 'a' | 'b' | 'tie' | 'n/a'

export interface SpecDiffRow {
  label: string
  a: string
  b: string
  winner: Winner
}

/**
 * Direction for each numeric spec when comparing — 'higher' means a bigger
 * number is better, 'lower' means smaller (e.g. TDP, MSRP, process node nm).
 * Non-numeric or contextual fields use 'n/a'.
 */
const DIRECTION: Partial<Record<keyof GPUSpecs, 'higher' | 'lower' | 'n/a'>> = {
  shaderUnits: 'higher',
  vramSizeGB: 'higher',
  memoryBusBits: 'higher',
  memoryBandwidthGBs: 'higher',
  baseClockMHz: 'higher',
  boostClockMHz: 'higher',
  tdpWatts: 'lower',
  processNodeNm: 'lower',
  msrpUSD: 'lower',
  lengthMm: 'lower',
  slotWidth: 'lower',
  releaseYear: 'higher',
}

const LABELS: Record<keyof GPUSpecs, string> = {
  shaderUnits: 'Shader units',
  vramSizeGB: 'VRAM (GB)',
  vramType: 'VRAM type',
  memoryBusBits: 'Bus (bit)',
  memoryBandwidthGBs: 'Bandwidth (GB/s)',
  tdpWatts: 'TDP (W)',
  baseClockMHz: 'Base clock (MHz)',
  boostClockMHz: 'Boost clock (MHz)',
  processNodeNm: 'Process (nm)',
  architecture: 'Architecture',
  msrpUSD: 'MSRP (USD)',
  releaseYear: 'Released',
  pcieGeneration: 'PCIe gen',
  pcieLanes: 'PCIe lanes',
  lengthMm: 'Length (mm)',
  slotWidth: 'Slot width',
}

function pickWinner(
  key: keyof GPUSpecs,
  a: GPUSpecs[keyof GPUSpecs],
  b: GPUSpecs[keyof GPUSpecs],
): Winner {
  const dir = DIRECTION[key]
  if (!dir || dir === 'n/a') return 'n/a'
  if (typeof a !== 'number' || typeof b !== 'number') return 'n/a'
  if (a === b) return 'tie'
  if (dir === 'higher') return a > b ? 'a' : 'b'
  return a < b ? 'a' : 'b'
}

export function buildSpecDiff(specsA: GPUSpecs, specsB: GPUSpecs): SpecDiffRow[] {
  return (Object.keys(LABELS) as (keyof GPUSpecs)[]).map((key) => ({
    label: LABELS[key],
    a: String(specsA[key]),
    b: String(specsB[key]),
    winner: pickWinner(key, specsA[key], specsB[key]),
  }))
}

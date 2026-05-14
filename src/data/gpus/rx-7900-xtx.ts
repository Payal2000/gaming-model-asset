import type { GPU } from '@/types/gpu'
import type { GPUSpecs } from '@/types/specs'
import { buildProceduralComponents } from '../proceduralComponents'

const specs: GPUSpecs = {
  shaderUnits: 6144,
  vramSizeGB: 24,
  vramType: 'GDDR6',
  memoryBusBits: 384,
  memoryBandwidthGBs: 960,
  tdpWatts: 355,
  baseClockMHz: 1900,
  boostClockMHz: 2500,
  processNodeNm: 5,
  architecture: 'RDNA 3',
  msrpUSD: 999,
  releaseYear: 2022,
  pcieGeneration: 4,
  pcieLanes: 16,
  lengthMm: 287,
  slotWidth: 2.5,
}

export const rx7900xtx: GPU = {
  slug: 'rx-7900-xtx',
  name: 'Radeon RX 7900 XTX',
  vendor: 'AMD',
  series: 'RX 7000',
  colors: { pcb: '#1a1a1a', shroud: '#2a2a2e', accent: '#ed1c24' },
  specs,
  components: buildProceduralComponents(specs),
}

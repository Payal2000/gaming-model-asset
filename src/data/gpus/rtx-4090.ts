import type { GPU } from '@/types/gpu'
import type { GPUSpecs } from '@/types/specs'
import { buildProceduralComponents } from '../proceduralComponents'

const specs: GPUSpecs = {
  shaderUnits: 16384,
  vramSizeGB: 24,
  vramType: 'GDDR6X',
  memoryBusBits: 384,
  memoryBandwidthGBs: 1008,
  tdpWatts: 450,
  baseClockMHz: 2235,
  boostClockMHz: 2520,
  processNodeNm: 4,
  architecture: 'Ada Lovelace',
  msrpUSD: 1599,
  releaseYear: 2022,
  pcieGeneration: 4,
  pcieLanes: 16,
  lengthMm: 304,
  slotWidth: 3,
}

export const rtx4090: GPU = {
  slug: 'rtx-4090',
  name: 'GeForce RTX 4090',
  vendor: 'NVIDIA',
  series: 'RTX 40',
  colors: { pcb: '#0d2818', shroud: '#1f1f22', accent: '#76b900' },
  specs,
  components: buildProceduralComponents(specs),
}

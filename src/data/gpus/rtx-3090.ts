import type { GPU } from '@/types/gpu'
import type { GPUSpecs } from '@/types/specs'
import { buildProceduralComponents } from '../proceduralComponents'

const specs: GPUSpecs = {
  shaderUnits: 10496,
  vramSizeGB: 24,
  vramType: 'GDDR6X',
  memoryBusBits: 384,
  memoryBandwidthGBs: 936,
  tdpWatts: 350,
  baseClockMHz: 1395,
  boostClockMHz: 1695,
  processNodeNm: 8,
  architecture: 'Ampere',
  msrpUSD: 1499,
  releaseYear: 2020,
  pcieGeneration: 4,
  pcieLanes: 16,
  lengthMm: 313,
  slotWidth: 3,
}

export const rtx3090: GPU = {
  slug: 'rtx-3090',
  name: 'GeForce RTX 3090',
  vendor: 'NVIDIA',
  series: 'RTX 30',
  colors: { pcb: '#0d1828', shroud: '#1a1a1d', accent: '#76b900' },
  specs,
  components: buildProceduralComponents(specs),
}

import type { GPU } from '@/types/gpu'
import type { GPUSpecs } from '@/types/specs'
import { buildProceduralComponents } from '../proceduralComponents'

const specs: GPUSpecs = {
  shaderUnits: 9728,
  vramSizeGB: 16,
  vramType: 'GDDR6X',
  memoryBusBits: 256,
  memoryBandwidthGBs: 716,
  tdpWatts: 320,
  baseClockMHz: 2205,
  boostClockMHz: 2505,
  processNodeNm: 4,
  architecture: 'Ada Lovelace',
  msrpUSD: 1199,
  releaseYear: 2022,
  pcieGeneration: 4,
  pcieLanes: 16,
  lengthMm: 304,
  slotWidth: 3,
}

export const rtx4080: GPU = {
  slug: 'rtx-4080',
  name: 'GeForce RTX 4080',
  vendor: 'NVIDIA',
  series: 'RTX 40',
  colors: { pcb: '#0d2818', shroud: '#26262a', accent: '#76b900' },
  specs,
  components: buildProceduralComponents(specs),
}

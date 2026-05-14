export type VRAMType = 'GDDR6' | 'GDDR6X' | 'GDDR7' | 'HBM2e' | 'HBM3'

export interface GPUSpecs {
  shaderUnits: number
  vramSizeGB: number
  vramType: VRAMType
  memoryBusBits: number
  memoryBandwidthGBs: number
  tdpWatts: number
  baseClockMHz: number
  boostClockMHz: number
  processNodeNm: number
  architecture: string
  msrpUSD: number
  releaseYear: number
  pcieGeneration: number
  pcieLanes: number
  lengthMm: number
  slotWidth: number
}

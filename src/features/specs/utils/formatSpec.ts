import type { GPUSpecs } from '@/types/specs'

const NUM = new Intl.NumberFormat('en-US')

export interface SpecRowData {
  label: string
  value: string
}

export interface SpecGroup {
  title: string
  rows: SpecRowData[]
}

export function formatSpecGroups(specs: GPUSpecs): SpecGroup[] {
  return [
    {
      title: 'Compute',
      rows: [
        { label: 'Shader units', value: NUM.format(specs.shaderUnits) },
        { label: 'Architecture', value: specs.architecture },
        { label: 'Process node', value: `${specs.processNodeNm} nm` },
        { label: 'Base clock', value: `${NUM.format(specs.baseClockMHz)} MHz` },
        { label: 'Boost clock', value: `${NUM.format(specs.boostClockMHz)} MHz` },
      ],
    },
    {
      title: 'Memory',
      rows: [
        { label: 'VRAM', value: `${specs.vramSizeGB} GB ${specs.vramType}` },
        { label: 'Memory bus', value: `${specs.memoryBusBits}-bit` },
        { label: 'Bandwidth', value: `${NUM.format(specs.memoryBandwidthGBs)} GB/s` },
      ],
    },
    {
      title: 'Power & form',
      rows: [
        { label: 'TDP', value: `${specs.tdpWatts} W` },
        { label: 'Length', value: `${specs.lengthMm} mm` },
        { label: 'Slot width', value: `${specs.slotWidth}-slot` },
        { label: 'Interface', value: `PCIe ${specs.pcieGeneration}.0 x${specs.pcieLanes}` },
      ],
    },
    {
      title: 'Market',
      rows: [
        { label: 'MSRP', value: `$${NUM.format(specs.msrpUSD)}` },
        { label: 'Released', value: String(specs.releaseYear) },
      ],
    },
  ]
}

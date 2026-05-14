import type { GPUComponentDescriptor } from '@/types/component'
import type { GPUSpecs } from '@/types/specs'

/**
 * Hotspot positions match the geometry in ProceduralGPU.tsx.
 * Since every GPU uses the same procedural model in phase 1, we generate
 * descriptors from each card's specs so the detail text reflects that GPU.
 */
export function buildProceduralComponents(specs: GPUSpecs): GPUComponentDescriptor[] {
  return [
    {
      id: 'die',
      kind: 'die',
      label: 'GPU die',
      description: `The ${specs.architecture} silicon die — ${specs.shaderUnits.toLocaleString()} shader units fabricated on a ${specs.processNodeNm} nm process.`,
      hotspotPosition: [0, 1.3, 0],
      details: {
        Shaders: specs.shaderUnits.toLocaleString(),
        Architecture: specs.architecture,
        'Process node': `${specs.processNodeNm} nm`,
        'Boost clock': `${specs.boostClockMHz} MHz`,
      },
    },
    {
      id: 'vram',
      kind: 'vram',
      label: 'VRAM modules',
      description: `${specs.vramSizeGB} GB of ${specs.vramType} memory on a ${specs.memoryBusBits}-bit bus, delivering ${specs.memoryBandwidthGBs.toLocaleString()} GB/s of bandwidth.`,
      hotspotPosition: [1.1, 1.3, 0.7],
      details: {
        Capacity: `${specs.vramSizeGB} GB`,
        Type: specs.vramType,
        Bus: `${specs.memoryBusBits}-bit`,
        Bandwidth: `${specs.memoryBandwidthGBs.toLocaleString()} GB/s`,
      },
    },
    {
      id: 'fan-left',
      kind: 'fan',
      label: 'Cooling fan',
      description: 'Axial fan that pulls air through the heatsink fin stack to extract heat.',
      hotspotPosition: [-1.4, 1.1, 0],
    },
    {
      id: 'heatsink',
      kind: 'heatsink',
      label: 'Heatsink',
      description: `Aluminum fin stack dissipating up to ${specs.tdpWatts} W of thermal load.`,
      hotspotPosition: [0, 1.45, 0],
      details: {
        'Rated TDP': `${specs.tdpWatts} W`,
      },
    },
    {
      id: 'io-bracket',
      kind: 'display-output',
      label: 'Display outputs',
      description: 'IO bracket with DisplayPort and HDMI connectors for monitor output.',
      hotspotPosition: [-3.0, 0.6, 0],
    },
    {
      id: 'pcie-edge',
      kind: 'pcie-connector',
      label: 'PCIe edge connector',
      description: `Gold-plated edge fingers — PCIe ${specs.pcieGeneration}.0 x${specs.pcieLanes} interface to the motherboard.`,
      hotspotPosition: [0.4, 0.0, 1.1],
      details: {
        Interface: `PCIe ${specs.pcieGeneration}.0`,
        Lanes: `x${specs.pcieLanes}`,
      },
    },
    {
      id: 'power-connector',
      kind: 'power-connector',
      label: 'Power connector',
      description: `Auxiliary power input for the ${specs.tdpWatts} W board.`,
      hotspotPosition: [2.2, 0.95, -0.75],
    },
  ]
}

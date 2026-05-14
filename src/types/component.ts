export type GPUComponentKind =
  | 'die'
  | 'vram'
  | 'vrm'
  | 'fan'
  | 'heatsink'
  | 'display-output'
  | 'pcie-connector'
  | 'power-connector'
  | 'shroud'

export interface GPUComponentDescriptor {
  id: string
  kind: GPUComponentKind
  label: string
  description: string
  hotspotPosition: [number, number, number]
  details?: Record<string, string>
}

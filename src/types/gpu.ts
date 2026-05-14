import type { GPUSpecs } from './specs'
import type { GPUComponentDescriptor } from './component'

export type GPUVendor = 'NVIDIA' | 'AMD' | 'Intel'

export interface GPUColors {
  pcb: string
  shroud: string
  accent: string
}

export interface GPU {
  slug: string
  name: string
  vendor: GPUVendor
  series: string
  colors: GPUColors
  specs: GPUSpecs
  components: GPUComponentDescriptor[]
}

export type GPUStub = Pick<GPU, 'slug' | 'name' | 'vendor' | 'colors'>

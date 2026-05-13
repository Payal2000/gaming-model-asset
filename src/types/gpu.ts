export type GPUVendor = 'NVIDIA' | 'AMD' | 'Intel'

export interface GPUStub {
  slug: string
  name: string
  vendor: GPUVendor
  pcbColor: string
  shroudColor: string
  accentColor: string
}

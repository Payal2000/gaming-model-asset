'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import type { GPUStub } from '@/types/gpu'

interface Props {
  gpu: GPUStub
}

const PCB_SIZE: [number, number, number] = [5.2, 0.12, 2.0]
const SHROUD_SIZE: [number, number, number] = [5.0, 0.9, 1.9]
const HEATSINK_FIN_COUNT = 24

export function ProceduralGPU({ gpu }: Props) {
  const finPositions = useMemo(
    () =>
      Array.from({ length: HEATSINK_FIN_COUNT }, (_, i) => {
        const x = -2.2 + (i / (HEATSINK_FIN_COUNT - 1)) * 4.4
        return x
      }),
    [],
  )

  return (
    <group>
      <mesh name="pcb" position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={PCB_SIZE} />
        <meshStandardMaterial color={gpu.pcbColor} roughness={0.7} metalness={0.1} />
      </mesh>

      <mesh name="shroud" position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={SHROUD_SIZE} />
        <meshStandardMaterial color={gpu.shroudColor} roughness={0.4} metalness={0.6} />
      </mesh>

      <group name="heatsink" position={[0, 1.05, 0]}>
        {finPositions.map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.04, 0.45, 1.7]} />
            <meshStandardMaterial color="#8a8f96" metalness={0.85} roughness={0.3} />
          </mesh>
        ))}
      </group>

      <Fan position={[-1.4, 0.9, 0]} accent={gpu.accentColor} />
      <Fan position={[1.4, 0.9, 0]} accent={gpu.accentColor} />

      <group name="io-bracket" position={[-2.7, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[0.08, 1.4, 1.9]} />
          <meshStandardMaterial color="#cfd2d6" metalness={0.9} roughness={0.25} />
        </mesh>
        <Port position={[-0.05, 0.4, -0.5]} />
        <Port position={[-0.05, 0.4, 0]} />
        <Port position={[-0.05, 0.4, 0.5]} />
      </group>

      <mesh name="pcie-edge" position={[0.4, -0.18, 0.85]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.1, 0.25]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} />
      </mesh>

      <mesh name="power-connector" position={[2.2, 0.55, -0.75]}>
        <boxGeometry args={[0.5, 0.3, 0.35]} />
        <meshStandardMaterial color="#222428" />
      </mesh>
    </group>
  )
}

interface FanProps {
  position: [number, number, number]
  accent: string
}

function Fan({ position, accent }: FanProps) {
  const bladeAngles = useMemo(
    () => Array.from({ length: 7 }, (_, i) => (i / 7) * Math.PI * 2),
    [],
  )
  return (
    <group name="fan" position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.18, 32]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.1, 24]} />
        <meshStandardMaterial color={accent} metalness={0.6} roughness={0.3} />
      </mesh>
      {bladeAngles.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.38, 0.06, Math.sin(a) * 0.38]} rotation={[0, -a, 0.4]}>
          <boxGeometry args={[0.5, 0.02, 0.18]} />
          <meshStandardMaterial color="#2a2d33" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function Port({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.02, 0.18, 0.32]} />
      <meshStandardMaterial color="#0a0a0c" />
    </mesh>
  )
}

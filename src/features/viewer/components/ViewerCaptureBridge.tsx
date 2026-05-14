'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { useViewerActionsStore } from '@/stores/viewerActionsStore'
import { downloadBlob, downloadDataUrl } from '@/lib/three/download'

/**
 * Lives inside the R3F Canvas. Captures the gl renderer and scene refs,
 * then publishes screenshot / GLB-export handlers to a Zustand store so
 * out-of-Canvas toolbar buttons can invoke them.
 */
export function ViewerCaptureBridge({ slug }: { slug: string }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const setActions = useViewerActionsStore((s) => s.setActions)
  const clearActions = useViewerActionsStore((s) => s.clearActions)

  useEffect(() => {
    const takeScreenshot = () => {
      const dataUrl = gl.domElement.toDataURL('image/png')
      downloadDataUrl(dataUrl, `${slug}.png`)
    }

    const exportGLB = () => {
      const exporter = new GLTFExporter()
      exporter.parse(
        scene,
        (result) => {
          const blob =
            result instanceof ArrayBuffer
              ? new Blob([result], { type: 'model/gltf-binary' })
              : new Blob([JSON.stringify(result)], { type: 'model/gltf+json' })
          downloadBlob(blob, `${slug}.glb`)
        },
        (err) => console.error('GLB export failed:', err),
        { binary: true },
      )
    }

    setActions({ takeScreenshot, exportGLB })
    return () => clearActions()
  }, [gl, scene, slug, setActions, clearActions])

  return null
}

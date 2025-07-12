"use client"

import { useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import InteractiveObject from "@/components/interactive-object"
import type { ContentMode } from "@/app/page"

interface ThreeSceneProps {
  currentMode: ContentMode
  onModeChange: (mode: ContentMode) => void
  isTransitioning: boolean
  introComplete: boolean
  height: string
}

// Composant de fallback pour erreurs WebGL
function WebGLFallback() {
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
      <div className="text-center p-6">
        <div className="text-gray-400 text-sm mb-2">Expérience 3D non disponible</div>
        <div className="text-xs text-gray-500">WebGL non supporté sur ce navigateur</div>
      </div>
    </div>
  )
}

export default function ThreeScene({
  currentMode,
  onModeChange,
  isTransitioning,
  introComplete,
  height
}: ThreeSceneProps) {
  const [hasWebGL, setHasWebGL] = useState(true)

  // Vérifier le support WebGL côté client
  const checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      return !!gl
    } catch (e) {
      return false
    }
  }

  // Si pas de support WebGL, afficher le fallback
  if (typeof window !== 'undefined' && !checkWebGLSupport()) {
    return (
      <div className={height}>
        <WebGLFallback />
      </div>
    )
  }

  return (
    <div className={`${height} w-full`}>
      <Suspense fallback={
        <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <div className="text-gray-400 text-sm">Chargement 3D...</div>
          </div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 85 }}
          className="w-full h-full"
          onCreated={({ gl }) => {
            // Configurer le renderer
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            gl.physicallyCorrectLights = true
          }}
          onError={(error) => {
            console.warn("Canvas error:", error)
            setHasWebGL(false)
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false
          }}
          fallback={<WebGLFallback />}
        >
          <Environment preset="studio" />
          <InteractiveObject
            currentMode={currentMode}
            onModeChange={onModeChange}
            isTransitioning={isTransitioning}
            introComplete={introComplete}
          />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false} 
            enabled={introComplete}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

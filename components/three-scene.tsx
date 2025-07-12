"use client"

import { useState, Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { ErrorBoundary } from "@/components/error-boundary"
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
  const [isClient, setIsClient] = useState(false)
  const [renderError, setRenderError] = useState<string | null>(null)

  // Vérifier le support WebGL côté client
  useEffect(() => {
    setIsClient(true)
    
    if (typeof window !== 'undefined') {
      const checkWebGLSupport = () => {
        try {
          const canvas = document.createElement('canvas')
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
          canvas.remove()
          return !!gl
        } catch (e) {
          return false
        }
      }
      
      setHasWebGL(checkWebGLSupport())
    }
  }, [])

  // Gérer les erreurs de rendu
  const handleRenderError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Three.js render error:', error, errorInfo)
    setRenderError(error.message)
    setHasWebGL(false)
  }

  // Ne pas rendre avant que le client soit prêt
  if (!isClient) {
    return (
      <div className={height}>
        <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <div className="text-gray-400 text-sm">Chargement 3D...</div>
          </div>
        </div>
      </div>
    )
  }

  // Si pas de support WebGL ou erreur de rendu, afficher le fallback
  if (!hasWebGL || renderError) {
    return (
      <div className={height}>
        <WebGLFallback />
      </div>
    )
  }

  return (
    <div className={`${height} w-full`}>
      <ErrorBoundary 
        fallback={<WebGLFallback />}
        onError={handleRenderError}
      >
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
              try {
                // Configurer le renderer avec vérifications
                if (gl && typeof window !== 'undefined') {
                  gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
                  // Vérification de la propriété avant usage
                  if (gl.physicallyCorrectLights !== undefined) {
                    gl.physicallyCorrectLights = true
                  }
                }
              } catch (error) {
                console.warn('Error configuring WebGL renderer:', error)
              }
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
      </ErrorBoundary>
    </div>
  )
}

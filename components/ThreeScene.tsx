"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"

interface ThreeSceneProps {
  currentMode: string
  height: string
  introComplete: boolean
  isTransitioning: boolean
  onModeChange?: (mode: string) => void
}

// Composant de fallback pour navigateurs sans WebGL
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

// Composant de chargement
function LoadingFallback() {
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-gray-400 text-sm">Chargement 3D...</div>
      </div>
    </div>
  )
}

export default function ThreeScene({
  currentMode,
  height,
  introComplete,
  isTransitioning,
  onModeChange
}: ThreeSceneProps) {
  // Guards pour éviter undefined
  const safeMode = currentMode || "vitrine"
  const safeHeight = height || "h-96"
  const safeIntroComplete = !!introComplete
  const safeIsTransitioning = !!isTransitioning
  const safeOnModeChange = onModeChange || (() => {})

  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const frameIdRef = useRef<number | null>(null)
  
  const [isClient, setIsClient] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Vérifier le support WebGL
  const checkWebGLSupport = useCallback(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      canvas.remove()
      return !!gl
    } catch (e) {
      return false
    }
  }, [])

  // Initialiser la scène 3D
  const initScene = useCallback(() => {
    if (!containerRef.current || !hasWebGL) return

    try {
      // Créer la scène
      const scene = new THREE.Scene()
      sceneRef.current = scene

      // Créer la caméra
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      )
      camera.position.z = 5
      cameraRef.current = camera

      // Créer le renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      rendererRef.current = renderer

      // Ajouter le canvas au DOM
      containerRef.current.appendChild(renderer.domElement)

      // Créer un objet 3D simple
      const geometry = new THREE.IcosahedronGeometry(1, 1)
      const material = new THREE.MeshStandardMaterial({
        color: getModeColor(currentMode),
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9
      })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      meshRef.current = mesh

      // Ajouter des lumières
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xffffff, 0.8, 100)
      pointLight.position.set(5, 5, 5)
      scene.add(pointLight)

      setIsLoading(false)
    } catch (error) {
      console.warn("Erreur lors de l'initialisation de la scène 3D:", error)
      setHasWebGL(false)
      setIsLoading(false)
    }
  }, [hasWebGL, currentMode])

  // Obtenir la couleur selon le mode
  const getModeColor = (mode: string) => {
    switch (mode) {
      case "vitrine":
        return 0xffffff
      case "ecommerce":
        return 0x10b981
      case "saas":
        return 0x3b82f6
      default:
        return 0xffffff
    }
  }

  // Animer la scène
  const animate = useCallback(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !meshRef.current) {
      return
    }

    try {
      // Rotation continue
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005

      // Effet de respiration
      const time = Date.now() * 0.001
      const scale = 1 + Math.sin(time) * 0.1
      meshRef.current.scale.setScalar(scale)

      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current)
      frameIdRef.current = requestAnimationFrame(animate)
    } catch (error) {
      console.warn("Erreur lors de l'animation:", error)
    }
  }, [])

  // Gérer le redimensionnement
  const handleResize = useCallback(() => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current) return

    try {
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    } catch (error) {
      console.warn("Erreur lors du redimensionnement:", error)
    }
  }, [])

  // Nettoyer les ressources
  const cleanup = useCallback(() => {
    if (frameIdRef.current) {
      cancelAnimationFrame(frameIdRef.current)
      frameIdRef.current = null
    }

    if (rendererRef.current) {
      rendererRef.current.dispose()
      if (containerRef.current && rendererRef.current.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      rendererRef.current = null
    }

    if (sceneRef.current) {
      sceneRef.current.clear()
      sceneRef.current = null
    }

    cameraRef.current = null
    meshRef.current = null
  }, [])

  // Initialisation côté client
  useEffect(() => {
    setIsClient(true)
    
    // Vérifier WebGL seulement côté client
    if (typeof window !== 'undefined') {
      const webglSupported = checkWebGLSupport()
      setHasWebGL(webglSupported)
    }
  }, [checkWebGLSupport])

  // Initialiser la scène quand tout est prêt
  useEffect(() => {
    if (isClient && hasWebGL && introComplete) {
      initScene()
      
      // Démarrer l'animation
      if (rendererRef.current) {
        animate()
      }

      // Ajouter le listener de redimensionnement
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize)
      }

      // Cleanup au démontage
      return cleanup
    }
  }, [isClient, hasWebGL, introComplete, initScene, animate, handleResize, cleanup])

  // Mettre à jour la couleur quand le mode change
  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.color.setHex(getModeColor(currentMode))
    }
  }, [currentMode])

  // Gérer le clic pour changer de mode
  const handleClick = useCallback(() => {
    if (isTransitioning || !onModeChange) return

    const modes = ["vitrine", "ecommerce", "saas"]
    const currentIndex = modes.indexOf(currentMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    onModeChange(nextMode)
  }, [currentMode, isTransitioning, onModeChange])

  // Guard défensif pour détecter un accès à .S
  useEffect(() => {
    if (typeof currentMode === "object" && currentMode !== null && "S" in currentMode) {
      // eslint-disable-next-line no-console
      console.warn("🚨 [ThreeScene] currentMode suspect:", currentMode)
    }
  }, [currentMode])

  // Rendu conditionnel
  if (!isClient) {
    return (
      <div className={safeHeight}>
        <LoadingFallback />
      </div>
    )
  }

  if (!hasWebGL) {
    return (
      <div className={safeHeight}>
        <WebGLFallback />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={safeHeight}>
        <LoadingFallback />
      </div>
    )
  }

  return (
    <div className={`${safeHeight} w-full`}>
      <div
        ref={containerRef}
        className="w-full h-full cursor-pointer rounded-lg overflow-hidden"
        onClick={handleClick}
        style={{ touchAction: 'manipulation' }}
      />
    </div>
  )
}
